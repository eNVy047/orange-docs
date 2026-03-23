"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X, Rocket } from "lucide-react";

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
  const [openSections, setOpenSections] = useState<string[]>(["Chai aur Git"]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        const isOpen = openSections.includes(section.title);

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
                <span className={`transform transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}>
                  <span className="text-lg leading-none">›</span>
                </span>
                <span>{section.title}</span>
              </div>
            </button>

            {isOpen && (
              <div className="flex flex-col gap-1 pl-5">
                {section.items.map((item) => {
                  const isActive = pathname === `/docs/${item.slug}`;
                  return (
                    <Link
                      key={item.slug}
                      href={`/docs/${item.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
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
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed bottom-6 right-6 z-[60] p-4 bg-orange-400 text-black rounded-full shadow-lg md:hidden hover:scale-110 transition-transform active:scale-95"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed left-0 top-16 bottom-0 w-64 z-[56] transition-transform duration-300 border-r border-white/5 bg-[#0f0f0f] md:bg-transparent overflow-y-auto px-6
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <NavContent />
      </aside>
    </>
  );
}
