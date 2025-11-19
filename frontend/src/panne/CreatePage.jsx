import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, Loader2, Save } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) {
        formData.append("pdf", file);
      }

      await api.post("/notes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please try again later.");
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen relative overflow-hidden bg-base-200"
    >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute top-1/2 -right-24 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-50" />
        </div>

      <div className="relative container mx-auto px-4 py-12 max-w-3xl">
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
            
          <div className="card-body p-6 md:p-8 gap-6">
            <div className="space-y-1">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-base-content to-base-content/60 bg-clip-text text-transparent">
                    Create New Note
                </h2>
                <p className="text-base-content/60">Capture your thoughts and ideas</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control space-y-2">
                <label className="label p-0">
                  <span className="label-text font-medium text-base-content/80">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter a catchy title..."
                  className="input input-lg bg-base-200/50 border-transparent focus:border-primary focus:bg-base-100 transition-all duration-300 placeholder:text-base-content/30"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="form-control space-y-2">
                <label className="label p-0">
                  <span className="label-text font-medium text-base-content/80">Content</span>
                </label>
                <textarea
                  placeholder="What's on your mind?"
                  className="textarea textarea-lg bg-base-200/50 border-transparent focus:border-primary focus:bg-base-100 transition-all duration-300 min-h-[200px] resize-none placeholder:text-base-content/30 leading-relaxed"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="form-control space-y-2">
                <label className="label p-0">
                  <span className="label-text font-medium text-base-content/80">Attach PDF (Optional)</span>
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  className="file-input file-input-bordered file-input-lg w-full bg-base-200/50 border-transparent focus:border-primary focus:bg-base-100 transition-all duration-300"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="card-actions justify-end pt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full sm:w-auto gap-3 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <Save className="size-5" />
                  )}
                  {loading ? "Saving..." : "Save Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
