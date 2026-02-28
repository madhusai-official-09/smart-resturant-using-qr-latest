"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useRouter } from "next/navigation";

const Nav = ({ openNav }: { openNav: () => void }) => {
  const [navBg, setNavBg] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = () => setNavBg(window.scrollY >= 90);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // 🔥 CHECK USER LOGIN
  const fetchUser = async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    setUser(data.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 🔥 LOGOUT
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        navBg ? "bg-[#1b0b03]/90 shadow-md" : "bg-transparent"
      }`}
      style={{ height: "12vh" }}
    >
      <div className="flex items-center h-full justify-between w-[90%] mx-auto">
        
        {/* LOGO */}
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center overflow-hidden">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
          </div>
          <h1 className="text-xl text-white font-bold">SmartRestaurant</h1>
        </div>

        {/* LINKS */}
        <nav className="hidden lg:flex items-center space-x-10">
          <Link href="/" className="text-gray-300 hover:text-orange-400">Home</Link>
          <Link href="/menu" className="text-gray-300 hover:text-orange-400">Menu</Link>
          <Link href="/qr" className="text-gray-300 hover:text-orange-400">QR</Link>
          <Link href="/tables" className="text-gray-300 hover:text-orange-400">Tables</Link>
          <Link href="/orders" className="text-gray-300 hover:text-orange-400">Orders</Link>
          <Link href="/contact" className="text-gray-300 hover:text-orange-400">Contact</Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link href="/login">
                <button className="px-4 py-2 border border-orange-400 text-orange-400 rounded-lg">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <span className="text-orange-400 font-semibold">
                {user.name}
              </span>

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Logout
              </button>
            </>
          )}

          {/* MOBILE */}
          <button onClick={openNav} className="lg:hidden text-white">
            <HiBars3BottomRight size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
