"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");

  const resetPassword = async () => {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Password reset successful ✅");
      window.location.href = "/login";
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-xl">
      <h1 className="text-2xl text-orange-400 mb-4">
        Reset Password
      </h1>

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-4 bg-black/40 border border-white/20 rounded"
      />

      <button
        onClick={resetPassword}
        className="w-full bg-orange-500 py-2 rounded"
      >
        Reset Password
      </button>
    </div>
  );
}
