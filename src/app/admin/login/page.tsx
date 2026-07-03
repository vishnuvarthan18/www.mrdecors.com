import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";
import Logo from "@/components/Logo";

export default async function AdminLoginPage() {
  if (await isAuthed()) {
    redirect("/admin");
  }
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
        <LoginForm />
      </div>
    </div>
  );
}
