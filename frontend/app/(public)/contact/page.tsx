import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    MessageSquare,
    Send,
    Facebook,
    Instagram,
    Badge
} from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />

            {/* 1. Header Section */}
            <section className="relative pt-40 pb-24 overflow-hidden">
                {/* The Gradient Overlay: Black to Transparent to White */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/80 to-background" />

                {/* Optional: Subtle background texture or image */}
                <div className="absolute inset-0 z-[-1] opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full object-cover grayscale"
                        alt="Contact background"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <Badge className="bg-primary text-white mb-6 rounded-none px-4 py-1 uppercase tracking-[0.2em] animate-in fade-in slide-in-from-top-4 duration-1000">
                        Contact Us
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white uppercase italic">
                        Let's <span className="text-primary">Connect.</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Inquire about premier listings or schedule a consultation with our Honiara-based team.
                    </p>
                </div>
            </section>

            {/* 2. Main Contact Grid */}
            <section className="py-24 container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Side: Contact Info */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold">Get in Touch</h2>
                            <p className="text-lg text-muted-foreground">
                                Visit our office or reach out via our direct channels. We typically respond within 2 hours.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {[
                                {
                                    icon: Phone,
                                    title: 'Call or WhatsApp',
                                    detail: '+677 7123456',
                                    sub: 'Mon - Fri, 8am - 5pm'
                                },
                                {
                                    icon: Mail,
                                    title: 'Email Us',
                                    detail: 'hello@groundlink.com.sb',
                                    sub: 'General inquiries'
                                },
                                {
                                    icon: MapPin,
                                    title: 'Visit Honiara Office',
                                    detail: 'Hibiscus Avenue, Central Honiara',
                                    sub: 'Solomon Islands'
                                },
                                {
                                    icon: Clock,
                                    title: 'Working Hours',
                                    detail: '8:00 AM - 5:00 PM',
                                    sub: 'Saturday by appointment'
                                },
                            ].map((item, i) => (
                                <Card key={i} className="border-none bg-muted/30 rounded-3xl group hover:bg-primary transition-colors duration-300">
                                    <CardContent className="p-6 flex items-center gap-6">
                                        <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg group-hover:text-white transition-colors">{item.title}</h4>
                                            <p className="text-primary font-medium group-hover:text-white/90">{item.detail}</p>
                                            <p className="text-xs text-muted-foreground group-hover:text-white/70">{item.sub}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="pt-6 space-y-4">
                            <p className="font-bold uppercase tracking-widest text-sm text-muted-foreground">Follow Our Listings</p>
                            <div className="flex gap-4">
                                <Button variant="outline" size="icon" className="rounded-2xl h-12 w-12 hover:bg-primary hover:text-white transition-all">
                                    <Facebook className="h-5 w-5" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-2xl h-12 w-12 hover:bg-primary hover:text-white transition-all">
                                    <Instagram className="h-5 w-5" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-2xl h-12 w-12 hover:bg-primary hover:text-white transition-all">
                                    <MessageSquare className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="lg:col-span-7">
                        <Card className="shadow-2xl border-none rounded-[3rem] p-8 md:p-12 overflow-hidden relative">
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

                            <form className="space-y-8 relative z-10">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-bold">Send a Message</h3>
                                    <p className="text-muted-foreground">Required fields are marked with an asterisk (*)</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider">Full Name *</label>
                                        <Input placeholder="John Doe" className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider">Email Address *</label>
                                        <Input type="email" placeholder="john@example.com" className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-primary" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider">Phone Number</label>
                                        <Input placeholder="+677 7xxxxxx" className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider">Inquiry Type</label>
                                        <select className="flex h-14 w-full rounded-2xl bg-slate-50 border-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                                            <option>Buying a Property</option>
                                            <option>Selling a Property</option>
                                            <option>Land Consultation</option>
                                            <option>Investment Advice</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider">Message *</label>
                                    <Textarea
                                        placeholder="Tell us about the property or location you are interested in..."
                                        className="min-h-[160px] rounded-3xl bg-slate-50 border-none focus-visible:ring-primary p-6"
                                    />
                                </div>

                                <Button className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 gap-2 hover:scale-[1.01] transition-transform">
                                    <Send className="h-5 w-5" /> Send Message
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 3. Map / Location Image */}
            <section className="h-[400px] w-full bg-slate-200 mt-12 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                <img
                    src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974&auto=format&fit=crop"
                    alt="Map Placeholder"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
                    <MapPin className="text-primary h-5 w-5" />
                    <span className="font-bold">Ground Link Honiara</span>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="py-12 border-t text-center text-muted-foreground text-sm">
                <p>© {new Date().getFullYear()} Ground Link Ltd. Solomon Islands.</p>
            </footer>
        </div>
    );
}