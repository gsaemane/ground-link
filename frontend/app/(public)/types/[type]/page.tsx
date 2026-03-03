// src/app/(public)/types/[type]/page.tsx (Updated Snippet)

import { fetchProperties } from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import HeroSearch from '@/components/HeroSearch';
import { notFound } from 'next/navigation';

const VALID_TYPES = ['house', 'land', 'apartment', 'commercial'];

export default async function PropertyTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const decodedType = decodeURIComponent(type).toLowerCase();

  if (!VALID_TYPES.includes(decodedType)) {
    return notFound();
  }

  const allProperties = await fetchProperties();
  const filteredProperties = allProperties.filter(
    (p) => p.type.toLowerCase() === decodedType
  );

  // Custom metadata AND relevant background images based on property type
  const typeMeta: Record<string, { title: string; desc: string; image: string }> = {
    house: { 
      title: "Executive Homes", 
      desc: "Discover premium residences and family homes in Honiara's most sought-after ridges.",
      image: "https://images.unsplash.com/photo-1664780476492-fbb9fd277ce8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    land: { 
      title: "Registered Land", 
      desc: "Investment-ready plots and beachfront acreage with verified titles across the provinces.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop"
    },
    apartment: { 
      title: "Urban Living", 
      desc: "Modern apartments and multi-family units perfect for professionals and ex-pats.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop"
    },
    commercial: { 
      title: "Business Spaces", 
      desc: "Strategic office spaces, retail hubs, and industrial lots for your next venture.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
    }
  };

  const meta = typeMeta[decodedType];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* 1. Header Section with Image and Industrial Fade Overlay */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-black ">
        {/* The Background Image (Greyscale for maximum high-end feel) */}
        <div className="absolute inset-0 z-0">
          <img 
            src={meta.image}
            alt={`${meta.title} background`}
            className="w-full h-full object-cover grayscale opacity-90 brightness-75"
          />
        </div>

        {/* The "Industrial Fade" Gradient Overlay: Black to Background (White) */}
        <div className="absolute inset-0 z-10 bg-linear-to-b from-black via-black/80 to-background opacity-70" />
        
        <div className="container mx-auto max-w-7xl px-6 relative z-20 text-center">
          <Badge className="bg-primary text-white rounded-md px-3 py-1 mb-6 border-none uppercase text-[10px] tracking-widest animate-in fade-in slide-in-from-top-4 duration-1000">
            {meta.title}
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white uppercase italic drop-shadow-2xl">
            Prime <span className="text-primary">{decodedType}</span><span className="text-white">.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
            {meta.desc}
          </p>
        </div>
      </section>

      {/* 2. Filter Bar (The "Bridge" between Dark and Light) */}
      <section className="relative z-30 -mt-12 container mx-auto px-6 max-w-7xl">
         <HeroSearch 
           initialValues={{ type: decodedType.charAt(0).toUpperCase() + decodedType.slice(1) }} 
         /> 
      </section>

      <main className="container mx-auto max-w-7xl px-6 py-16 relative z-20">
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Showing <span className="text-black">{filteredProperties.length}</span> luxury listings
          </p>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border-2 border-slate-100 rounded-lg bg-slate-50">
            <h3 className="text-xl font-black uppercase italic">No current listings in this category</h3>
            <p className="text-slate-500 mt-2">Contact our team to be notified of new opportunities in Honiara and beyond.</p>
          </div>
        )}
      </main>
    </div>
  );
}