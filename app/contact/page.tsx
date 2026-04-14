"use client";

import { ContactIcon } from "lucide-react";
import {
  BiEnvelope,
  BiLogoLinkedin,
  BiMap,
  BiPhone,
} from "react-icons/bi";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
}

const ContactPage = () => {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSending(true);
    setStatus("");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          user_name: form.name,
          user_email: form.email,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      className="pt-24 sm:pt-28 pb-20 sm:pb-28 px-4 sm:px-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* HEADER */}
      <motion.div
        className="text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-100">
          Get In <span className="text-orange-400">Touch</span>
        </h1>
        <p className="text-gray-400 mt-4 text-base sm:text-lg">
          We'd love to hear from you 🚀
        </p>
      </motion.div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch mt-12 sm:mt-14">
        {/* LEFT INFO CARD */}
        <motion.div
          className="w-full bg-black/40 border border-orange-500/40 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-orange-400 text-xl">
              <ContactIcon />
            </span>
            <h2 className="text-lg font-semibold text-white">
              Contact Info
            </h2>
          </div>

          <ContactItem
            icon={<BiPhone />}
            title="Phone"
            value="+91 8247842565"
            href="tel:+918247842565"
          />
          <ContactItem
            icon={<BiEnvelope />}
            title="Email"
            value="madhusaipitani95@gmail.com"
            href="mailto:madhusaipitani95@gmail.com"
          />
          <ContactItem
            icon={<BiLogoLinkedin />}
            title="LinkedIn"
            value="linkedin.com/in/pitanimadhusayi"
            href="https://linkedin.com/in/pitanimadhusayi"
          />
          <ContactItem
            icon={<BiMap />}
            title="Address"
            value="Allavaram, Andhra Pradesh, India"
            href="https://www.google.com/maps?q=Allavaram,Andhra+Pradesh,India"
          />
        </motion.div>

        {/* RIGHT FORM */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-black/40 border border-orange-500/40 rounded-2xl p-5 sm:p-8 md:p-10 shadow-xl backdrop-blur-md"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="px-4 py-3.5 bg-[#0a0a24] text-white rounded-md w-full outline-none placeholder:text-white/60 mb-5 border border-transparent focus:border-orange-500 transition-all"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="px-4 py-3.5 bg-[#0a0a24] text-white rounded-md w-full outline-none placeholder:text-white/60 mb-5 border border-transparent focus:border-orange-500 transition-all"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="px-4 py-3.5 bg-[#0a0a24] text-white rounded-md w-full h-44 outline-none placeholder:text-white/60 border border-transparent focus:border-orange-500 transition-all"
          />

          {/* Status Messages */}
          {status === "success" && (
            <p className="text-green-400 mb-4">
              ✅ Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 mb-4">
              ❌ Failed to send message. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="mt-4 w-full sm:w-auto px-10 py-3.5 bg-orange-500 hover:bg-orange-600 transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(255,140,0,0.6)] hover:shadow-[0_0_35px_rgba(255,140,0,1)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
};

const ContactItem: React.FC<ContactItemProps> = ({
  icon,
  title,
  value,
  href,
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ x: 5 }}
    className="flex items-center gap-4 mb-6 group transition-all duration-300"
  >
    <span className="text-orange-400 text-3xl transition-transform duration-300 group-hover:scale-110">
      {icon}
    </span>
    <div>
      <p className="text-gray-200 font-semibold text-lg group-hover:text-orange-400 transition-colors">
        {title}
      </p>
      <p className="text-gray-400 text-sm group-hover:text-gray-200">
        {value}
      </p>
    </div>
  </motion.a>
);

export default ContactPage;
