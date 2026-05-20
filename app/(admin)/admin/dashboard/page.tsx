"use client";

import Link from "next/link";

export default function AdminDashboard() {
  const loading = false;

  const cards = [
    {
      title: "Manage Services",
      desc: "Add, edit and delete services",
      link: "/admin/services",
    },
    {
      title: "Manage Clientele",
      desc: "Upload and manage clients",
      link: "/admin/clientele",
    },
    {
      title: "Manage Contact",
      desc: "Update contact details",
      link: "/admin/contact",
    },
    {
      title: "Manage Footer",
      desc: "Edit footer information",
      link: "/admin/footer",
    },
  ];

  // ✅ Middleware handles auth now
  // 🚪 Logout function
  // ⏳ Loading
  if (loading) {
    return <div className="text-center mt-10">Checking access...</div>;
  }

  return (
    <div className="space-y-8 text-black">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <p className="text-gray-600">
            Welcome to Admin Panel. Manage your website content here.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {cards.map((card, index) => (
          <Link key={index} href={card.link}>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer border">

              <h2 className="text-lg font-semibold mb-2">
                {card.title}
              </h2>

              <p className="text-gray-500 text-sm">
                {card.desc}
              </p>

              <div className="mt-4 text-green-600 font-medium">
                Open →
              </div>

            </div>

          </Link>
        ))}

      </div>

    </div>
  );
}
