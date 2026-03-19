'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, MapPin, UserIcon, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Properties', href: '/properties' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed w-full top-0 z-[100] bg-white/75 backdrop-blur-xl border-b border-black/5 transition-all supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tighter text-slate-900 group-hover:text-black transition-colors">Ground Link</span>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 -mt-0.5">Solomon Islands</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-bold text-[15px] text-slate-600 hover:text-black transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">

            <Button className="font-bold rounded-full px-6 shadow-xs gap-2 group" asChild>
              <Link href="/sell">
                List Property <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
                <Menu className="h-6 w-6 text-slate-900" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-96 border-l-0 p-0 sm:p-6 bg-white/95 backdrop-blur-xl">
              <div className="p-6 h-full flex flex-col">
                <div className="flex flex-col gap-6 mt-12">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-4xl font-extrabold tracking-tight text-slate-900 hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col gap-4 pb-12 sm:pb-0">
                  <Button className="w-full text-lg py-6 rounded-2xl gap-2 font-bold shadow-sm" asChild>
                    <Link href="/sell" onClick={() => setIsOpen(false)}>
                      List Your Property <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full text-lg py-6 rounded-2xl font-bold border-slate-200 text-slate-700 hover:bg-slate-50 gap-3" asChild>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <UserIcon className="w-5 h-5" /> Sign In
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}