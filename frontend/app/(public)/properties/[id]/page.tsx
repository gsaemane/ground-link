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

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await fetchProperty(id);

  if (!property) notFound();

  const images = property.images || [];
  const mainImage = images[0] || property.image || '/placeholder-property.jpg';
  const otherImages = images.slice(1);

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
              <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                <div className="p-4 bg-primary/5 rounded-2xl text-primary"><Bed className="h-7 w-7" /></div>
                <div><p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bedrooms</p><p className="font-bold text-2xl">{property.bedrooms || '--'}</p></div>
              </div>
              <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                <div className="p-4 bg-primary/5 rounded-2xl text-primary"><Bath className="h-7 w-7" /></div>
                <div><p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bathrooms</p><p className="font-bold text-2xl">{property.bathrooms || '--'}</p></div>
              </div>
              <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                <div className="p-4 bg-primary/5 rounded-2xl text-primary"><Ruler className="h-7 w-7" /></div>
                <div><p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sq Metres</p><p className="font-bold text-2xl">{property.landArea || '--'}</p></div>
              </div>
            </div>

            {/* Content Tabs (Overview, Features, Location) */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-10 gap-8">
                <TabsTrigger value="overview" className="data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 pb-4 text-lg font-semibold bg-transparent shadow-none">Overview</TabsTrigger>
                <TabsTrigger value="features" className="data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 pb-4 text-lg font-semibold bg-transparent shadow-none">Features</TabsTrigger>
                <TabsTrigger value="location" className="data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 pb-4 text-lg font-semibold bg-transparent shadow-none">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">About this Property</h2>
                <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-wrap font-light">
                  {property.description || 'No description provided.'}
                </p>
              </TabsContent>

              <TabsContent value="features" className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight">Features & Amenities</h2>
                {property.features && property.features.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {property.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-muted/30 border border-border/50">
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                        <span className="text-lg font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic text-lg">No specific features listed for this property.</p>
                )}
              </TabsContent>

              <TabsContent value="location" className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight">Explore the Neighborhood</h2>
                <div className="space-y-6">
                  <p className="text-xl font-medium">{property.address || property.location}, {property.province}</p>
                  {property.coordinates && (
                    <div className="rounded-3xl overflow-hidden shadow-2xl border border-border/50">
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
            <Card className="sticky top-28 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border-none rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-10 space-y-10">
                <div className="space-y-2">
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">Exclusive Listing</p>
                  <h3 className="text-4xl font-black text-primary tracking-tight">
                    SBD {property.price.toLocaleString()}
                  </h3>
                </div>

                <div className="space-y-6">
                  <h4 className="font-bold text-xl">Primary Contact</h4>
                  {property.agent?.name ? (
                    <div className="flex items-center gap-5 p-6 bg-muted/50 rounded-3xl">
                      <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-primary/20">
                        {property.agent.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-lg">{property.agent.name}</p>
                        <p className="text-sm text-muted-foreground">Certified Real Estate Agent</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-muted/50 rounded-3xl text-center italic text-muted-foreground">
                      Contact Ground Link for details
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Button className="w-full h-16 text-lg font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                    Inquire About Viewing
                  </Button>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-14 rounded-2xl font-bold gap-2 text-muted-foreground hover:text-primary">
                      <Phone className="h-5 w-5" /> Call
                    </Button>
                    <Button variant="outline" className="h-14 rounded-2xl font-bold gap-2 text-muted-foreground hover:text-primary">
                      <Mail className="h-5 w-5" /> Email
                    </Button>
                  </div>
                  <Button variant="ghost" className="w-full text-muted-foreground hover:bg-transparent hover:text-primary gap-2">
                    <Share2 className="h-4 w-4" /> Share with someone
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>

        </div>
      </main>
    </div>
  );
}