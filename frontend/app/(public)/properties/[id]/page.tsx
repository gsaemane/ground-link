// src/app/(public)/properties/[id]/page.tsx

import { fetchProperty, Property } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Bed, Bath, Ruler, Mail, Phone, ChevronLeft, Share2, CheckCircle2, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MapWrapper from '@/components/MapWrapper';
import WhatsAppButton from '@/components/WhatsAppButton';
import ShareButton from '@/components/ShareButton';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await fetchProperty(id);

  if (!property) {
    return {
      title: 'Property Not Found | Ground Link',
    };
  }

  // This is the image WhatsApp will "grab" for the preview
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${property.image || property.images?.[0]}`;

  return {
    title: `${property.title} | Ground Link Real Estate`,
    description: property.description?.substring(0, 160), // Shorten for search engines
    openGraph: {
      title: property.title,
      description: property.description,
      url: `https://groundlink.com.sb/properties/${id}`, // Replace with your actual domain
      siteName: 'Ground Link Solomon Islands',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    // This is for Twitter/X previews
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description: property.description,
      images: [imageUrl],
    },
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await fetchProperty(id);

  if (!property) notFound();

  const images = property.images || [];
  const mainImage = images[0] || property.image || '/placeholder-property.jpg';
  const otherImages = images.slice(1);

  const isLand = property.type.toLowerCase() === 'land';

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 1. Full-Width Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <Link
          href="/properties"
          className="absolute top-8 left-8 z-20 bg-black/20 backdrop-blur-md hover:bg-black/40 text-white px-5 py-2.5 rounded-full flex items-center gap-2 transition-all border border-white/20 shadow-xl"
        >
          <ChevronLeft className="h-5 w-5" /> Back to listings
        </Link>

        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${mainImage}`}
          alt={property.title}
          className="w-full h-full object-cover"
        />

        {/* Deep Gradient for text protection */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto max-w-7xl">
            <Badge className="mb-6 bg-primary text-white hover:bg-primary px-5 py-1.5 text-sm uppercase tracking-widest border-none">
              {property.status?.replace('-', ' ')}
            </Badge>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl tracking-tight">
              {property.title}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-6 text-white/90">
              <div className="flex items-center gap-2 text-xl italic">
                <MapPin className="h-6 w-6 text-primary" />
                {property.address || property.location}, {property.province || 'Solomon Islands'}
              </div>
              <div className="flex items-center gap-2 text-3xl font-bold text-primary">
                <DollarSign className="h-8 w-8" />
                {property.price.toLocaleString()} SBD
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Layout */}
      <main className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          <div className="lg:col-span-8 space-y-16">

            {/* Quick Specs Bar */}
            <div className="grid grid-cols-3 gap-4 md:gap-10 py-10 border-y border-border/50">
              {!isLand && property.bedrooms !== undefined && (
                <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                  <div className="p-4 bg-primary/5 rounded-2xl text-primary"><Bed className="h-7 w-7" /></div>
                  <div><p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bedrooms</p><p className="font-bold text-2xl">{property.bedrooms || '--'}</p></div>
                </div>
              )}
              {!isLand && property.bathrooms !== undefined && (
                <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                  <div className="p-4 bg-primary/5 rounded-2xl text-primary"><Bath className="h-7 w-7" /></div>
                  <div><p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bathrooms</p><p className="font-bold text-2xl">{property.bathrooms || '--'}</p></div>
                </div>
              )}
              <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                <div className="p-4 bg-primary/5 rounded-2xl text-primary"><Ruler className="h-7 w-7" /></div>
                <div><p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sq Metres</p><p className="font-bold text-2xl">{property.landArea || '--'}</p></div>
              </div>
            </div>

            {/* Content Tabs (Overview, Features, Location) */}
            <Tabs defaultValue="overview" className="w-full">
              {/* The Track: Soft background, pill-shaped */}
              <TabsList className="inline-flex h-14 items-center justify-start rounded-full bg-muted/50 p-1.5 mb-12 border border-border/40 backdrop-blur-sm">
                <TabsTrigger
                  value="overview"
                  className="rounded-full px-8 py-2.5 text-sm font-bold uppercase tracking-widest transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="rounded-full px-8 py-2.5 text-sm font-bold uppercase tracking-widest transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="location"
                  className="rounded-full px-8 py-2.5 text-sm font-bold uppercase tracking-widest transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Location
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 outline-none">
                <div className="flex items-center gap-3 mb-2">

                  <h2 className="text-2xl">About this Property</h2>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-wrap font-light">
                  {property.description || 'No description provided.'}
                </p>
              </TabsContent>

              <TabsContent value="features" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 outline-none">
                <div className="flex items-center gap-3 mb-2">

                  <h2 className="text-2xl  mb-4 text-slate-900">Features & Amenities</h2>
                </div>
                {property.features && property.features.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-lg font-bold text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic text-lg">No specific features listed.</p>
                )}
              </TabsContent>

              <TabsContent value="location" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 outline-none">
                <div className="flex items-center gap-3 mb-2">

                  <h2 className="text-2xl  ">Explore the Neighborhood</h2>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-xl font-bold text-slate-600">
                    <MapPin className="h-5 w-5 text-primary" />
                    {property.address || property.location}, {property.province}
                  </div>
                  {property.coordinates && (
                    <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-border/50">
                      <MapWrapper coordinates={property.coordinates} title={property.title} />
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* 3. Image Gallery Section */}
            {otherImages.length > 0 && (
              <section className="space-y-8 pt-10 border-t">
                <h2 className="text-3xl font-bold tracking-tight font-heading">Property Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {otherImages.map((img, index) => (
                    <div
                      key={index}
                      className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-border/50"
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${img}`}
                        alt={`View ${index + 2}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* 4. Sticky Sidebar Card */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Main Contact Card - Smoothed & Modern */}
              <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl border border-white">
                <CardContent className="p-8 md:p-10 space-y-8">
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Investment Value</p>
                    <h3 className="text-4xl font-bold text-slate-900 tracking-tight">
                      SBD {property.price.toLocaleString()}
                    </h3>
                  </div>

                  {/* Agent Profile - Softened */}
                  <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-3xl border border-slate-100">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                      {property.agent?.name?.charAt(0) || 'G'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{property.agent?.name || 'Ground Link Agent'}</p>
                      <p className="text-xs text-slate-500 font-medium">Property Consultant</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* WhatsApp Primary Button */}
                    <WhatsAppButton
                      phone="6777809508"
                      title={property.title}
                      id={property._id}
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-12 rounded-xl font-bold border-slate-100 text-slate-600 hover:bg-slate-50 gap-2">
                        <Phone className="h-4 w-4" /> Call
                      </Button>
                      <Button variant="outline" className="h-12 rounded-xl font-bold border-slate-100 text-slate-600 hover:bg-slate-50 gap-2">
                        <Mail className="h-4 w-4" /> Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Secondary "Share" Section - Even Softer */}
              <div className="flex justify-center">
                <ShareButton title={property.title} />
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}