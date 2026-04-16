"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { CgClose } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { MdFastfood } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { id: 1, label: "Home", url: "/" },
  { id: 2, label: "Menu", url: "/menu" },
  { id: 3, label: "QR Codes", url: "/qr" },
  { id: 4, label: "Tables", url: "/tables" },
  { id: 5, label: "Orders", url: "/orders" },
  { id: 6, label: "About", url: "/about" },
  { id: 7, label: "Contact", url: "/contact" },
];

type Props = {
  showNav: boolean;
  closeNav: () => void;
  onStart?: () => void;
};

const NavItem: React.FC<{
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ label, href, active = false, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`relative block w-full px-4 py-3 rounded-xl text-[16px] font-medium
        transition-all duration-300 ease-out
        ${
          active
            ? "bg-[#2b1304] text-white border border-orange-400/40"
            : "text-gray-300"
        }
        hover:bg-gradient-to-r hover:from-[#ffb76b33] 
        hover:via-[#ff8c0033] hover:to-[#ff5e0033]
        hover:shadow-[0_0_18px_#ff8c0033] hover:scale-[1.02]
      `}
    >
      <span className="select-none">{label}</span>
      {active && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full" />
      )}
    </Link>
  );
};

const MobileNav: React.FC<Props> = ({ closeNav, showNav, onStart }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = await res.json();
      setUser(data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Logout handler
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    closeNav();
    router.push("/login");
    router.refresh();
  };

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = showNav ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showNav]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNav();
    };
    if (showNav) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showNav, closeNav]);

  return (
    <AnimatePresence>
      {showNav && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeNav}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Navigation Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-md rounded-2xl p-[1px]
            bg-gradient-to-r from-orange-500/40 via-transparent to-orange-400/20 shadow-2xl"
          >
            <div
              className="rounded-2xl bg-black/80 backdrop-blur-lg 
              border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] 
              p-5 sm:p-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/logo.png"
                      alt="SmartRestaurant Logo"
                      width={40}
                      height={40}
                      className="object-cover"
                      priority
                    />
                  </div>
                  <h3 className="text-white font-bold text-lg">
                    SmartRestaurant
                  </h3>
                </div>
                <button
                  onClick={closeNav}
                  aria-label="Close menu"
                  className="p-2 rounded-md text-slate-300 hover:text-red-500 transition"
                >
                  <CgClose size={22} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="space-y-2">
                {navLinks.map((link) => {
                  const active =
                    link.url === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.url);
                  return (
                    <NavItem
                      key={link.id}
                      label={link.label}
                      href={link.url}
                      active={active}
                      onClick={closeNav}
                    />
                  );
                })}
              </nav>

              <div className="h-px bg-white/10 my-6" />

              {/* Order Now Button */}
              <Link href="/menu" className="block">
                <Button
                  onClick={() => {
                    onStart?.();
                    closeNav();
                  }}
                  className="w-full rounded-xl py-3 text-white bg-orange-500 hover:bg-orange-600
                  shadow-[0_0_25px_rgba(255,140,0,0.6)]
                  hover:shadow-[0_0_40px_rgba(255,140,0,0.9)]
                  flex items-center justify-center gap-2 text-[16px]"
                >
                  <MdFastfood size={20} />
                  Order Now
                </Button>
              </Link>

              <div className="h-px bg-white/10 my-6" />

              {/* Auth Section */}
              <div>
                {loading ? (
                  // Loading skeleton
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
                    <div className="w-9 h-9 rounded-full bg-gray-700 animate-pulse shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-700 animate-pulse rounded w-24" />
                      <div className="h-2 bg-gray-700 animate-pulse rounded w-16" />
                    </div>
                    <div className="w-16 h-8 bg-gray-700 animate-pulse rounded-lg" />
                  </div>
                ) : user ? (
                  // ✅ User profile — shown after login
                  <div
                    className="flex items-center justify-between
                    bg-orange-500/[0.08] border border-orange-400/25
                    rounded-xl px-4 py-3"
                  >
                    {/* Avatar + name */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0
                        bg-orange-500/20 border-[1.5px] border-orange-400/60
                        text-orange-400 text-sm font-medium"
                      >
                        {user.name?.slice(0, 2).toLowerCase() ?? "?"}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium leading-tight">
                          {user.name}
                        </p>
                        <p className="text-slate-400 text-[11px]">Logged in</p>
                      </div>
                    </div>

                    {/* Logout */}
                    <button
                      onClick={logout}
                      className="bg-red-500 hover:bg-red-600 text-white text-[13px]
                        font-medium px-4 py-1.5 rounded-lg transition whitespace-nowrap"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  // Login / Register — shown before login
                  <div className="flex flex-col gap-3">
                    <Link href="/login" onClick={closeNav}>
                      <button className="w-full py-2 rounded-lg border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition">
                        Login
                      </button>
                    </Link>
                    <Link href="/register" onClick={closeNav}>
                      <button className="w-full py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition">
                        Register
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
