"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Youtube, Instagram, Linkedin, Github, Twitter, Moon, Rocket, ExternalLink, Heart, X, ShieldCheck, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "7154") {
      router.push("/tracker");
    } else {
      setError("Incorrect password. Access denied.");
      setPassword("");
    }
  };
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Subtle glowing orbs behind text and glass */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-orange-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#050505]/70 border-b border-white/5">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 font-semibold">
          <div className="flex items-center gap-2">
            {/* Logo icon (small glass) */}
            <div className="w-8 h-8 relative shrink-0">
              <Image
                src="/logo.png"
                alt="ORANGE Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-xl tracking-wide">ORANGE</span>
          </div>

          <nav className="flex items-center gap-5 text-gray-400">
            <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
            <div className="w-[1px] h-6 bg-gray-700 mx-1"></div>
            <button className="hover:text-white transition-colors"><Moon size={20} fill="currentColor" /></button>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 mt-16 lg:mt-32">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">

          {/* Left Hero Content */}
          <div className="flex flex-col items-start">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-white mb-6">
              Docs You'll<br />Actually Read
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              Next-gen docs that builds reading habits into your workflow.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link href="/docs">
                <button className="flex items-center gap-2 bg-[#FF8D29] hover:bg-[#ff9d47] transition-colors text-black font-semibold px-8 py-3.5 rounded-full text-lg">
                  Start Learning
                  <Rocket size={18} />
                </button>
              </Link>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 text-gray-300 hover:text-white text-lg font-medium transition-colors group"
              >
                Daily Trackers
                <ExternalLink size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* Right Hero Graphic */}
          <div className="relative flex justify-center lg:justify-end pr-12">
            <div className="relative w-80 h-80 transform -rotate-6 hover:rotate-0 transition-transform duration-700 ease-out flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="ORANGE Graphic"
                width={320}
                height={320}
                priority
                className="object-contain drop-shadow-[0_0_80px_rgba(255,141,41,0.3)]"
              />
            </div>
          </div>
        </div>

        {/* Pre-Footer CTA */}
        <div className="mt-40 mb-20 flex flex-col items-center">
          <p className="text-xl text-gray-200 mb-8 tracking-wide">Have a question or want to get involved..?</p>

          <button className="relative group p-[2px] rounded-full mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity blur-sm"></div>
            <div className="relative bg-[#050505] rounded-full border border-gray-700/50 px-8 py-3 flex flex-col items-center gap-1 group-hover:border-transparent transition-colors">
              <div className="flex gap-1 items-center text-white mb-1">
                <Heart size={14} fill="currentColor" />
                <span className="font-bold text-sm mx-1">‿</span>
                <Heart size={14} fill="currentColor" />
              </div>
              <span className="font-semibold text-lg text-white group-hover:text-purple-300 transition-colors">Join our Discord</span>
            </div>
          </button>

          {/* Footer Logo Section */}
          <div className="flex flex-col items-center text-center max-w-xl mx-auto border-t border-gray-800 pt-16 mt-8">
            <span className="text-gray-500 text-sm mb-4">Brought to you by</span>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 relative shrink-0">
                <Image
                  src="/logo.png"
                  alt="XORAXI Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-4xl font-bold text-white tracking-tight">XORAXI</span>
            </div>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              XORAXI is an unique initiative by Narayan Verma where he mentors people who want to learn programming and grow in the field.
            </p>
            <a href="#" className="text-[#FF8D29] hover:underline font-medium text-lg">
              Learn about XORAXI
            </a>
          </div>
        </div>
      </main>

      {/* Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-md p-8 rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-400/10 flex items-center justify-center text-orange-400 mb-6">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Restricted Access</h2>
              <p className="text-gray-400 text-sm mb-8">Enter your 4-digit security code to access the Daily Tracker missions.</p>

              <form onSubmit={handlePasswordSubmit} className="w-full space-y-4">
                <div className="relative">
                  <input 
                    type="password"
                    maxLength={4}
                    value={password}
                    autoFocus
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter 4-digit Pin"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-2xl font-black tracking-[0.5em] focus:outline-none focus:border-orange-400/50 transition-colors uppercase placeholder:text-gray-700 placeholder:text-sm placeholder:tracking-normal"
                  />
                  {error && (
                    <p className="absolute -bottom-6 left-0 right-0 text-red-500 text-[10px] font-bold uppercase tracking-wider animate-bounce">
                      {error}
                    </p>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-orange-400 hover:bg-orange-500 text-black font-bold py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={18} />
                  Authorize Access
                </button>
              </form>
            </div>

            {/* Subtle glow */}
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-400/20 blur-[60px] rounded-full pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
}
