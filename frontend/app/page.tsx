import { fetchProperties, Property } from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Building, LandPlot, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import HeroSearch from '@/components/HeroSearch';

export default async function LandingPage() {
  let properties: Property[] = [];
  try {
    properties = await fetchProperties();
  } catch (error) {
    console.error('Failed to load properties:', error);
  }

  const featured = properties.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-primary/20">
      <Header />
      
      {/* Hero Section – Immersive Airbnb Style */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/60 z-10 mix-blend-multiply" />
          <img
            src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Beautiful coastal home"
            className="w-full h-full object-cover scale-105 animate-in fade-in zoom-in duration-1000"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-6 w-full max-w-5xl mt-16 lg:mt-24">
          <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md mb-8 py-2 px-6 text-sm font-semibold uppercase tracking-widest">
            Welcome to the Solomon Islands
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-6 drop-shadow-2xl">
            Find your next <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/70">perfect place.</span>
          </h1>

          <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-16 font-medium drop-shadow-lg">
            Discover premium properties, exclusive lands, and beautiful homes in paradise.
          </p>

          <div className="w-full max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
             <HeroSearch />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white relative z-30">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-lg text-slate-500 font-medium">
                Handpicked selections of the finest real estate available right now.
              </p>
            </div>
            <Link href="/properties">
              <Button variant="ghost" className="group font-bold text-slate-900 hover:bg-slate-100 rounded-full px-6 py-6 text-base">
                Explore all <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {featured.map((prop) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
              <p className="text-xl font-medium text-slate-500">Loading featured properties...</p>
            </div>
          )}
        </div>
      </section>

      {/* Property Types Explorer */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              Browse by Category
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Whether you are looking for a beachfront villa, a commercial space, or a plot of land to build your dream home, we have it all.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {['House', 'Land', 'Apartment', 'Commercial'].map((type) => (
              <Link
                href={`/types/${type.toLowerCase()}`}
                key={type}
                className="group relative flex flex-col items-center justify-center p-10 bg-white rounded-[2.5rem] shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden ring-1 ring-slate-100"
              >
                {/* Hover Reveal Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 mb-6 w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all duration-500 group-hover:scale-110">
                  {type === 'House' && <Home className="h-8 w-8 text-slate-700 group-hover:text-primary transition-colors" />}
                  {type === 'Land' && <LandPlot className="h-8 w-8 text-slate-700 group-hover:text-primary transition-colors" />}
                  {type === 'Apartment' && <Building className="h-8 w-8 text-slate-700 group-hover:text-primary transition-colors" />}
                  {type === 'Commercial' && <MapPin className="h-8 w-8 text-slate-700 group-hover:text-primary transition-colors" />}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{type}</h3>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">
                  Explore
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-white py-12 px-6 border-t border-slate-100">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center gap-2 mb-6 opacity-30">
             <MapPin className="w-6 h-6" />
          </div>
          <p className="text-lg font-bold text-slate-900 tracking-tight mb-2">Ground Link</p>
          <p className="text-sm font-medium text-slate-500">
            © {new Date().getFullYear()} Ground Link. All rights reserved. • Honiara, Solomon Islands
          </p>
        </div>
      </footer>
    </div>
  );
}