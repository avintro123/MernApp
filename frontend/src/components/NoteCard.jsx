import { PenSquareIcon, Trash2Icon, CalendarDays, FileText } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils.jsx";
import toast from "react-hot-toast";
import api from "../lib/axios.js";

export default function NoteCard({ note, setNotes }) {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent navigation when clicking delete

    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully.");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note. Please try again.");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group relative block h-full"
    >
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      <div className="relative h-full bg-base-100/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-primary/20 flex flex-col gap-4">
        
        {/* Decorative Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {note.title}
          </h3>
        </div>

        {/* Content */}
        <p className="text-base-content/70 line-clamp-3 leading-relaxed flex-grow">
          {note.content}
        </p>

        {note.pdf && (
          <a
            href={`http://localhost:5001/${note.pdf}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:underline mt-2 w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <FileText className="size-4" />
            View PDF
          </a>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-base-content/5">
          <div className="flex items-center gap-2 text-xs font-medium text-base-content/50 group-hover:text-base-content/70 transition-colors">
            <CalendarDays className="size-3.5" />
            {formatDate(new Date(note.createdAt))}
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            
            {/* Edit Indicator */}
            <Link
              to={`/note/edit/${note._id}`}
              className="p-2 rounded-lg hover:bg-base-content/5 text-base-content/60 hover:text-primary transition-colors z-10"
              onClick={(e) => e.stopPropagation()}
              title="Edit Note"
            >
               <PenSquareIcon className="size-4" />
            </Link>

            <button
              className="p-2 rounded-lg hover:bg-error/10 text-base-content/60 hover:text-error transition-colors z-10"
              onClick={(e) => handleDelete(e, note._id)}
              title="Delete Note"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
