import React, { useEffect, useState } from "react";
import { ArrowLeftIcon, Loader2, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";

export default function EditNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load note");
        navigate("/");
      } finally {
        setFetching(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await api.put(`/notes/${id}`, { title, content });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error updating note", error);
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please try again later.");
      } else {
        toast.error("Failed to update note");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-base-200">
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
                    Edit Note
                </h2>
                <p className="text-base-content/60">Update your thoughts and ideas</p>
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
                  {loading ? "Saving..." : "Update Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
