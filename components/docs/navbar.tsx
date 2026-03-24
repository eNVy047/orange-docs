"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun, Github, Youtube, Instagram, Linkedin, Twitter, Rocket, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/lib/context/sidebar-context";

export function DocsNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isOpen, toggle } = useSidebar();
  const pathname = usePathname();
  const isDocsPage = pathname.startsWith("/docs");

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-black/40 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.3)]"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isDocsPage && (
            <button
               onClick={toggle}
               className="p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors md:hidden text-gray-400 hover:text-white"
               aria-label="Toggle Sidebar"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
          
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 relative transform transition-transform group-hover:scale-110">
              <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">ORANGE</span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
