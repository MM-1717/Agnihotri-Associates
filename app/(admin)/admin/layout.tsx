"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // 🔥 Clear old toasts when entering dashboard/admin
  useEffect(() => {
    toast.dismiss();
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Clientele", path: "/admin/clientele" },
    { name: "Services", path: "/admin/services" },
    { name: "Contact", path: "/admin/contact" },
    { name: "Footer", path: "/admin/footer" },
  ];

  const getTitle = () => {
    const current = navItems.find((item) => item.path === pathname);
    return current ? current.name : "Admin Panel";
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Toaster position="top-right" />

      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-md transition flex items-center justify-between ${
                  isActive
                    ? "bg-green-600 text-white shadow"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
              >
                <span>{item.name}</span>

                {isActive && (
                  <span className="text-xs bg-white text-green-600 px-2 py-0.5 rounded">
                    Active
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b">
          <h2 className="font-semibold text-lg text-black">
            {getTitle()}
          </h2>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-6 bg-gray-100 text-black">
          <div className="bg-white p-6 rounded-xl shadow-sm min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}