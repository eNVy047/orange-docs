import React from "react";
import { DocsNavbar } from "@/components/docs/navbar";
import { DocsSidebar } from "@/components/docs/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-gray-200 selection:bg-orange-400/30 selection:text-orange-400">
      <DocsNavbar />
      
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar (Desktop) / Mobile Drawer (managed inside component) */}
          <DocsSidebar />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 py-24 md:py-32">
            <div className="max-w-3xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
