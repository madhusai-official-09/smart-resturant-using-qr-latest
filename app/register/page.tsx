"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ParticlesHero from "@/components/Home/Hero/ParticleBackground";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Registered successfully 🎉 Please login");
        router.push("/login");
      } else {
        alert(data.message || "User already exists");
      }
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">
      <ParticlesHero className="absolute inset-0 -z-10 pointer-events-none" />

      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
        <h1 className="text-3xl font-bold text-orange-400 mb-6 text-center">
          Register
        </h1>

        <input
          placeholder="Name"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 text-white border border-white/20"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 text-white border border-white/20"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 text-white border border-white/20"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          disabled={loading}
          className="w-full py-2 rounded bg-orange-500 hover:bg-orange-600 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-orange-400">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
