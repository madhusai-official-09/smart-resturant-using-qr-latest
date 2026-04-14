import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import Footer from "@/components/Home/Footer/Footer";

// Primary font (body text)
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

// Secondary font (headings)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smart Restaurant Management System Using QR Code",
  description:
    "A Smart Restaurant Management System Using QR Code Technology to Enhance Customer Experience and Streamline Operations.",
  keywords: [
    "Smart Restaurant",
    "QR Code Ordering",
    "Restaurant Management System",
    "Digital Menu",
    "Contactless Ordering",
  ],
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased relative bg-black text-white">
        
        {/* Background Image */}
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/background.png')" }}
        />

        {/* Dark Overlay */}
        <div className="fixed inset-0 -z-10 bg-black/70" />

        {/* Main Content */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <ResponsiveNav />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>

        {/* Razorpay Checkout Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
