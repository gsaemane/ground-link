import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ShieldCheck, MapPin, Quote, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function AboutPage() {
  const trustBadges = [
    { 
      label: 'Local Experts', 
      value: 'On The Ground', 
      desc: 'Based right here in Honiara, with an extensive network across the archipelago.',
      icon: MapPin
    },
    { 
      label: 'Transparency', 
      value: 'Safe Investments', 
      desc: 'Navigating customary land laws to ensure your investment is protected.',
      icon: ShieldCheck
    },
    { 
      label: 'Quality Focus', 
      value: 'Vetted Listings', 
      desc: 'Every property on our platform is personally verified by our team.',
      icon: CheckCircle2
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-primary/20">
      <Navbar />

      {/* 1. Immersive Editorial Hero */}
      <section className="relative pt-32 pb-40 lg:pt-56 lg:pb-32 overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-16">
             <div className="max-w-4xl">
               <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 leading-[0.85] tracking-tighter mix-blend-multiply">
                 Reimagining <br />
                 <span className="text-slate-300">Real Estate.</span>
               </h1>
             </div>
             <div className="max-w-sm pb-2">
                 <p className="text-xl text-slate-500 font-medium leading-relaxed">
                   Ground Link combines deep customary knowledge with modern technology to elevate the Solomon Islands property market.
                 </p>
             </div>
          </div>

          <div className="w-full h-[60vh] md:h-[70vh] rounded-[3rem] overflow-hidden shadow-2xl relative group">
             <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
             <img 
              src="https://images.unsplash.com/photo-1544971587-b842c27f8e14?q=80&w=2069&auto=format&fit=crop" 
              alt="Honiara Coastline" 
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
            />
          </div>
        </div>
      </section>

      {/* 2. Three Pillars (Editorial Grid) */}
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustBadges.map((stat, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 cursor-default">
                <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-sm flex items-center justify-center text-primary mb-8">
                  <stat.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4">{stat.value}</h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">{stat.label}</p>
                <p className="text-base text-slate-600 font-medium leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Our Story Section (Masonry Image Layout) */}
      <section className="py-32 bg-slate-950 text-white overflow-hidden rounded-[3rem] mx-4 md:mx-6 lg:mx-8 shadow-2xl relative">
        <div className="absolute top-0 right-0 -m-32 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            <div className="lg:col-span-5 space-y-10">
              <div>
                <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Our Origin</span>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95]">
                  Built for the <br/><span className="text-slate-400">Hapi Isles.</span>
                </h2>
              </div>
              <p className="text-xl text-slate-400 font-light leading-relaxed">
                Ground Link started with a simple observation: finding verified land and quality homes in our own country shouldn&apos;t be a challenge. We saw a gap between modern expectations and the local market reality.
              </p>
              <p className="text-xl text-slate-400 font-light leading-relaxed">
                We aren&apos;t a remote corporation; we are a dedicated local team fixing the market from the ground up, providing a seamless digital experience that honors customary traditions.
              </p>
            </div>

            <div className="lg:col-span-7">
               <div className="grid grid-cols-2 gap-6 items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                    alt="Modern Villa" 
                    className="rounded-[2.5rem] object-cover h-[40vh] w-full"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" 
                    alt="Interior Architecture" 
                    className="rounded-[2.5rem] object-cover h-[50vh] w-full -translate-y-12"
                  />
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Minimal Founder's Statement */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
            <Quote className="h-16 w-16 text-slate-200 mx-auto mb-10" />
            <p className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-12">
              &quot;In the Solomon Islands, property is more than just an asset—it&apos;s our legacy. Ground Link ensures every family has an honest and transparent path to owning their piece of paradise.&quot;
            </p>
            <div className="flex items-center justify-center gap-6">
               <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                    alt="Founder" 
                    className="w-full h-full object-cover grayscale"
                  />
               </div>
               <div className="text-left">
                  <p className="text-lg font-black text-slate-900">The Founder</p>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Ground Link Dev Team</p>
               </div>
            </div>
        </div>
      </section>

      {/* 5. Minimal CTA */}
      <section className="py-32 container mx-auto px-6 max-w-5xl">
         <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-16 md:p-24 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-8">Ready to begin?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full h-16 px-10 text-lg font-bold shadow-xl">
                <Link href="/properties">Explore Listings <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-16 px-10 text-lg font-bold bg-white">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
         </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-white py-12 px-6 border-t border-slate-100 mt-auto">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-lg font-bold text-slate-900 tracking-tight mb-2">Ground Link</p>
          <p className="text-sm font-medium text-slate-500">
            © {new Date().getFullYear()} Ground Link. All rights reserved. • Honiara, Solomon Islands
          </p>
        </div>
      </footer>
    </div>
  );
}