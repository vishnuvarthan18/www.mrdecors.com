import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { getPortfolioItems, PORTFOLIO_CATEGORIES } from "@/lib/portfolio";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthed())) {
    redirect("/admin/login");
  }
  const items = await getPortfolioItems();
  return (
    <AdminDashboard
      initialItems={items}
      categories={[...PORTFOLIO_CATEGORIES]}
    />
  );
}
