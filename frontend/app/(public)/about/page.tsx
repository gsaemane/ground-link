import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Globe, Users, ShieldCheck, Map, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* 1. Split Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1544971587-b842c27f8e14?q=80&w=2069&auto=format&fit=crop" 
            alt="Honiara Coastline" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
              Redefining Real Estate in the <span className="text-primary">Hapi Isles.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-10">
              Ground Link is more than a property portal. We are your local partners in navigating the unique landscape of the Solomon Islands property market.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg">Our Properties</Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg text-white border-white/20 hover:bg-white/10">Contact Us</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Section (Glass cards) */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 -mt-32 relative z-20">
          {[
            { label: 'Properties Listed', value: '500+' },
            { label: 'Happy Families', value: '1.2k' },
            { label: 'Years Experience', value: '15+' },
            { label: 'Islands Covered', value: '9' },
          ].map((stat, i) => (
            <Card key={i} className="bg-white/90 backdrop-blur-xl border-none shadow-2xl rounded-[2rem]">
              <CardContent className="p-8 text-center">
                <p className="text-4xl font-black text-primary mb-2">{stat.value}</p>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Our Story / Mission */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop" 
                alt="Modern Architecture" 
                className="rounded-[3rem] shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-3xl shadow-xl z-20 hidden md:block">
                <p className="text-white font-black text-2xl italic">"Trust in every acre."</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
                A Local Vision for a <br/>Global Standard.
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Founded in Honiara, Ground Link was born from a simple observation: finding verified, high-quality property in the Solomon Islands shouldn't be a challenge. 
              </p>
              <div className="space-y-4">
                {[
                  'Verified Land Titles & Customary Land Expertise',
                  'Transparent Pricing with No Hidden Fees',
                  'Exclusive Beachfront & Residential Access',
                  'Dedicated Support for International Investors'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-lg font-medium text-slate-700">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Grid */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6 text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Why Choose Ground Link?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">We operate on the principles of integrity, community, and island-wide connectivity.</p>
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              title: 'Customary Expertise', 
              desc: 'We understand the complexities of land tenure in the Solomons, ensuring your investment is secure.',
              icon: Map
            },
            { 
              title: 'Community First', 
              desc: 'We work closely with local landowners to ensure sustainable and fair property development.',
              icon: Users
            },
            { 
              title: 'Island-Wide Reach', 
              desc: 'From Gizo to Honiara, our network spans all major provinces in the archipelago.',
              icon: Globe
            }
          ].map((value, i) => (
            <div key={i} className="group p-10 bg-white rounded-[2.5rem] border border-slate-200 hover:border-primary/30 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                <value.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Call to Action */}
      <section className="py-24 container mx-auto px-6">
        <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Ready to start your <br/>journey in paradise?</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
            <Button size="lg" variant="secondary" className="rounded-full h-16 px-10 text-xl font-bold">
              Explore Listings
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-xl font-bold border-white text-white hover:bg-white/10">
              Meet Our Agents
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-20 px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="bg-primary p-2 rounded-lg"><Globe className="h-6 w-6 text-white" /></div>
            <span className="text-2xl font-black tracking-tighter text-white">GROUNDLINK</span>
          </div>
          <p className="max-w-md mx-auto mb-10 text-lg">Your trusted real estate partner in Honiara and beyond. Built for the Solomon Islands, by the Solomon Islands.</p>
          <div className="flex justify-center gap-8 mb-10">
            {['Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map(link => (
              <a key={link} href="#" className="hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs">{link}</a>
            ))}
          </div>
          <div className="pt-10 border-t border-slate-900 text-sm italic">
            © {new Date().getFullYear()} Ground Link Ltd. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}