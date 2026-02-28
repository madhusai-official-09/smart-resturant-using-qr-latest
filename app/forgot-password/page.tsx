"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const submit = async () => {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      router.push(`/reset-password?token=${data.token}`);
    } else {
      alert(data.message || "User not found");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
        <h1 className="text-2xl font-bold text-orange-400 mb-4">
          Forgot Password
        </h1>

        <input
          placeholder="Enter your email"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 text-white border border-white/20"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded transition"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}
