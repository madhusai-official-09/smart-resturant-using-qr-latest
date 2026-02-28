"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [revenue, setRevenue] = useState(0);

  const fetchOrders = async () => {
    try {
    const res = await fetch("/api/dashboard");

    if (!res.ok) {
        console.error("API Failed");
        return;
    }
    const data = await res.json();

    if (data.success) {
      setOrders(data.orders);
      setRevenue(data.revenue);
    }
  } catch (err) {
    console.error("Error fetching orders:", err);
  }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="pt-28">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-white mb-10 text-center">
        Restaurant<span className="text-orange-400"> Dashboard</span>
        </motion.h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Orders" value={orders.length} />
        <StatCard title="Revenue Today" value={`₹${revenue}`} />
        <StatCard
          title="Tables Served"
          value={[...new Set(orders.map(o => o.table))].length}
        />
      </div>

      {/* ORDERS LIST */}
      <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white/10 p-5 rounded-xl"
          >
            <p className="font-bold text-orange-400">
              Table {order.table}
            </p>

            <p className="text-sm text-gray-300">
  Ordered by: {order.user?.name || "Guest"}
</p>

            {order.items.map((item: any, i: number) => (
              <p key={i} className="text-white">
                {item.name} × {item.quantity}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-white/10 p-6 rounded-xl text-center">
      <p className="text-gray-300">{title}</p>
      <h2 className="text-3xl font-bold text-orange-400 mt-2">
        {value}
      </h2>
    </div>
  );
}