import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import {
  deletePortfolioItem,
  updatePortfolioItem,
  PORTFOLIO_CATEGORIES,
} from "@/lib/portfolio";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json().catch(() => null)) as {
    title?: string;
    category?: string;
    image?: string;
    featured?: boolean;
  } | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (body.category && !(PORTFOLIO_CATEGORIES as readonly string[]).includes(body.category)) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }

  const item = await updatePortfolioItem(id, {
    title: body.title,
    category: body.category,
    image: body.image,
    featured: body.featured,
  });

  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ item });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const ok = await deletePortfolioItem(id);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
