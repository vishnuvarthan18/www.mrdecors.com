"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

type Item = {
  id: string;
  title: string;
  category: string;
  image: string;
  featured: boolean;
  order: number;
};

type FormState = {
  id: string | null;
  title: string;
  category: string;
  image: string;
  featured: boolean;
};

export default function AdminDashboard({
  initialItems,
  categories,
}: {
  initialItems: Item[];
  categories: string[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>(initialItems);
  const [form, setForm] = useState<FormState | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function openNew() {
    setError("");
    setPreviewUrl(null);
    setForm({ id: null, title: "", category: categories[0], image: "", featured: false });
  }

  function openEdit(item: Item) {
    setError("");
    setPreviewUrl(null);
    setForm({
      id: item.id,
      title: item.title,
      category: item.category,
      image: item.image,
      featured: item.featured,
    });
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setError("");

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return localPreview;
    });

    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (res.ok) {
        const { path } = (await res.json()) as { path: string };
        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return null;
        });
        setForm((f) => (f ? { ...f, image: path } : f));
      } else {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error || "Upload failed");
      }
    } catch {
      setError("Upload failed. Check your connection and try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!form) return;
    if (!form.title || !form.category || !form.image) {
      setError("Title, category, and image are all required.");
      return;
    }
    setSaving(true);
    setError("");
    const isEdit = Boolean(form.id);
    const res = await fetch(
      isEdit ? `/api/admin/portfolio/${form.id}` : "/api/admin/portfolio",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          category: form.category,
          image: form.image,
          featured: form.featured,
        }),
      },
    );
    setSaving(false);
    if (res.ok) {
      const { item } = (await res.json()) as { item: Item };
      setItems((prev) =>
        isEdit ? prev.map((i) => (i.id === item.id ? item : i)) : [...prev, item],
      );
      setForm(null);
      router.refresh();
    } else {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error || "Save failed");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this portfolio item? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      router.refresh();
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div>
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-bg-elev/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo href="/admin" imgClassName="h-9 w-auto" />
            <span className="text-sm font-medium text-muted">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted hover:text-text"
            >
              View site ↗
            </a>
            <button
              onClick={handleLogout}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-text hover:border-primary hover:text-primary"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold text-text">Portfolio</h1>
            <p className="mt-1 text-sm text-muted">
              {items.length} item{items.length === 1 ? "" : "s"}. Changes go live
              on the site instantly.
            </p>
          </div>
          <button
            onClick={openNew}
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            + Add Item
          </button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-border bg-bg-elev"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
                {item.featured && (
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="font-display font-medium text-text">{item.title}</p>
                <p className="text-xs text-muted">{item.category}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="flex-1 rounded-lg border border-border py-2 text-sm font-medium text-text hover:border-primary hover:text-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted hover:border-primary hover:text-primary"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit modal */}
      {form && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setForm(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-border bg-bg-elev p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-xl font-semibold text-text">
              {form.id ? "Edit Item" : "Add Item"}
            </h2>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-text">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-text">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-text">Image</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleUpload(file);
                  }}
                  className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-border bg-bg p-4 hover:border-primary"
                >
                  {(previewUrl || form.image) ? (
                    <div className="relative h-16 w-20 overflow-hidden rounded-lg">
                      <Image
                        src={previewUrl || form.image}
                        alt="preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-20 items-center justify-center rounded-lg bg-surface text-muted">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M4 16l4-4 4 4 4-6 4 6" />
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                      </svg>
                    </div>
                  )}
                  <div className="text-sm">
                    <p className="font-medium text-text">
                      {uploading ? "Uploading…" : "Click or drag an image"}
                    </p>
                    <p className="text-xs text-muted">JPG, PNG, WebP or AVIF, up to 8 MB</p>
                  </div>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                  }}
                />
              </div>

              <label className="flex items-center gap-3 text-sm text-text">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />
                Show in Featured Work on the home page
              </label>

              {error && <p className="text-sm text-primary">{error}</p>}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setForm(null)}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text hover:border-primary"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
