import React, { useEffect, useState } from "react";
import { ArrowLeftIcon, CalendarDays, Loader2, PenSquareIcon } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router";
import api from "../lib/axios";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";

export default function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load note");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-base-200">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative container mx-auto px-4 py-12 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors mb-8 group"
        >
          <div className="p-2 rounded-full bg-base-300/50 group-hover:bg-primary/10 transition-colors">
            <ArrowLeftIcon className="size-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="font-medium">Back to Notes</span>
        </Link>

        <div className="card bg-base-100/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
          {/* Decorative top bar */}
          <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

          <div className="card-body p-6 md:p-10 gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-base-content/10 pb-6">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-base-content">
                  {note.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-base-content/60">
                  <CalendarDays className="size-4" />
                  <span>Created on {formatDate(new Date(note.createdAt))}</span>
                </div>
              </div>
              
              <Link
                to={`/note/edit/${note._id}`}
                className="btn btn-primary btn-sm md:btn-md gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
              >
                <PenSquareIcon className="size-4" />
                Edit Note
              </Link>
            </div>

            <div className="prose prose-lg max-w-none text-base-content/80 leading-relaxed whitespace-pre-wrap">
              {note.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
