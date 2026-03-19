// src/app/(public)/properties/[id]/page.tsx

import { fetchProperty, Property, getImageUrl } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Bed, Bath, Ruler, Mail, Phone, ChevronLeft, Share, Heart, CheckCircle2, Building, Calendar, Layers } from 'lucide-react';
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

  const imageUrl = getImageUrl(property.image || property.images?.[0]);

  return {
    title: `${property.title} | Ground Link Real Estate`,
    description: property.description?.substring(0, 160),
    openGraph: {
      title: property.title,
      description: property.description,
      url: `https://groundlink.com.sb/properties/${id}`,
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
  const displayImages = images.length > 0 ? images.slice(0, 5) : [mainImage];
  const remainingImagesCount = images.length - 5;

  const isLand = property.type.toLowerCase() === 'land';

  return (
    <div className="min-h-screen bg-background pb-24 font-sans selection:bg-primary/20">
      
      {/* 1. Header Navigation */}
      <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8 flex justify-between items-center">
        <Link
          href="/properties"
          className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <div className="p-2 rounded-full border bg-background group-hover:bg-muted transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </div>
          <span className="hidden sm:inline">Back to listings</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex rounded-full gap-2">
            <Share className="h-4 w-4" /> Share
          </Button>
          <Button variant="outline" size="sm" className="rounded-full gap-2 hover:text-red-500 hover:border-red-500 transition-colors">
            <Heart className="h-4 w-4" /> Save
          </Button>
        </div>
      </div>

      <main className="container mx-auto max-w-7xl px-4">
        {/* Title Section */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <Badge className="bg-primary hover:bg-primary/90 rounded-sm uppercase tracking-widest text-[10px] px-3 py-1 font-bold">
              {property.status?.replace('-', ' ')}
            </Badge>
            <Badge variant="secondary" className="rounded-sm uppercase tracking-widest text-[10px] px-3 py-1 font-bold">
              {property.type}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            {property.title}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground font-medium text-lg mt-2">
            <MapPin className="h-5 w-5 text-primary" />
            {property.address || property.location}, {property.province || 'Solomon Islands'}
          </div>
        </div>

        {/* Immersive Image Grid (Airbnb Style) */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 md:gap-3 rounded-[2rem] overflow-hidden md:h-[60vh] mb-12 shadow-sm border border-border/40">
          {/* Main Hero Image */}
          <div className="col-span-1 md:col-span-2 row-span-2 relative group cursor-pointer overflow-hidden">
            <img 
              src={getImageUrl(displayImages[0])} 
              alt={property.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
          </div>

          {/* Grid of 4 Smaller Images */}
          {displayImages.slice(1, 5).map((img, index) => (
            <div key={index} className="hidden md:block relative group cursor-pointer overflow-hidden relative">
              <img 
                src={getImageUrl(img)} 
                alt={`${property.title} - View ${index + 2}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              {index === 3 && remainingImagesCount > 0 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="text-white font-bold text-xl tracking-wider">+{remainingImagesCount}</span>
                </div>
              )}
            </div>
          ))}

          {/* Fallback for Mobile if fewer images */}
          {displayImages.length < 2 && (
             <div className="hidden md:block md:col-span-2 row-span-2 bg-muted flex items-center justify-center border-l">
               <span className="text-muted-foreground">More photos coming soon</span>
             </div>
          )}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Quick Summary Row */}
            <div className="flex flex-wrap items-center justify-between border-y py-6 gap-6 md:gap-12">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-slate-800">
                  SBD {property.price.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">Asking Price</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 md:gap-10">
                {!isLand && property.bedrooms !== undefined && (
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-100 rounded-full text-slate-700"><Bed className="h-6 w-6" /></div>
                    <div>
                      <p className="font-bold text-xl leading-none">{property.bedrooms}</p>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Beds</p>
                    </div>
                  </div>
                )}
                {!isLand && property.bathrooms !== undefined && (
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-100 rounded-full text-slate-700"><Bath className="h-6 w-6" /></div>
                    <div>
                      <p className="font-bold text-xl leading-none">{property.bathrooms}</p>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Baths</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-100 rounded-full text-slate-700"><Ruler className="h-6 w-6" /></div>
                  <div>
                    <p className="font-bold text-xl leading-none">{property.landArea || '--'}</p>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Sq M</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">About this space</h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-light leading-relaxed">
                {property.description?.split('\\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>

            <Separator />

            {/* In-depth Details Grid */}
            <section className="space-y-6">
               <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Property Details</h2>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-12">
                  {property.buildingArea !== undefined && property.buildingArea > 0 && (
                    <div className="flex items-start gap-4">
                      <Layers className="h-6 w-6 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-500">Building Area</p>
                        <p className="font-medium text-slate-900">{property.buildingArea} sqm</p>
                      </div>
                    </div>
                  )}
                  {property.yearBuilt !== undefined && property.yearBuilt > 0 && (
                    <div className="flex items-start gap-4">
                      <Calendar className="h-6 w-6 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-500">Year Built</p>
                        <p className="font-medium text-slate-900">{property.yearBuilt}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                      <Building className="h-6 w-6 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-500">Property Type</p>
                        <p className="font-medium text-slate-900 capitalize">{property.type}</p>
                      </div>
                  </div>
               </div>
            </section>

            {property.features && property.features.length > 0 && (
              <>
                <Separator />
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">What this place offers</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 text-slate-700 font-medium">
                        <CheckCircle2 className="h-6 w-6 text-slate-300" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {property.coordinates && (
              <>
                <Separator />
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Where you'll be</h2>
                  <p className="text-slate-500 font-medium">{property.address || property.location}, {property.province}</p>
                  <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-200 h-[400px]">
                    <MapWrapper coordinates={property.coordinates} title={property.title} />
                  </div>
                </section>
              </>
            )}

          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-8 w-full">
              <Card className="border shadow-xl shadow-slate-200/50 rounded-[2rem] bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl font-extrabold text-slate-900">
                    SBD {property.price.toLocaleString()}
                  </CardTitle>
                  <CardDescription className="text-base font-medium">
                    Listed {property.status.replace('-', ' ')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Agent Card Inline */}
                  <div className="flex items-center gap-4 py-4 border-y">
                    <Avatar className="h-16 w-16 border-2 border-slate-100">
                      <AvatarImage src="" alt={property.agent?.name || 'Agent'} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                        {property.agent?.name?.charAt(0) || 'G'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Listed by</p>
                      <p className="font-bold text-slate-900 text-lg">{property.agent?.name || 'Ground Link Agent'}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Primary Call to Action */}
                    <WhatsAppButton
                      phone="6777809508"
                      title={property.title}
                      id={property._id}
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-14 rounded-xl font-bold gap-2 text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 shadow-xs">
                        <Phone className="h-5 w-5" /> Call Agent
                      </Button>
                      <Button variant="outline" className="h-14 rounded-xl font-bold gap-2 text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 shadow-xs">
                        <Mail className="h-5 w-5" /> Message
                      </Button>
                    </div>
                  </div>

                  {/* Share Component */}
                  <div className="pt-4 flex flex-col items-center justify-center border-t border-slate-100 gap-3">
                     <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Share this listing</p>
                     <ShareButton title={property.title} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}