import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import {
  createPortfolioItem,
  getPortfolioItems,
  PORTFOLIO_CATEGORIES,
} from "@/lib/portfolio";

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await getPortfolioItems();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    title?: string;
    category?: string;
    image?: string;
    featured?: boolean;
  } | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { title, category, image, featured } = body;
  if (!title || !category || !image) {
    return NextResponse.json(
      { error: "Title, category, and image are required." },
      { status: 400 },
    );
  }
  if (!(PORTFOLIO_CATEGORIES as readonly string[]).includes(category)) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }

  const item = await createPortfolioItem({ title, category, image, featured });
  return NextResponse.json({ item }, { status: 201 });
}
