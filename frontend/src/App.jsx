import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./panne/HomePage";
import CreatePage from "./panne/CreatePage";
import NoteDetailPage from "./panne/NoteDetailPage";
import { toast } from "react-hot-toast";

export default function App() {
  return (
    <div className="relative h-full w-full">
      {/* 1. BACKGROUND: Changed z-10 to z-0 */}
      <div className="absolute inset-0 z-0 h-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)" />

      {/* 2. CONTENT: Wrap Routes in a new div with relative and z-10 */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Routes>
      </div>
    </div>
  );
}
