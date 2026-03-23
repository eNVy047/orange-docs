"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X, Rocket } from "lucide-react";
import { useSidebar } from "@/lib/context/sidebar-context";

const SIDEBAR_NAV = [
  {
    title: "Getting Started",
    items: [
      { title: "Getting Started", slug: "getting-started" },
    ]
  },
  {
    title: "Git and Github",
    items: [
      { title: "Welcome", slug: "welcome" },
      { title: "Git and GitHub", slug: "git-and-github" },
      { title: "Terminology", slug: "terminology" },
      { title: "Behind the scenes", slug: "behind-the-scenes" },
      { title: "Branches in Git", slug: "branches-in-git" },
      { title: "Diff, Stash, Tags", slug: "diff-stash-tags" },
      { title: "Managing History", slug: "managing-history" },
      { title: "Collaborate with Github", slug: "collaborate-with-github" },
    ]
  }
];

export function DocsSidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<string[]>(["Chai aur Git", "Git and Github"]);
  const { isOpen, setIsOpen } = useSidebar();

  const toggleSection = (title: string) => {
    setOpenSections(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const NavContent = () => (
    <nav className="flex flex-col gap-1 py-6">
      {SIDEBAR_NAV.map((section) => {
        const isGettingStarted = section.title === "Getting Started";
        const isActiveSection = section.items.some(item => pathname === `/docs/${item.slug}`);
        const isSectionOpen = openSections.includes(section.title);

        if (isGettingStarted) {
          const isActive = pathname === `/docs/${section.items[0].slug}`;
          return (
            <Link
              key={section.title}
              href={`/docs/${section.items[0].slug}`}
              className={`block px-3 py-1.5 text-sm font-medium transition-colors ${isActive
                  ? "text-orange-400 border-l-2 border-orange-400 pl-3"
                  : "text-gray-400 hover:text-white pl-3"
                }`}
            >
              {isActive && <span className="mr-2">•</span>}
              {section.title}
            </Link>
          );
        }

        return (
          <div key={section.title} className="flex flex-col gap-1">
            <button
              onClick={() => toggleSection(section.title)}
              className={`w-full flex items-center justify-between px-3 py-1.5 text-sm font-semibold transition-colors group ${isActiveSection ? "text-orange-400" : "text-gray-200 hover:text-white"
                }`}
            >
              <div className="flex items-center gap-2">
                <span className={`transform transition-transform duration-200 ${isSectionOpen ? "rotate-90" : ""}`}>
                  <span className="text-lg leading-none">›</span>
                </span>
                <span>{section.title}</span>
              </div>
            </button>

            {isSectionOpen && (
              <div className="flex flex-col gap-1 pl-5">
                {section.items.map((item) => {
                  const isActive = pathname === `/docs/${item.slug}`;
                  return (
                    <Link
                      key={item.slug}
                      href={`/docs/${item.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={`block py-1 text-sm transition-colors ${isActive
                          ? "text-orange-400"
                          : "text-gray-400 hover:text-white"
                        }`}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile Sidebar (Drawer) */}
      <div 
        className={`fixed inset-0 z-[100] md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Mobile Content */}
        <aside 
          className={`absolute left-0 top-0 bottom-0 w-[280px] bg-[#0f0f0f] border-r border-white/5 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-6 pt-8 pb-4">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <div className="w-8 h-8 relative">
                <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase">ORANGE</span>
            </Link>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 -mr-2 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-6">
            <NavContent />
          </div>
        </aside>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
          <NavContent />
        </div>
      </aside>
    </>
  );
}
