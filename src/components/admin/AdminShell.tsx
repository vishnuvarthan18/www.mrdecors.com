"use client";

import { useCallback, useEffect, useState } from "react";
import LoginForm from "@/components/admin/LoginForm";
import AdminDashboard from "@/components/admin/AdminDashboard";
import Logo from "@/components/Logo";

type Item = {
  id: string;
  title: string;
  category: string;
  image: string;
  featured: boolean;
  order: number;
};

export default function AdminShell({ categories }: { categories: string[] }) {
  const [token, setToken] = useState<string | null>(null);
  const [items, setItems] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = useCallback(async (authToken: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/portfolio", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = (await res.json()) as { items: Item[] };
        setItems(data.items);
      } else if (res.status === 401) {
        setToken(null);
        setItems(null);
        setError("Session expired. Please sign in again.");
      } else {
        setError("Failed to load portfolio items.");
      }
    } catch {
      setError("Failed to load portfolio items.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) fetchItems(token);
  }, [token, fetchItems]);

  function handleLoginSuccess(authToken: string) {
    setToken(authToken);
    setError("");
  }

  function handleLogout() {
    setToken(null);
    setItems(null);
    setError("");
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <Logo imgClassName="h-12 w-auto" />
            <h1 className="mt-6 font-display text-2xl font-semibold text-text">
              Admin Login
            </h1>
            <p className="mt-2 text-sm text-muted">
              Sign in to manage your portfolio.
            </p>
          </div>
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </div>
    );
  }

  if (loading || !items) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted">{error || "Loading…"}</p>
      </div>
    );
  }

  return (
    <AdminDashboard
      token={token}
      initialItems={items}
      categories={categories}
      onLogout={handleLogout}
    />
  );
}
