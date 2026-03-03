'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Menu, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                isScrolled ? "top-4" : "top-0"
            )}
        >
            <nav
                className={cn(
                    "container mx-auto max-w-7xl transition-all duration-300 flex items-center justify-between px-6 py-3 rounded-full border",
                    isScrolled
                        ? "bg-white/80 backdrop-blur-lg border-border shadow-lg"
                        : "bg-transparent border-transparent text-white"
                )}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
                        <Home className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-black tracking-tighter">
                        GROUND<span className={isScrolled ? "text-primary" : "text-white/80"}>LINK</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 font-medium">
                    {['Properties', 'About', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                    <Link href="/contact"  >
                        <Button
                            variant={isScrolled ? "default" : "outline"}
                            className={cn(
                                "rounded-full px-6 transition-all",
                                !isScrolled && "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 cursor-pointer"
                            )}
                        >
                            List a Property
                        </Button>
                    </Link>
                </div>
            </nav>
        </header>
    );
}