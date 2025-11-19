import React from "react";
import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import HomePage from "./panne/HomePage";
import CreatePage from "./panne/CreatePage";
import NoteDetailPage from "./panne/NoteDetailPage";
import EditNotePage from "./panne/EditNotePage";
import { toast } from "react-hot-toast";
import background from "./assets/background.png";

export default function App() {
  const location = useLocation();
  return (
    <div className="relative h-full w-full">
      {/* 1. BACKGROUND: Changed z-10 to z-0 */}
      {/* 1. BACKGROUND: Changed z-10 to z-0 */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <img 
          src={background} 
          alt="Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Overlay for readability */}
      </div>

      {/* 2. CONTENT: Wrap Routes in a new div with relative and z-10 */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/note/:id" element={<NoteDetailPage />} />
            <Route path="/note/edit/:id" element={<EditNotePage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}
