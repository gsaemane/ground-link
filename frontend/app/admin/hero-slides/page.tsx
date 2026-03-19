"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchHeroSlides, createHeroSlide, deleteHeroSlide, updateHeroSlide } from "@/lib/api";
import { HeroSlideData } from "@/components/HeroSlider";
import { Trash2, Plus, Image as ImageIcon, Loader2 } from "lucide-react";

export default function HeroSlidesAdmin() {
  const [slides, setSlides] = useState<HeroSlideData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    try {
      setLoading(true);
      const data = await fetchHeroSlides();
      setSlides(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image file first.");

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("isActive", "true");

      await createHeroSlide(formData);
      
      // Reset form
      setFile(null);
      setTitle("");
      setSubtitle("");
      
      // Reload slides
      await loadSlides();
    } catch (error) {
      console.error(error);
      alert("Failed to upload slide.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;
    try {
      await deleteHeroSlide(id);
      setSlides(slides.filter((s) => s._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete slide.");
    }
  };

  const handleToggleActive = async (slide: HeroSlideData) => {
    try {
      const formData = new FormData();
      formData.append("isActive", String(!slide.isActive));
      const updated = await updateHeroSlide(slide._id, formData);
      setSlides(slides.map(s => s._id === slide._id ? updated : s));
    } catch (error) {
      console.error(error);
      alert("Failed to toggle visibility.");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Hero Slides</h1>
          <p className="text-slate-500 mt-2">Upload and arrange the hero images shown on the public landing page.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Upload Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-100 sticky top-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> Add New Slide
            </h2>
            
            <form onSubmit={handleCreate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Image File *</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    required 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  {file ? (
                    <div className="text-sm font-medium text-slate-700 truncate">{file.name}</div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <ImageIcon className="w-8 h-8" />
                      <span className="text-sm font-medium">Click or drag image to upload</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Headline Tag (Optional)</label>
                <Input 
                  placeholder="e.g. Welcome to Solomon Islands" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="rounded-xl h-12 bg-slate-50 border-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Main Text (Optional)</label>
                <Input 
                  placeholder="e.g. Find your perfect place." 
                  value={subtitle} 
                  onChange={(e) => setSubtitle(e.target.value)} 
                  className="rounded-xl h-12 bg-slate-50 border-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isUploading || !file} 
                className="w-full h-14 rounded-xl font-bold text-lg"
              >
                {isUploading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Uploading...</>
                ) : (
                  "Upload Slide"
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Existing Slides */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-slate-400 gap-3">
              <Loader2 className="w-6 h-6 animate-spin" /> Fetching slides...
            </div>
          ) : slides.length === 0 ? (
            <div className="border border-dashed border-slate-200 rounded-3xl p-16 text-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900 mb-2">No active slides</h3>
              <p className="text-slate-500">Your homepage is currently using the static fallback image.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {slides.map((slide) => (
                <div key={slide._id} className="bg-white rounded-3xl p-4 shadow-xs border border-slate-100 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                    <img src={slide.imageUrl} alt={slide.title || "Slide image"} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 w-full space-y-2">
                    {slide.title && <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-md">{slide.title}</span>}
                    <h3 className="text-xl font-black text-slate-900">{slide.subtitle || "No Subtitle"}</h3>
                    <p className="text-sm font-medium text-slate-500 break-all">URL: {slide.imageUrl.split('/').pop()}</p>
                  </div>
                  
                  <div className="flex sm:flex-col gap-3 shrink-0">
                    <Button 
                      variant={slide.isActive ? "default" : "outline"} 
                      onClick={() => handleToggleActive(slide)}
                      className="rounded-xl w-32"
                    >
                      {slide.isActive ? "Visible" : "Hidden"}
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDelete(slide._id)}
                      className="rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 w-32"
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
