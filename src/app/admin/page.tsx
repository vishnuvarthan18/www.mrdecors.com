import { PORTFOLIO_CATEGORIES } from "@/lib/portfolio";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminShell categories={[...PORTFOLIO_CATEGORIES]} />;
}
