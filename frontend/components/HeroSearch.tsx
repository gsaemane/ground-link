"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Home, MapPin, DollarSign, ChevronDown } from "lucide-react";

// Define the shape of our search params
interface SearchProps {
  initialValues?: {
    type?: string;
    location?: string;
    price?: string;
  };
}

export default function HeroSearch({ initialValues }: SearchProps) {
  const router = useRouter();

  // Initialize state with props or defaults
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
    <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Property Type */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Property Type</label>
          <div className="relative">
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg appearance-none font-semibold text-sm focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all"
            >
              <option>All Types</option>
              <option>House</option>
              <option>Land</option>
              <option>Apartment</option>
              <option>Commercial</option>
            </select>
            <Home className="absolute left-3.5 top-3.5 h-4 w-4 text-primary" />
            <ChevronDown className="absolute right-3.5 top-4 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Location</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Honiara..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-sm focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all"
            />
            <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Budget</label>
          <div className="relative">
            <select 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg appearance-none font-semibold text-sm focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all"
            >
              <option>Any Price</option>
              <option>Under 500k</option>
              <option>500k - 1M</option>
              <option>Over 1M</option>
            </select>
            <DollarSign className="absolute left-3.5 top-3.5 h-4 w-4 text-primary" />
            <ChevronDown className="absolute right-3.5 top-4 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-end">
          <Button 
            onClick={handleSearch}
            className="w-full h-12 text-sm font-bold uppercase tracking-widest rounded-lg bg-black hover:bg-primary text-white transition-all shadow-md active:scale-95"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}