"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");

  const reset = async () => {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Password reset successful 🎉");
      router.push("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
        <h1 className="text-2xl font-bold text-orange-400 mb-4">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New password"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 text-white border border-white/20"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={reset}
          className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
