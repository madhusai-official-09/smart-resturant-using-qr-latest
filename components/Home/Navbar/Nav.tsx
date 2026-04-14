"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "QR Codes", href: "/qr" },
  { label: "Tables", href: "/tables" },
  { label: "Orders", href: "/orders" },
  { label: "Contact", href: "/contact" },
];

const Nav = ({ openNav }: { openNav: () => void }) => {
  const [navBg, setNavBg] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  // Change navbar background on scroll
  useEffect(() => {
    const handler = () => setNavBg(window.scrollY >= 80);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });
      const data = await res.json();
      setUser(data.user || null);
    } catch (error) {
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
    router.push("/login");
    router.refresh();
  };

  // Check active route
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        navBg
          ? "bg-[#1b0b03]/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-[70px] sm:h-[75px] lg:h-[80px] w-[92%] max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="SmartRestaurant Logo"
              width={40}
              height={40}
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-white">
            SmartRestaurant
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-3 py-2 transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-orange-400"
                  : "text-gray-300 hover:text-orange-400"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-orange-400 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-20 h-8 bg-gray-700 animate-pulse rounded-md hidden sm:block" />
          ) : !user ? (
            <>
              <Link href="/login">
                <button className="hidden sm:block px-4 py-2 border border-orange-400 text-orange-400 rounded-lg hover:bg-orange-400 hover:text-white transition">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="hidden sm:block px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-orange-400 font-semibold">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={openNav}
            aria-label="Open menu"
            className="flex items-center justify-center w-10 h-10 rounded-md lg:hidden text-white hover:bg-white/10 transition"
          >
            <HiBars3BottomRight size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
