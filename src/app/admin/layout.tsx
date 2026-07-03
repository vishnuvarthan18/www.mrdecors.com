import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | MR Decors",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen bg-bg text-text">{children}</div>;
}
