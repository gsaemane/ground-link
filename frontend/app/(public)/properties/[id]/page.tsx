'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProperty, Property } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Bed, Bath, Ruler, Calendar, DollarSign, Phone, Mail, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Skeleton } from '@/components/ui/skeleton';

export default function PublicPropertyDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadProperty = async () => {
      try {
        const data = await fetchProperty(id);
        setProperty(data);
      } catch (err: any) {
        toast.error('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  if (loading) return <LoadingSkeleton />;

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Property Not Found</h2>
          <p className="text-muted-foreground">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const mainImage = property.images?.[0] || property.image || '/placeholder-property.jpg';
  const hasCoordinates = property.coordinates?.lat && property.coordinates?.lng;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[55vh] md:h-[70vh] overflow-hidden">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${mainImage}`}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-6xl mx-auto">
            <Badge variant="secondary" className="mb-4 text-lg px-5 py-1.5 capitalize">
              {property.status.replace('-', ' ')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              {property.title}
            </h1>
            <div className="flex items-center gap-4 text-2xl font-semibold">
              <DollarSign className="h-7 w-7" />
              {property.price.toLocaleString()} SBD
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">
                {property.address || property.location}, {property.province || 'Solomon Islands'}
              </span>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <h2 className="text-3xl font-semibold mb-6">About this property</h2>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {property.description || 'No description available.'}
                </p>
              </TabsContent>

              <TabsContent value="features">
                <h2 className="text-3xl font-semibold mb-6">Features & Amenities</h2>
                {property.features && property.features.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 bg-muted/50 p-4 rounded-xl">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No features listed.</p>
                )}
              </TabsContent>

              <TabsContent value="location">
                <h2 className="text-3xl font-semibold mb-6">Location</h2>
                <div className="space-y-6">
                  <p className="text-lg">{property.address || property.location}, {property.province}</p>

                  {hasCoordinates && (
                    <div className="h-[420px] rounded-2xl overflow-hidden border shadow-sm">
                      <MapContainer
                        center={[property.coordinates!.lat, property.coordinates!.lng]}
                        zoom={16}
                        scrollWheelZoom={true}
                        className="h-full w-full"
                      >
                        <TileLayer
                          attribution='&copy; OpenStreetMap contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[property.coordinates!.lat, property.coordinates!.lng]}>
                          <Popup>{property.title}</Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Card className="sticky top-8 shadow-lg border border-border/50">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-6">
                  ${property.price.toLocaleString()}
                </div>

                {property.agent && property.agent.name ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-xl mb-2">Contact Agent</h3>
                      <p className="font-medium text-lg">{property.agent.name}</p>
                    </div>

                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start" size="lg">
                        <Phone className="mr-3 h-5 w-5" />
                        {property.agent.phone}
                      </Button>
                      <Button variant="outline" className="w-full justify-start" size="lg">
                        <Mail className="mr-3 h-5 w-5" />
                        {property.agent.email}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Contact details coming soon.
                  </p>
                )}

                <div className="mt-10 pt-6 border-t flex gap-4">
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                  <Button className="flex-1">Enquire Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-[70vh] bg-muted animate-pulse" />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-80 w-full" />
          </div>
          <Skeleton className="lg:col-span-4 h-96 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}