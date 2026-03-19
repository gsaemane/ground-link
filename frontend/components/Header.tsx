'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Menu, UserIcon, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
      { name: 'Home', href: '/' },
      { name: 'Properties', href: '/properties' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
                isScrolled ? "py-4" : "py-6"
            )}
        >
            <nav
                className={cn(
                    "container mx-auto px-6 lg:px-8 max-w-7xl transition-all duration-500 flex items-center justify-between rounded-full",
                    isScrolled
                        ? "bg-white/90 backdrop-blur-xl border border-black/5 shadow-md py-4"
                        : "bg-transparent border-transparent text-white py-2"
                )}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group focus:outline-none">
                  <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm",
                      isScrolled ? "bg-black" : "bg-white/20 backdrop-blur-sm"
                  )}>
                    <MapPin className={cn("w-5 h-5", isScrolled ? "text-white" : "text-white")} />
                  </div>
                  <div>
                    <span className={cn(
                        "font-extrabold text-2xl tracking-tighter transition-colors",
                        isScrolled ? "text-slate-900 group-hover:text-black" : "text-white"
                    )}>Ground Link</span>
                    <p className={cn(
                        "text-[10px] uppercase font-bold tracking-[0.2em] -mt-0.5",
                        isScrolled ? "text-slate-500" : "text-white/70"
                    )}>Solomon Islands</p>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "font-bold text-[15px] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:transition-all hover:after:w-full",
                                isScrolled ? "text-slate-600 hover:text-black after:bg-black" : "text-white/90 hover:text-white after:bg-white"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className={cn("rounded-full", isScrolled ? "hover:bg-slate-100 text-slate-900" : "text-white hover:bg-white/20")}>
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full sm:w-96 p-0 sm:p-6 bg-white/95 backdrop-blur-xl border-none">
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
                    
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="ghost" className={cn(
                            "font-bold rounded-full px-6 transition-colors",
                            isScrolled ? "text-slate-600 hover:text-black hover:bg-slate-100" : "text-white hover:bg-white/20"
                        )} asChild>
                            <Link href="/login">Sign In</Link>
                        </Button>
                        <Link href="/sell">
                            <Button
                                className={cn(
                                    "rounded-full px-6 transition-all font-bold gap-2 group shadow-none",
                                    !isScrolled && "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30"
                                )}
                            >
                                List Property <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}