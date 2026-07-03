import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { getBindings } from "./cf";

/**
 * Portfolio data store with two backends behind one API:
 *   - Cloudflare D1 (production / `npm run preview`) when the DB binding exists
 *   - Local JSON file (`data/portfolio.json`) during plain `next dev`
 * Callers never need to know which is active.
 */

export const PORTFOLIO_CATEGORIES = [
  "Wedding",
  "Puberty Function",
  "Birthday",
  "Housewarming",
  "Corporate",
  "Custom Fabrication",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  featured: boolean;
  order: number;
};

export type PortfolioInput = {
  title: string;
  category: string;
  image: string;
  featured?: boolean;
};

type Row = {
  id: string;
  title: string;
  category: string;
  image: string;
  featured: number;
  order: number;
};

const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json");

/* ---------------- JSON backend (local dev) ---------------- */

async function jsonReadAll(): Promise<PortfolioItem[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return (JSON.parse(raw) as PortfolioItem[]).sort((a, b) => a.order - b.order);
  } catch {
    return [];
  }
}

async function jsonWriteAll(items: PortfolioItem[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

/* ---------------- D1 backend (Cloudflare) ---------------- */

function rowToItem(r: Row): PortfolioItem {
  return { ...r, featured: Boolean(r.featured) };
}

async function d1All(db: D1Database): Promise<PortfolioItem[]> {
  const { results } = await db
    .prepare(`SELECT id, title, category, image, featured, "order" FROM portfolio_items ORDER BY "order" ASC`)
    .all<Row>();
  return results.map(rowToItem);
}

/* ---------------- Public API ---------------- */

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const b = await getBindings();
  if (b?.DB) return d1All(b.DB);
  return jsonReadAll();
}

export async function getFeaturedItems(limit = 4): Promise<PortfolioItem[]> {
  const all = await getPortfolioItems();
  const featured = all.filter((i) => i.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getPortfolioItem(id: string): Promise<PortfolioItem | null> {
  const b = await getBindings();
  if (b?.DB) {
    const row = await b.DB.prepare(
      `SELECT id, title, category, image, featured, "order" FROM portfolio_items WHERE id = ?`,
    )
      .bind(id)
      .first<Row>();
    return row ? rowToItem(row) : null;
  }
  const all = await jsonReadAll();
  return all.find((i) => i.id === id) ?? null;
}

export async function createPortfolioItem(input: PortfolioInput): Promise<PortfolioItem> {
  const item: PortfolioItem = {
    id: randomUUID(),
    title: input.title.trim(),
    category: input.category,
    image: input.image,
    featured: Boolean(input.featured),
    order: 0,
  };

  const b = await getBindings();
  if (b?.DB) {
    const max = await b.DB.prepare(`SELECT COALESCE(MAX("order"), 0) AS m FROM portfolio_items`).first<{ m: number }>();
    item.order = (max?.m ?? 0) + 1;
    await b.DB.prepare(
      `INSERT INTO portfolio_items (id, title, category, image, featured, "order") VALUES (?, ?, ?, ?, ?, ?)`,
    )
      .bind(item.id, item.title, item.category, item.image, item.featured ? 1 : 0, item.order)
      .run();
    return item;
  }

  const all = await jsonReadAll();
  item.order = all.reduce((m, i) => Math.max(m, i.order), 0) + 1;
  all.push(item);
  await jsonWriteAll(all);
  return item;
}

export async function updatePortfolioItem(
  id: string,
  input: Partial<PortfolioInput>,
): Promise<PortfolioItem | null> {
  const current = await getPortfolioItem(id);
  if (!current) return null;
  const updated: PortfolioItem = {
    ...current,
    title: input.title?.trim() ?? current.title,
    category: input.category ?? current.category,
    image: input.image ?? current.image,
    featured: input.featured ?? current.featured,
  };

  const b = await getBindings();
  if (b?.DB) {
    await b.DB.prepare(
      `UPDATE portfolio_items SET title = ?, category = ?, image = ?, featured = ? WHERE id = ?`,
    )
      .bind(updated.title, updated.category, updated.image, updated.featured ? 1 : 0, id)
      .run();
    return updated;
  }

  const all = await jsonReadAll();
  const idx = all.findIndex((i) => i.id === id);
  all[idx] = updated;
  await jsonWriteAll(all);
  return updated;
}

export async function deletePortfolioItem(id: string): Promise<boolean> {
  const b = await getBindings();
  if (b?.DB) {
    const res = await b.DB.prepare(`DELETE FROM portfolio_items WHERE id = ?`).bind(id).run();
    return (res.meta?.changes ?? 0) > 0;
  }
  const all = await jsonReadAll();
  const next = all.filter((i) => i.id !== id);
  if (next.length === all.length) return false;
  await jsonWriteAll(next);
  return true;
}
