"use client";

import Image from "next/image";
import Link from "next/link";
import ParticlesHero from "./ParticleBackground";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { MdFastfood } from "react-icons/md";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center text-white overflow-hidden pt-24">
      {/* Background Particles */}
      <ParticlesHero className="absolute inset-0 -z-10 pointer-events-none" />

      <motion.div
        className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24
        flex flex-col-reverse md:flex-row items-center justify-between gap-12"
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* LEFT CONTENT */}
        <motion.div
          className="w-full md:w-1/2 max-w-2xl text-center md:text-left"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <h1
  className="
    font-[var(--font-poppins)]
    text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
    font-bold leading-tight tracking-tight
    text-white drop-shadow-lg
  "
>
  Smart Restaurant <br />
  <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
    Management
  </span>{" "}
  <br />
  Using QR Scanner
</h1>

          {/* Typewriter Effect */}
          <div className="mt-6 text-gray-300 text-base sm:text-lg md:text-xl min-h-[40px]">
            <Typewriter
              options={{
                strings: [
                  "Seamless ordering 🍽️",
                  "Instant billing ⚡",
                  "Modern dining experience 🚀",
                  "Smart Restaurant Powered by QR 🔥",
                ],
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 30,
              }}
            />
          </div>

          {/* CTA Button */}
          <motion.div
            className="mt-8 flex justify-center md:justify-start"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3
                rounded-full text-base sm:text-lg font-semibold
                bg-orange-500 hover:bg-orange-600 transition-all duration-300
                shadow-[0_0_25px_rgba(255,140,0,0.6)]
                hover:shadow-[0_0_40px_rgba(255,140,0,0.9)]"
              >
                <MdFastfood size={20} />
                Order Now
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT CONTENT – QR CODE */}
        <motion.div
          className="relative w-full md:w-1/2 flex flex-col items-center"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          {/* Glowing Background */}
          <div
            className="absolute w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64
            rounded-2xl bg-orange-500 blur-2xl opacity-70 animate-pulse"
          />

          {/* QR Image */}
          <motion.div
            initial={{ rotate: -8, scale: 0.95 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <Image
              src="/images/qr.jpg"
              alt="QR Code for Smart Restaurant Menu"
              width={420}
              height={420}
              priority
              className="w-52 sm:w-64 md:w-80 lg:w-[420px] h-auto
              rounded-xl border-[6px] md:border-[8px] border-[#1a1a4d]
              shadow-[0_0_40px_#ff8c00] animate-float"
            />
          </motion.div>

          {/* Caption */}
          <motion.p
            className="mt-4 text-gray-300 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Scan to explore 🚀
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
