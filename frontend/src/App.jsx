import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./panne/HomePage";
import CreatePage from "./panne/CreatePage";
import NoteDetailPage from "./panne/NoteDetailPage";
import { toast } from "react-hot-toast";

export default function App() {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
}
