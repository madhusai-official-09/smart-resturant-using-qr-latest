"use client";

import { useEffect, useState } from "react";
import ParticlesHero from "@/components/Home/Hero/ParticleBackground";
import { Trash2 } from "lucide-react";

export default function TablesPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [table, setTable] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch Cart
  const fetchCart = async () => {
    const res = await fetch("/api/cart");
    if (!res.ok) return;
    const data = await res.json();
    if (data.success && data.cart) setCart(data.cart.items || []);
  };

  useEffect(() => {
    fetchCart();

    const params = new URLSearchParams(window.location.search);
    const qrTable = params.get("table");

    if (qrTable) {
      setTable(Number(qrTable));
      localStorage.setItem("selectedTable", qrTable);
    } else {
      const storedTable = localStorage.getItem("selectedTable");
      if (storedTable) setTable(Number(storedTable));
    }
  }, []);

  const selectTable = (num: number) => {
    setTable(num);
    localStorage.setItem("selectedTable", String(num));
    alert(`Table ${num} selected 👍`);
  };

  const removeItem = async (name: string) => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemName: name }),
    });

    const data = await res.json();
    if (data.success) setCart(data.cart.items);
  };

  const clearCart = async () => {
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clear: true }),
    });
    setCart([]);
  };

  const placeOrder = async () => {
    if (!table) return alert("Please select a table 🙂");
    if (!cart.length) return alert("Cart is empty!");

    try {
      setLoading(true);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table, items: cart }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Order placed successfully 🎉");
        await clearCart();
        window.location.href = "/orders";
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 text-white bg-[#05051b]">
      <ParticlesHero className="absolute inset-0 -z-10 pointer-events-none" />

      {/* HEADER */}
      <div className="pt-24 sm:pt-28">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Select <span className="text-orange-400">Table</span>
        </h1>
        <p className="text-gray-300 mt-2 text-sm sm:text-base">
          QR Scanned Table will auto-select 🔥
        </p>
      </div>

      {/* CART */}
      <div className="mt-8 sm:mt-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold">🛒 Your Cart</h2>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            No items yet — go to Menu and add food 😋
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {cart.map((item: any, i: number) => (
              <div
                key={i}
                className="bg-white/10 border border-white/10 rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <span className="text-base sm:text-lg font-semibold">
                    {item.name}
                  </span>
                  <p className="text-orange-400 font-bold">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.name)}
                  className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TABLE SELECTION */}
      <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-24">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div
            key={num}
            onClick={() => selectTable(num)}
            className={`cursor-pointer bg-white/10 border border-white/10 
              p-4 sm:p-6 rounded-2xl text-center hover:scale-105 transition-all
              ${
                table === num
                  ? "bg-orange-500 shadow-[0_0_25px_rgba(255,140,0,0.7)]"
                  : ""
              }`}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              Table {num}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-300">
              {table === num ? "Selected ✔️" : "Tap to select"}
            </p>
          </div>
        ))}
      </div>

      {/* CONFIRM ORDER BUTTON */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4">
          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full sm:w-auto max-w-md px-6 sm:px-10 py-3 
              rounded-full text-base sm:text-lg font-semibold
              bg-orange-500 hover:bg-orange-600 transition 
              disabled:opacity-60 shadow-lg"
          >
            {loading ? "Placing Order..." : "Confirm Order"}
          </button>
        </div>
      )}
    </div>
  );
}
