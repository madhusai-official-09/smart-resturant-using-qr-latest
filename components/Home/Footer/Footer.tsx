"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black/40 backdrop-blur-md border-t border-red-600/30 text-gray-300 px-6 sm:px-10 lg:px-20 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          
          {/* Logo & Description */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/80 rounded-full flex items-center justify-center overflow-hidden shadow-lg shadow-red-600/40">
                <Image
                  src="/images/logo.png"
                  alt="SmartRestaurant Logo"
                  width={40}
                  height={40}
                  priority
                  className="object-contain"
                />
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
                SmartRestaurant
              </h1>
            </div>

            <p className="text-gray-300/80 text-sm leading-relaxed mt-4 max-w-sm">
              Elevate your dining experience with SmartRestaurant—the ultimate
              solution for digital menus, QR ordering, and seamless restaurant
              management.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-3 mt-5">
              {[
                { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/pitanimadhusayi" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Social Media"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500 transition duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-gray-100 mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Menu", href: "/menu" },
                { name: "QR Codes", href: "/qr" },
                { name: "Tables", href: "/tables" },
                { name: "Orders", href: "/orders" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-red-400 transition duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-100 mb-4">
              Contact
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:madhusaipitani95@gmail.com"
                  className="hover:text-red-400 transition duration-300"
                >
                  madhusaipitani95@gmail.com
                </a>
              </li>

              <li>
                <a
                  href="tel:+918247842565"
                  className="hover:text-red-400 transition duration-300"
                >
                  +91 8247842565
                </a>
              </li>

              <li>Allavaram</li>
              <li>Andhra Pradesh, India</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-red-600/30 mt-10 pt-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400 text-center md:text-left">
          <p>© {year} SmartRestaurant. All Rights Reserved.</p>
          <p>
            Built with <span className="text-red-400">❤️</span> using Next.js &
            Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
