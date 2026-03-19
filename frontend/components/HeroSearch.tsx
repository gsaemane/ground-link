"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Home, MapPin, DollarSign, ChevronDown } from "lucide-react";

interface SearchProps {
  initialValues?: {
    type?: string;
    location?: string;
    price?: string;
  };
}

export default function HeroSearch({ initialValues }: SearchProps) {
  const router = useRouter();

  const [type, setType] = useState(initialValues?.type || "All Types");
  const [location, setLocation] = useState(initialValues?.location || "");
  const [price, setPrice] = useState(initialValues?.price || "Any Price");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (type !== "All Types") params.set("type", type);
    if (location) params.set("location", location);
    if (price !== "Any Price") params.set("price", price);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-2 md:p-3 border border-white/40 max-w-5xl mx-auto ring-1 ring-black/5 text-left relative">
      <div className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-slate-200/60 pb-2 md:pb-0">
        
        {/* Location */}
        <div className="flex-1 w-full px-4 py-3 md:p-4 hover:bg-slate-50/50 rounded-t-[1.5rem] md:rounded-l-[2rem] md:rounded-tr-none transition-colors group cursor-pointer">
          <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-800 ml-1 mb-0.5 md:mb-1 block">Where</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search destinations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-0 pl-1 text-base md:text-lg truncate appearance-none"
            />
          </div>
        </div>

        {/* Property Type */}
        <div className="flex-1 w-full px-4 py-3 md:p-4 hover:bg-slate-50/50 transition-colors group cursor-pointer">
          <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-800 ml-1 mb-0.5 md:mb-1 block">Type</label>
          <div className="relative">
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-transparent font-medium text-slate-700 appearance-none focus:outline-none focus:ring-0 pl-1 text-base md:text-lg cursor-pointer truncate"
            >
              <option>All Types</option>
              <option>House</option>
              <option>Land</option>
              <option>Apartment</option>
              <option>Commercial</option>
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div className="flex-1 w-full px-4 py-3 md:p-4 hover:bg-slate-50/50 transition-colors group cursor-pointer md:pr-24 lg:pr-32">
          <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-800 ml-1 mb-0.5 md:mb-1 block">Budget</label>
          <div className="relative">
            <select 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-transparent font-medium text-slate-700 appearance-none focus:outline-none focus:ring-0 pl-1 text-base md:text-lg cursor-pointer truncate"
            >
              <option>Any Price</option>
              <option>Under 500k</option>
              <option>500k - 1M</option>
              <option>Over 1M</option>
            </select>
          </div>
        </div>
        
        {/* Mobile Full-width Button / Desktop Absolute Button */}
        <div className="w-full px-3 md:px-0 md:w-auto mt-2 md:mt-0 md:absolute md:right-3 md:top-1/2 md:-translate-y-1/2">
           <Button 
              onClick={handleSearch}
              className="w-full h-12 md:w-14 md:h-14 rounded-[1.2rem] md:rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30 transition-transform active:scale-95 flex items-center justify-center gap-2 md:p-0"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6 stroke-[3]" />
              <span className="md:hidden font-bold text-base">Search Properties</span>
            </Button>
        </div>

      </div>
    </div>
  );
}