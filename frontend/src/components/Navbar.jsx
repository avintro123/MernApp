import React from "react";
import { Link } from "react-router";
import { PlusIcon, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-base-100/70 border-b border-white/10 shadow-lg shadow-black/5">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
              <Sparkles className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-tight group-hover:opacity-80 transition-opacity duration-300">
              ThinkBoard
            </h1>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-4">
            <Link 
              to={"/create"} 
              className="btn btn-primary btn-sm md:btn-md gap-2 shadow-[0_0_15px_rgba(0,255,157,0.3)] hover:shadow-[0_0_25px_rgba(0,255,157,0.5)] hover:scale-105 transition-all duration-300 border-none"
            >
              <PlusIcon className="size-5" />
              <span className="hidden md:inline font-semibold">New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
