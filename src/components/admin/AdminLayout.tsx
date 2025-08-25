"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, hasPermission } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Set initial sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [userMenuOpen]);

  const menuItems = [
    {
      title: "Dashboard",
      icon: "📊",
      href: "/admin",
      active: pathname === "/admin",
      permission: "analytics.view",
    },
    // Content Management
    {
      title: "Hero Slides",
      icon: "🖼️",
      href: "/admin/hero-slides",
      active: pathname.startsWith("/admin/hero-slides"),
      permission: "content.create",
    },
    {
      title: "Services",
      icon: "⚙️",
      href: "/admin/services",
      active: pathname.startsWith("/admin/services"),
      permission: "content.create",
    },
    {
      title: "Blog",
      icon: "📝",
      href: "/admin/blog",
      active: pathname.startsWith("/admin/blog"),
      permission: "blog.create",
    },
    {
      title: "Actualités",
      icon: "📰",
      href: "/admin/actualites",
      active: pathname.startsWith("/admin/actualites"),
      permission: "actualites.create",
    },
    {
      title: "Portfolio",
      icon: "💼",
      href: "/admin/portfolio",
      active: pathname.startsWith("/admin/portfolio"),
      permission: "portfolio.create",
    },
    {
      title: "Galerie",
      icon: "📸",
      href: "/admin/galerie",
      active: pathname.startsWith("/admin/galerie"),
      permission: "gallery.create",
    },
    // Team & Partners
    {
      title: "Équipe d'Experts IT",
      icon: "👨‍💻",
      href: "/admin/team-experts",
      active: pathname.startsWith("/admin/team-experts"),
      permission: "content.create",
    },
    {
      title: "Équipe Dirigeante",
      icon: "👔",
      href: "/admin/leadership",
      active: pathname.startsWith("/admin/leadership"),
      permission: "content.create",
    },
    {
      title: "Partenaires Technologiques",
      icon: "🤝",
      href: "/admin/technology-partners",
      active: pathname.startsWith("/admin/technology-partners"),
      permission: "content.create",
    },
    // Company Information
    {
      title: "Statistiques Entreprise",
      icon: "📈",
      href: "/admin/company-statistics",
      active: pathname.startsWith("/admin/company-statistics"),
      permission: "content.create",
    },
    {
      title: "Nos Valeurs",
      icon: "💎",
      href: "/admin/company-values",
      active: pathname.startsWith("/admin/company-values"),
      permission: "content.create",
    },
    {
      title: "Notre Parcours",
      icon: "🛣️",
      href: "/admin/company-journey",
      active: pathname.startsWith("/admin/company-journey"),
      permission: "content.create",
    },
    {
      title: "Pourquoi Nous Choisir",
      icon: "⭐",
      href: "/admin/why-choose-us",
      active: pathname.startsWith("/admin/why-choose-us"),
      permission: "content.create",
    },
    {
      title: "Témoignages Clients",
      icon: "💬",
      href: "/admin/testimonials",
      active: pathname.startsWith("/admin/testimonials"),
      permission: "content.create",
    },
    // Contact & Communication
    {
      title: "Informations de Contact",
      icon: "📞",
      href: "/admin/contact-info",
      active: pathname.startsWith("/admin/contact-info"),
      permission: "content.create",
    },
    {
      title: "Heures d'Ouverture",
      icon: "🕒",
      href: "/admin/business-hours",
      active: pathname.startsWith("/admin/business-hours"),
      permission: "content.create",
    },
    {
      title: "Notre Localisation",
      icon: "📍",
      href: "/admin/location",
      active: pathname.startsWith("/admin/location"),
      permission: "content.create",
    },
    {
      title: "Réseaux Sociaux",
      icon: "📱",
      href: "/admin/social-media",
      active: pathname.startsWith("/admin/social-media"),
      permission: "content.create",
    },
    {
      title: "Newsletter",
      icon: "📧",
      href: "/admin/newsletter",
      active: pathname.startsWith("/admin/newsletter"),
      permission: "content.create",
    },
    // Users & Recruitment
    {
      title: "Recrutement",
      icon: "🎯",
      href: "/admin/recrutement",
      active: pathname.startsWith("/admin/recrutement"),
      permission: "jobs.create",
    },
    {
      title: "Commentaires",
      icon: "💭",
      href: "/admin/commentaires",
      active: pathname.startsWith("/admin/commentaires"),
      permission: "comments.moderate",
    },
    {
      title: "Utilisateurs",
      icon: "👥",
      href: "/admin/utilisateurs",
      active: pathname.startsWith("/admin/utilisateurs"),
      permission: "users.view",
    },
    // System
    {
      title: "Paramètres",
      icon: "⚙️",
      href: "/admin/parametres",
      active: pathname.startsWith("/admin/parametres"),
      permission: "settings.edit",
    },
  ];

  const visibleMenuItems = menuItems.filter(
    (item) => !item.permission || hasPermission(item.permission)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-200">
          <Link href="/admin" className="flex items-center min-w-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">
              I
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">
              INFONET Admin
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2"
          >
            ✕
          </button>
        </div>

        {/* User profile */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex items-center min-w-0">
            <img
              src={user?.avatar || "https://via.placeholder.com/40"}
              alt={user?.name}
              className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
            />
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </div>
              <div className="text-xs text-gray-500 capitalize">
                {user?.role}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 mb-20 overflow-y-auto">
          <div className="px-3 pb-4">
            {visibleMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-3 mb-1 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  item.active
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.title}
              </Link>
            ))}
          </div>
        </nav>

        {/* Quick Stats */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div className="text-center">
              <div className="font-semibold text-gray-900">24</div>
              <div>Articles</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">156</div>
              <div>Commentaires</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-400 hover:text-gray-600 lg:hidden mr-3"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                <span className="hidden sm:inline">Administration INFONET</span>
                <span className="sm:hidden">Admin</span>
              </h1>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Notifications */}
              <button className="relative text-gray-400 hover:text-gray-600 hidden sm:block">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM10.586 11l-7.071 7.071-1.414-1.414 7.071-7.071M15 3c1.1 0 2 .9 2 2v6l-2-2-2 2V5c0-1.1.9-2 2-2z"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2 rounded-lg hover:bg-gray-50"
                >
                  <img
                    src={user?.avatar || "https://via.placeholder.com/32"}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-sm text-left hidden sm:block">
                    <div className="font-medium text-gray-900">
                      {user?.name}
                    </div>
                    <div className="text-gray-500 capitalize">{user?.role}</div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 hidden sm:block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      href="/admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Mon Profil
                    </Link>
                    <Link
                      href="/admin/parametres"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Paramètres
                    </Link>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>

              {/* View site link */}
              <Link
                href="/"
                target="_blank"
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                <span className="hidden sm:inline">Voir le site</span>
                <span className="sm:hidden">Site</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>

        {/* Admin Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <div className="text-xs sm:text-sm text-gray-500">
                <span className="font-medium">INFONET Admin</span>
                <span className="mx-2">•</span>
                <span>Version 1.0.0</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                <span>Designed & Developed by</span>
                <span className="ml-1 font-medium text-blue-600">
                  Gis Daniel
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
