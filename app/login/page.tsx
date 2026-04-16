"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANT
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (!data.success) {
        alert(data.message || "Login failed");
        return;
      }

      // 🔥 IMPORTANT: refresh layout so navbar updates
      router.push("/qr");
      router.refresh();

    } catch (err) {
      console.log(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">

        <h1 className="text-3xl font-bold mb-6 text-center text-orange-400">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 text-white border border-white/20"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-black/40 text-white border border-white/20"
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white bg-orange-500"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-6 text-center text-sm text-gray-300">
          <p>
            New user?{" "}
            <a href="/register" className="text-orange-400">Register</a>
          </p>

          <p className="mt-2">
            <a href="/forgot-password" className="text-orange-400">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
