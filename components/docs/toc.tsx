"use client";

import React, { useState, useEffect } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function DocsTOC() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const extractHeadings = () => {
      const elements = Array.from(document.querySelectorAll("h2, h3"))
        .filter((el) => el.id)
        .map((el) => ({
          id: el.id,
          text: el.textContent || "",
          level: parseInt(el.tagName[1]),
        }));
      setHeadings(elements);
    };

    extractHeadings();

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: "-100px 0% -80% 0%" }
    );

    document.querySelectorAll("h2, h3").forEach((el) => observer.observe(el));

    // Handle initial hash
    if (window.location.hash) {
      setActiveId(window.location.hash.substring(1));
    }

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside className="fixed top-24 right-0 w-52 hidden xl:block px-4 py-8 overflow-y-auto">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
          ON THIS PAGE
        </p>
        <nav className="flex flex-col gap-2">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", `#${heading.id}`);
                setActiveId(heading.id);
              }}
              className={`text-sm transition-all duration-200 overflow-hidden text-ellipsis whitespace-nowrap ${
                activeId === heading.id
                  ? "text-orange-400 border-l-2 border-orange-400 pl-2"
                  : `text-gray-500 hover:text-gray-300 pl-2 ${heading.level === 3 ? "ml-3" : ""}`
              }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
