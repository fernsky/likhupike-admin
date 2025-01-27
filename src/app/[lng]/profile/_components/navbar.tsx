"use client";
import React, { useState } from "react";
import ChangeLanguage from "./change-language";
import { useTranslation } from "@/app/i18n/client";
import Search from "./search";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Map,
  Download,
  User,
  MapPin,
  Search as SearchIcon,
} from "lucide-react";

interface NavbarProps {
  lng: string;
}

const Navbar: React.FC<NavbarProps> = ({ lng }) => {
  const { t } = useTranslation(lng, "navbar", {});
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      href: `/${lng}/profile`,
      label: t("profile"),
      icon: <User className="w-4 h-4" />,
    },
    { href: `/${lng}/map`, label: t("map"), icon: <Map className="w-4 h-4" /> },
    {
      href: "#",
      label: t("downloads"),
      icon: <Download className="w-4 h-4" />,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-green-100/50">
      <div className="bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={`/${lng}`} className="flex items-center gap-2 group">
              <div className="p-1 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
                <MapPin className="w-5 h-5 text-green-700" />
              </div>
              <span className="text-green-800 font-semibold text-lg tracking-tight group-hover:text-green-700 transition-colors">
                {t("brand")}
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <div className="relative">
                <Search />
              </div>
              <div className="flex items-center gap-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-700 rounded-md hover:bg-green-50 transition-all duration-200"
                  >
                    {item.icon}
                    <span className="tracking-wide">{item.label}</span>
                  </Link>
                ))}
                <div className="pl-2 border-l border-green-100">
                  <ChangeLanguage lng={lng} />
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-green-100"
            >
              <div className="bg-white px-4 pt-2 pb-3 space-y-3">
                <div className="p-2">
                  <Search />
                </div>
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 text-base font-medium text-gray-700 hover:text-green-700 rounded-lg hover:bg-green-50 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span className="tracking-wide">{item.label}</span>
                  </Link>
                ))}
                <div className="px-3 py-2.5 border-t border-green-100">
                  <ChangeLanguage lng={lng} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
