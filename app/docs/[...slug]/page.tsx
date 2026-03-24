import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getDocBySlug, getPrevNext } from "@/lib/docs-utils";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { DocsTOC } from "@/components/docs/toc";

export default async function DocSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join("/");
  const doc = getDocBySlug(slug);

  if (!doc) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-2xl font-bold mb-4">Page not found</h1>
        <p className="text-gray-500">Please check back later.</p>
      </div>
    );
  }

  const { prev, next } = getPrevNext(slug);

  return (
    <div className="relative">
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-4xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => {
              const id = children?.toString().toLowerCase().replace(/\s+/g, "-") || "";
              return (
                <h2 id={id} className="text-2xl font-semibold text-white mt-10 mb-3 scroll-mt-24">
                  {children}
                </h2>
              );
            },
            h3: ({ children }) => {
              const id = children?.toString().toLowerCase().replace(/\s+/g, "-") || "";
              return (
                <h3 id={id} className="text-lg font-medium text-white mt-6 mb-2 scroll-mt-24">
                  {children}
                </h3>
              );
            },
            p: ({ children }) => (
              <div className="text-gray-300 leading-7 mb-4 text-base">
                {children}
              </div>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300 text-base">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="space-y-3 mb-6 mt-4">
                {React.Children.toArray(children)
                  .filter((child: any) => {
                    const content = child?.props?.children;
                    return content && (Array.isArray(content) ? content.some(c => c) : true);
                  })
                  .map((child, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 text-white flex items-center justify-center font-bold text-xs border border-white/10">
                        {index + 1}
                      </span>
                      <div className="text-gray-300 text-base">{child}</div>
                    </li>
                  ))}
              </ol>
            ),
            li: ({ children }) => <span>{children}</span>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-orange-400 bg-orange-400/5 px-6 py-4 my-6 rounded-r-lg italic text-gray-400 text-base">
                {children}
              </blockquote>
            ),
            code: ({ className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");
              if (!match) {
                return (
                  <code className="bg-gray-800 border border-gray-600 text-orange-300 px-1.5 py-0.5 rounded text-xs font-mono inline-flex" {...props}>
                    {children}
                  </code>
                );
              }
              return (
                <div className="my-6 rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/10 shadow-2xl">
                  {/* macOS dots */}
                  <div className="flex gap-1.5 px-4 py-3 bg-[#242424] border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-none flex items-center">
                      Terminal
                    </span>
                  </div>
                  <pre className="p-6 overflow-x-auto font-mono text-sm leading-relaxed text-emerald-400 selection:bg-emerald-400/20">
                    <code className={className} {...props}>{children}</code>
                  </pre>
                </div>
              );
            },
            strong: ({ children }) => <strong className="text-orange-400 font-bold">{children}</strong>,
            img: ({ src, alt }) => {
              if (typeof src !== "string") return null;
              if (!src.startsWith("http") && !src.startsWith("/")) return null;
              return (
                <div className="my-8 flex flex-col items-center">
                  <img src={src} alt={alt} className="rounded-lg shadow-lg max-w-[400px] w-full border border-white/10" />
                  {alt && <p className="mt-2 text-sm text-gray-500 text-center italic">{alt}</p>}
                </div>
              );
            },
            a: ({ href, children }) => {
              if (href?.startsWith("next:")) {
                const target = href.replace("next:", "/docs/");
                return (
                  <div className="mt-12 flex justify-end">
                    <Link 
                      href={target}
                      className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-orange-400 text-black font-bold hover:bg-orange-500 transition-all shadow-[0_4px_20px_-5px_rgba(251,146,60,0.4)] hover:shadow-[0_8px_25px_-5px_rgba(251,146,60,0.5)] transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {children} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                );
              }
              return (
                <a href={href} className="text-orange-400 hover:text-orange-300 underline underline-offset-4 transition-colors">
                  {children}
                </a>
              );
            }
          }}
        >
          {doc.content}
        </ReactMarkdown>
      </div>

      {/* Footer Info */}
      <footer className="mt-12 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Heart size={14} className="text-orange-400 fill-orange-400" />
          <span>Compiled by: <span className="text-gray-300 font-medium">{doc.author}</span></span>
        </div>
        <div>
          Last updated: <span className="text-gray-300 font-medium">{doc.lastUpdated}</span>
        </div>
      </footer>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        {prev ? (
          <Link 
            href={`/docs/${prev.slug}`}
            className="group flex flex-col items-start gap-4 p-8 rounded-2xl border border-white/5 bg-[#ffffff]/[0.02] hover:bg-orange-400/[0.04] hover:border-orange-400/30 transition-all duration-300 text-left"
          >
            <span className="flex items-center gap-2 text-orange-400 font-bold uppercase tracking-widest text-[10px]">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Previous
            </span>
            <span className="text-xl font-bold text-gray-200 group-hover:text-white transition-colors">{prev.title}</span>
          </Link>
        ) : <div />}
        
        {next ? (
          <Link 
            href={`/docs/${next.slug}`}
            className="group flex flex-col items-end gap-4 p-8 rounded-2xl border border-white/5 bg-[#ffffff]/[0.02] hover:bg-orange-400/[0.04] hover:border-orange-400/30 transition-all duration-300 text-right"
          >
            <span className="flex items-center gap-2 text-gray-500 group-hover:text-orange-400 transition-colors font-bold uppercase tracking-widest text-[10px]">
              Next <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-xl font-bold text-gray-200 group-hover:text-white transition-colors">{next.title}</span>
          </Link>
        ) : <div />}
      </div>

      {/* Right TOC Rendering */}
      <DocsTOC />
    </div>
  );
}

// Re-importing missing icons locally for this component
const Rocket = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"/><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"/></svg>;
const Users = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
