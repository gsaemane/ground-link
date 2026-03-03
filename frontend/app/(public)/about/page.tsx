import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Globe, ShieldCheck, MapPin, Quote } from 'lucide-react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function AboutPage() {
  const trustBadges = [
    { 
      label: 'Customary Experts', 
      value: 'Land Security', 
      desc: 'Navigating local land laws so your investment is 100% legally protected.',
      icon: ShieldCheck
    },
    { 
      label: 'Honiara Based', 
      value: 'On The Ground', 
      desc: 'We aren’t a remote tech firm. We are locals based right here in the Hapi Isles.',
      icon: MapPin
    },
    { 
      label: 'Full Transparency', 
      value: 'Zero Fees', 
      desc: 'No hidden costs or "middle-man" markups. What you see is what you pay.',
      icon: CheckCircle2
    },
    { 
      label: 'Our Ambition', 
      value: '9 Provinces', 
      desc: 'Our network and vision span the entire archipelago, from Choiseul to Temotu.',
      icon: Globe
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />

      {/* 1. Split Hero Section (Dark & Bold) */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1544971587-b842c27f8e14?q=80&w=2069&auto=format&fit=crop" 
            alt="Honiara Coastline" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
              Redefining Real Estate in the <span className="text-primary">Hapi Isles.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-10 max-w-2xl">
              Ground Link is a local startup fixing a broken system. We combine deep customary knowledge with modern technology to protect your legacy.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="rounded-full px-10 h-16 text-lg font-black shadow-xl">
                <Link href="/properties">Explore Listings</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Badges (The "Startup Truth" Cards) */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-32 relative z-20">
          {trustBadges.map((stat, i) => (
            <Card key={i} className="bg-white/95 backdrop-blur-2xl border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden group hover:scale-[1.03] transition-all duration-500">
              <CardContent className="p-10 text-center flex flex-col items-center">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <stat.icon className="h-7 w-7" />
                </div>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">{stat.value}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{stat.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Our Story Section (Clean White) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop" 
                alt="Modern Architecture" 
                className="rounded-[3.5rem] shadow-2xl relative z-10"
              />
            </div>
            
            <div className="space-y-8">
              <h2 className="text-5xl font-black tracking-tighter text-slate-900 leading-[1.1]">
                A Local Vision for a <br/>Global Standard.
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed font-light">
                Ground Link started with a simple observation: finding verified land in our own home shouldn&apos;t be a challenge. We aren&apos;t a remote corporation; we are a dedicated team fixing the market from the ground up.
              </p>
              <div className="space-y-4 pt-4">
                {[
                  'Verified Customary Land Expertise',
                  'Transparent Pricing with No Hidden Fees',
                  'Direct WhatsApp Access to Local Agents',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-lg font-bold text-slate-800">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Founder's Note (The Trust Builder) */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <Card className="bg-white rounded-[3.5rem] border-none shadow-2xl p-12 md:p-20 relative overflow-hidden">
            <Quote className="absolute top-12 right-12 h-24 w-24 text-slate-100 opacity-20" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 rounded-[2.5rem] overflow-hidden shadow-xl shrink-0 grayscale hover:grayscale-0 transition-all duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                  alt="Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-6 text-center md:text-left">
                <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Founder&apos;s Note</h3>
                <p className="text-2xl md:text-3xl font-light text-slate-700 leading-relaxed italic">
                  &quot;In the Solomon Islands, property is more than just land—it&apos;s our legacy. We built Ground Link to ensure that every family has an honest path to owning their piece of paradise.&quot;
                </p>
                <div>
                  <p className="text-xl font-black text-slate-900">The Ground Link Team</p>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Est. 2024 • Honiara</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="bg-primary rounded-[3.5rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 tracking-tighter leading-none">Ready to start your <br/>journey in paradise?</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
            <Button asChild size="lg" variant="secondary" className="rounded-full h-18 px-12 text-lg font-black shadow-xl">
              <Link href="/properties">Explore Listings</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full h-18 px-12 text-lg font-black border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-20 px-6">
        <div className="container mx-auto max-w-7xl text-center">
          <span className="text-2xl font-black tracking-tighter text-white mb-8 block">GROUNDLINK</span>
          <p className="max-w-md mx-auto mb-10 text-lg font-light">Built for the Solomon Islands, by the Solomon Islands.</p>
          <div className="pt-10 border-t border-slate-900 text-[10px] font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Ground Link Ltd. Honiara
          </div>
        </div>
      </footer>
    </div>
  );
}