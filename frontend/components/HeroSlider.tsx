"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

export interface HeroSlideData {
  _id: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  order: number;
  isActive: boolean;
}

interface HeroSliderProps {
  slides: HeroSlideData[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    if (!slides || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides]);

  if (!slides || slides.length === 0) {
    // Fallback if no slides exist in DB
    return (
      <div className="absolute inset-0 z-0 bg-slate-900 border-none">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Real Estate Portfolio background"
          className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/50 to-background" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 bg-slate-950 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          {/* Zoom effect on the active image */}
          <div className="w-full h-full overflow-hidden">
            <img
              src={slide.imageUrl}
              alt={slide.title || "Hero background"}
              className={`w-full h-full object-cover grayscale mix-blend-multiply transition-transform duration-[10000ms] ease-linear ${index === currentIndex ? 'scale-110' : 'scale-100'
                }`}
            />
          </div>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/40 to-background/90 z-20" />



        </div>
      ))}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-40 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${index === currentIndex ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/60"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
