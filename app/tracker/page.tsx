"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, Clock, Calendar, Rocket, BookOpen, GraduationCap, ChevronRight, AlertCircle, X } from "lucide-react";
import { DocsNavbar } from "@/components/docs/navbar";
import { DayPlan, Task } from "@/lib/tracker-utils";

// We use Task and DayPlan from lib/tracker-utils

interface TrackerData {
  day: number;
  date: string;
  tasks: Task[];
  backlog: Task[];
}

export default function TrackerPage() {
  const [data, setData] = useState<TrackerData | null>(null);
  const [roadmap, setRoadmap] = useState<DayPlan[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
    fetchRoadmap();
    const timer = setInterval(updateTimeLeft, 60000);
    updateTimeLeft();
    return () => clearInterval(timer);
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tracker");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const fetchRoadmap = async () => {
    try {
      const res = await fetch("/api/tracker/roadmap");
      const json = await res.json();
      setRoadmap(json);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch roadmap", err);
    }
  };

  const toggleTaskStatus = async (taskId: string, currentStatus: boolean) => {
    // Optimistic update
    if (data) {
      const updatedTasks = data.tasks.map(t => t.id === taskId ? { ...t, completed: !currentStatus } : t);
      const updatedBacklog = data.backlog.map(t => t.id === taskId ? { ...t, completed: !currentStatus } : t);
      setData({ ...data, tasks: updatedTasks, backlog: updatedBacklog });
    }

    try {
      const res = await fetch("/api/tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, completed: !currentStatus }),
      });
      
      if (!res.ok) throw new Error("Failed to update");
      // Re-fetch to ensure sync with server (backlog might change etc.)
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task", err);
      // Revert on error
      fetchTasks();
    }
  };

  const updateTimeLeft = () => {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Study window: 5 PM (17) to 11 PM (23)
    if (currentHour < 17) {
      setTimeLeft("Study starts at 5:00 PM");
    } else if (currentHour >= 23) {
      setTimeLeft("Study window closed for today");
    } else {
      const end = new Date();
      end.setHours(23, 0, 0, 0);
      const diff = end.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${mins}m left in your session`);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-orange-400">Loading your mission...</div>;

  const progress = data ? (data.day / 120) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white selection:bg-orange-400/30">
      <DocsNavbar />
      
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Day Progress */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-orange-500/10 to-transparent border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Rocket size={120} />
            </div>
            <div className="relative z-10">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400 mb-2">Current Mission</h2>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-6xl font-black">Day {data?.day}</span>
                <span className="text-gray-500 font-medium text-xl">/ 120</span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-1000" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
              <p className="text-gray-400 text-sm">You are <span className="text-white font-bold">{Math.round(progress)}%</span> through your 4-month mastery plan.</p>
            </div>
          </div>

          {/* Time & Date */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <Calendar size={18} />
                <span className="text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
              <h3 className="text-xl font-bold mb-1">Focus Window</h3>
              <p className="text-orange-400 font-mono text-sm font-semibold">{timeLeft}</p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-400/10 flex items-center justify-center text-orange-400">
                <Clock size={20} />
              </div>
              <div className="text-xs">
                <p className="text-gray-500 uppercase tracking-widest font-bold">Daily Window</p>
                <p className="text-gray-300">5:00 PM — 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Backlog Alert */}
        {data?.backlog && data.backlog.length > 0 && (
          <div className="mb-10 p-5 rounded-2xl bg-red-500/5 border border-red-500/20 flex items-center gap-4 animate-pulse">
            <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
            <div>
              <p className="text-red-400 font-bold text-sm">Action Required: Backlog Detected</p>
              <p className="text-gray-500 text-xs">You have {data.backlog.length} unfinished tasks from previous days. They've been rolled over to today.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Task List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                Today's Objectives
                <span className="px-2 py-0.5 rounded text-[10px] bg-orange-400 text-black font-black uppercase">Active</span>
              </h2>
            </div>
            
            <div className="space-y-4">
              {data?.tasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={() => toggleTaskStatus(task.id, task.completed)} />
              ))}
              
              {data?.backlog.map((task) => (
                <TaskItem key={task.id} task={task} isBacklog onToggle={() => toggleTaskStatus(task.id, task.completed)} />
              ))}
            </div>
          </div>

          {/* Sidebar / Categories */}
          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">Subject focus</h4>
              <div className="space-y-3">
                <CategoryCard 
                  icon={<Rocket size={16} />} 
                  title="LLM & AI" 
                  count={34} 
                  onClick={() => setSelectedCategory("LLM")}
                />
                <CategoryCard 
                  icon={<BookOpen size={16} />} 
                  title="DSA Mastery" 
                  count={32} 
                  onClick={() => setSelectedCategory("DSA")}
                />
                <CategoryCard 
                  icon={<GraduationCap size={16} />} 
                  title="College" 
                  count={120} 
                  onClick={() => setSelectedCategory("College")}
                />
                <CategoryCard 
                  icon={<Clock size={16} />} 
                  title="Aptitude" 
                  count={18} 
                  onClick={() => setSelectedCategory("Aptitude")}
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-orange-400 text-black">
              <h4 className="font-bold mb-2">Daily Tip</h4>
              <p className="text-sm leading-relaxed opacity-90">Progressing consistently for 1% every day is better than studying 10 hours once a week. Stay focused during your 5-11 PM window!</p>
            </div>
          </div>
        </div>
      </main>

      {/* Subject Roadmap Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedCategory(null)} />
          <div className="relative w-full max-w-2xl max-h-[80vh] bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-orange-400/10 to-transparent">
              <div>
                <h2 className="text-2xl font-bold mb-1">{selectedCategory === 'LLM' ? 'LLM & AI Roadmap' : selectedCategory === 'DSA' ? 'DSA Mastery Roadmap' : selectedCategory}</h2>
                <p className="text-gray-400 text-sm italic">Showing topics by day number</p>
              </div>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto p-8 space-y-4">
              {roadmap?.map(day => {
                const categoryTopic = day.tasks.find((t: Task) => t.category === selectedCategory);
                if (!categoryTopic) return null;
                
                return (
                  <div key={day.day} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-20 py-1 flex flex-col items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 group-hover:text-orange-400 transition-colors">Day</span>
                      <span className="text-2xl font-black text-white/20 group-hover:text-white transition-colors leading-none">{day.day}</span>
                    </div>
                    <div className="flex-grow pb-6 border-b border-white/5 group-last:border-0 pt-1">
                      <p className="text-gray-200 font-medium group-hover:text-orange-400 transition-colors">{categoryTopic.text.replace(`${selectedCategory}: `, '')}</p>
                      <span className="text-[10px] text-gray-500 font-mono italic">{categoryTopic.time}</span>
                    </div>
                  </div>
                );
              }).filter(Boolean)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskItem({ task, onToggle, isBacklog = false }: { task: Task, onToggle: () => void, isBacklog?: boolean }) {
  return (
    <button 
      onClick={onToggle}
      className={`w-full text-left group flex items-center gap-4 p-5 rounded-2xl border transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-400/50 ${
        task.completed 
        ? "bg-white/[0.01] border-white/5 opacity-50 cursor-default" 
        : isBacklog 
          ? "bg-red-500/[0.02] border-red-500/10 hover:border-red-500/30 cursor-pointer"
          : "bg-white/[0.03] border-white/5 hover:bg-white/[0.05] hover:border-orange-400/30 cursor-pointer"
      }`}
    >
      <div className={`flex-shrink-0 transition-colors ${task.completed ? "text-orange-400" : "text-gray-600 group-hover:text-orange-400"}`}>
        {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${
            task.category === 'LLM' ? 'bg-blue-500/10 text-blue-400' :
            task.category === 'DSA' ? 'bg-emerald-500/10 text-emerald-400' :
            task.category === 'Aptitude' ? 'bg-purple-500/10 text-purple-400' :
            'bg-gray-500/10 text-gray-400'
          }`}>
            {task.category}
          </span>
          <span className="text-[10px] text-gray-600 font-mono">{task.time}</span>
        </div>
        <p className={`font-medium transition-all ${task.completed ? "line-through text-gray-600" : "text-gray-200"}`}>
          {task.text}
        </p>
      </div>
      <ChevronRight size={18} className="text-gray-800 group-hover:text-orange-400 transition-colors shrink-0" />
    </button>
  );
}

function CategoryCard({ icon, title, count, onClick }: { icon: React.ReactNode, title: string, count: number, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full text-left flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-orange-400/30 transition-all group flex-shrink-0 active:scale-[0.98] outline-none"
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-500 group-hover:text-orange-400 transition-colors">{icon}</div>
        <span className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-gray-600 font-bold group-hover:text-gray-400 transition-colors">{count} topics</span>
        <ChevronRight size={14} className="text-gray-800 group-hover:text-orange-400 transition-colors" />
      </div>
    </button>
  );
}
