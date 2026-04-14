"use client";

import { motion } from "framer-motion";
import ParticlesHero from "@/components/Home/Hero/ParticleBackground";

interface FeatureProps {
  title: string;
  text: string;
}

export default function AboutSmartRestaurant() {
  return (
    <motion.section
      className="relative min-h-screen w-full overflow-hidden px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Background Particles */}
      <ParticlesHero className="absolute inset-0 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          className="pt-24 sm:pt-28 lg:pt-32 text-center lg:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            About{" "}
            <span className="text-orange-400">
              Smart Restaurant QR System
            </span>
          </h1>

          <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-3xl mx-auto lg:mx-0">
            Smart Restaurant is a modern dining solution allowing customers to
            scan a QR code, view menus, place orders, and track status — all
            digitally without waiting for a waiter 🚀
          </p>
        </motion.div>

        {/* ABOUT BLOCK */}
        <motion.div
          className="mt-10 sm:mt-12 bg-white/10 border border-white/10 backdrop-blur-lg rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-orange-400">
            ✨ What is Smart Restaurant?
          </h2>

          <p className="mt-3 text-gray-300 leading-relaxed text-sm sm:text-base">
            Smart Restaurant is built to enhance the dining experience using QR
            technology and AI-powered automation. Customers simply scan the QR,
            browse menu items, add to cart, confirm table number, place an
            order, and track real-time progress.
          </p>
        </motion.div>

        {/* FEATURES GRID */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              text={feature.text}
            />
          ))}
        </motion.div>

        {/* TECHNOLOGY */}
        <motion.div
          className="mt-12 sm:mt-14 bg-white/10 border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-orange-400">
            🧠 Technologies Used
          </h2>

          <ul className="mt-4 text-gray-300 space-y-2 text-sm sm:text-base">
            <li>• Next.js 14 App Router</li>
            <li>• TypeScript</li>
            <li>• Tailwind CSS + ShadCN UI</li>
            <li>• MongoDB + Mongoose</li>
            <li>• REST APIs</li>
            <li>• Animated Particle Backgrounds</li>
          </ul>
        </motion.div>

        {/* MISSION */}
        <motion.div
          className="mt-12 sm:mt-14 mb-16 sm:mb-20 bg-white/10 border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-orange-400">
            🎯 Our Mission
          </h2>

          <p className="mt-3 text-gray-300 leading-relaxed text-sm sm:text-base">
            Our goal is to create a futuristic dining experience where
            technology meets comfort. Smart Restaurant saves time, improves
            service speed, reduces staff workload, and offers customers a
            smooth digital journey.
          </p>

          <p className="mt-4 text-green-400 font-semibold text-sm sm:text-base">
            Smart Dining • Smart Experience • Smart Future 🍕🍔🍟
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

const features: FeatureProps[] = [
  {
    title: "📱 QR Based Ordering",
    text: "Scan & order instantly without waiters.",
  },
  {
    title: "🛒 Smart Cart System",
    text: "Add items one-by-one smoothly.",
  },
  {
    title: "🍽️ Table Selection",
    text: "Avoid confusion. Select your table easily.",
  },
  {
    title: "📦 Live Order Tracking",
    text: "Status: Preparing → Cooking → Completed.",
  },
  {
    title: "💾 MongoDB Storage",
    text: "Secure cloud database storage.",
  },
  {
    title: "⚡ Fast & Modern UI",
    text: "Smooth animations & powerful UI.",
  },
];

function FeatureCard({ title, text }: FeatureProps) {
  return (
    <motion.div
      className="bg-white/10 border border-white/10 rounded-2xl p-5 sm:p-6 hover:bg-white/20 transition-all duration-300 shadow-lg"
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-lg sm:text-xl font-semibold text-orange-400">
        {title}
      </h3>
      <p className="text-gray-300 mt-2 text-sm sm:text-base">
        {text}
      </p>
    </motion.div>
  );
}
