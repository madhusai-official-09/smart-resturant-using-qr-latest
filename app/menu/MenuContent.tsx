"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const allMenuItems = [
  { category: "veg", name: "Aromatic-Spices-grains", price: 1, img: "/images/veg/aromatic-spices-grains-culinary-delight.png" },
  { category: "veg", name: "Falafel Bowl", price: 249, img: "/images/veg/delicious-falafel-bowl-vibrant-healthy-mediterranean-meal.png" },
  { category: "veg", name: "Veg Fried Rice", price: 179, img: "/images/veg/vegetable-fried-rice.png" },
  { category: "veg", name: "Fresh Veg Salad", price: 149, img: "/images/veg/vegetable-salad.jpg" },
  { category: "veg", name: "Chole Bhature", price: 229, img: "/images/veg/chole-bhature.png" },
  { category: "veg", name: "Spicy Chana Masala", price: 199, img: "/images/veg/spicy-chana-masala.png" },
  { category: "veg", name: "Mushroom Soup", price: 159, img: "/images/veg/bowl-cream-mushroom-soup-with-bread.png" },
  { category: "veg", name: "Veg Salad Bowl", price: 129, img: "/images/veg/vegetable-salad-bowl-healthy.png" },

  { category: "nonveg", name: "Breaded Chicken Cutlets", price: 249, img: "/images/nonveg/breaded-chicken.jpg" },
  { category: "nonveg", name: "Korean Fried Chicken", price: 299, img: "/images/nonveg/delicious-korean-fried-chicken.jpg" },
  { category: "nonveg", name: "Spicy Mutton Curry", price: 329, img: "/images/nonveg/delicious-spicy-lamb-curry-metal-bowl.jpg" },
  { category: "nonveg", name: "Fried Chicken Platter", price: 279, img: "/images/nonveg/fried-chicken-tobacco-lettuce-tomatoes.jpg" },
  { category: "nonveg", name: "Crispy Fried Fish", price: 289, img: "/images/nonveg/fried-fish-white-plate.jpg" },
  { category: "nonveg", name: "Grilled Pork Steak", price: 349, img: "/images/nonveg/juicy-grilled-pork-fillet-steak-with-green-beans.jpg" },
  { category: "nonveg", name: "Chicken Biryani", price: 299, img: "/images/nonveg/non veg biriyani.png" },
  { category: "nonveg", name: "Whole Roasted Chicken", price: 399, img: "/images/nonveg/roasted-chicken.jpg" },
  { category: "nonveg", name: "Roasted Chicken Thighs", price: 319, img: "/images/nonveg/roasted-chicken-thighs-with-roasted-cherry-tomatoes.jpg" },

  { category: "starter", name: "Veg Sandwich Platter", price: 149, img: "/images/starters/close-up-sandwich-isolated.png" },
  { category: "starter", name: "Crispy Veg Rolls", price: 179, img: "/images/starters/food-gastronomy-comida-gourmet-foodie.jpg" },
  { category: "starter", name: "Stuffed Eggplant Rolls", price: 189, img: "/images/starters/front-view-stuffed-eggplant-rolls-white-oval-plate-different-spices-small-bowls-leaves-grey.jpg" },
  { category: "starter", name: "Eggplant Rolls with Potatoes", price: 199, img: "/images/starters/front-view-delicious-eggplant-rolls-cooked-dish-with-baked-potatoes-seasonings-dark-space.jpg" },
  { category: "starter", name: "Baked Potato Pie", price: 169, img: "/images/starters/front-view-sliced-potato-pie-with-seasonings-dark-grey-background-pie-cake-bake-dough-ripe.jpg" },
  { category: "starter", name: "Avocado Veg Salad", price: 159, img: "/images/starters/high-angle-view-vegan-salad-with-avocado.jpg" },
  { category: "starter", name: "Healthy Veg Meal Box", price: 179, img: "/images/starters/restaurant-healthy-food-delivery-take-away-boxes.jpg" },
  { category: "starter", name: "Boiled Egg & Veg Plate", price: 149, img: "/images/starters/top-view-plate-with-boiled-eggs-vegetables.jpg" },
  { category: "starter", name: "Roasted Vegetables Platter", price: 169, img: "/images/starters/top-view-roasted-vegetables-roasted-vegetables-plate.jpg" },
];

export default function MenuContent() {
  const [activeCategory, setActiveCategory] = useState("veg");
  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);

  const params = useSearchParams();
  const tableFromQR = params.get("table");

  useEffect(() => {
    if (tableFromQR) {
      localStorage.setItem("selectedTable", tableFromQR);
    }
  }, [tableFromQR]);

  const handleOrder = async (item: any) => {
    try {
      setLoadingItem(item.name);
      const table = localStorage.getItem("selectedTable");
      if (!table) return alert("No table found!");

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table,
          items: [{ name: item.name, price: item.price, quantity: 1 }],
        }),
      });

      const data = await res.json();
      data.success
        ? alert(`${item.name} added 😊`)
        : alert("Something went wrong");
    } catch {
      alert("Server error ❌");
    } finally {
      setLoadingItem(null);
    }
  };

  const placeOrder = async () => {
    const table = localStorage.getItem("selectedTable");
    if (!table) return alert("No table found!");

    try {
      setPlacing(true);

      const cartRes = await fetch("/api/cart");
      const cartData = await cartRes.json();

      if (!cartData.cart?.items?.length) {
        alert("Cart is empty!");
        return;
      }

      const total = cartData.cart.items.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      );

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const data = await res.json();
      if (!data.success) return alert("Payment init failed");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "Smart Restaurant",
        description: "Food Order Payment",
        order_id: data.orderId,
        handler: async function () {
          const orderRes = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              table,
              items: cartData.cart.items,
            }),
          });

          const orderData = await orderRes.json();
          if (orderData.success) {
            await fetch("/api/cart", { method: "DELETE" });
            alert("Payment successful 🎉");
            window.location.href = "/orders";
          }
        },
        theme: { color: "#f97316" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch {
      alert("Server error ❌");
    } finally {
      setPlacing(false);
    }
  };

  const filteredMenu = allMenuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 pb-32 text-white bg-[#05051b]"
    >
      {/* HEADER */}
      <div className="pt-24 sm:pt-28">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
        >
          Explore Our{" "}
          <span className="text-orange-400">Delicious Menu</span>
        </motion.h1>

        {tableFromQR && (
          <motion.p className="mt-2 text-green-400 text-sm sm:text-base">
            📌 Ordering for <b>Table {tableFromQR}</b>
          </motion.p>
        )}
      </div>

      {/* CATEGORY BUTTONS */}
      <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
        {["veg", "nonveg", "starter"].map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 sm:px-6 py-2 rounded-full border text-sm sm:text-base ${
              activeCategory === cat
                ? "bg-orange-500 border-orange-400"
                : "border-gray-500"
            }`}
          >
            {cat.toUpperCase()}
          </motion.button>
        ))}
      </div>

      {/* MENU GRID */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
      >
        {filteredMenu.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 hover:shadow-xl transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Image
              src={item.img}
              alt={item.name}
              width={300}
              height={200}
              className="rounded-xl w-full h-44 object-cover"
            />

            <h3 className="mt-3 text-lg sm:text-xl font-semibold">
              {item.name}
            </h3>
            <p className="text-orange-400 font-bold text-lg">
              ₹{item.price}
            </p>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOrder(item)}
              disabled={loadingItem === item.name}
              className="mt-4 px-5 py-2 bg-orange-500 hover:bg-orange-600 rounded-full w-full text-sm sm:text-base"
            >
              {loadingItem === item.name ? "Adding..." : "Add To Cart"}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* CONFIRM ORDER BUTTON */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={placeOrder}
          disabled={placing}
          className="w-full max-w-md px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-full text-sm sm:text-lg font-semibold shadow-lg"
        >
          {placing ? "Placing Order..." : "Confirm Order"}
        </motion.button>
      </div>
    </motion.div>
  );
}
