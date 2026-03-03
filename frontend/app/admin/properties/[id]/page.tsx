'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { fetchProperty, Property } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Pencil, MapPin, Bed, Bath, Ruler, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Mail, Phone } from 'lucide-react';

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

export default function AdminPropertyDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProperty(id);
        setProperty(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load property');
        toast.error('Could not load property details');
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">Error</h2>
            <p className="text-muted-foreground mb-6">{error || 'Property not found'}</p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const mainImage = property.images?.[0] || property.image || '/placeholder-property.jpg';
  const hasCoords = property.coordinates?.lat && property.coordinates?.lng;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Bar */}
      <div className="border-b bg-card sticky top-0 z-30">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl md:text-2xl font-bold truncate max-w-[60vw]">
              {property.title}
            </h1>
          </div>
          <Button onClick={() => router.push(`/admin/properties/${id}/edit`)}>
            <Pencil className="mr-2 h-4 w-4" /> Edit Property
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left – Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 pb-6 border-b">
              <div className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-2xl font-bold">${property.price.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Price</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-lg px-4 py-1 capitalize">
                  {property.status.replace('-', ' ')}
                </Badge>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Description</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {property.description || 'No description provided.'}
                  </p>
                </div>

                {/* Key Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {property.bedrooms !== undefined && (
                    <div className="flex items-center gap-3">
                      <Bed className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-semibold text-lg">{property.bedrooms}</p>
                        <p className="text-sm text-muted-foreground">Bedrooms</p>
                      </div>
                    </div>
                  )}
                  {property.bathrooms !== undefined && (
                    <div className="flex items-center gap-3">
                      <Bath className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-semibold text-lg">{property.bathrooms}</p>
                        <p className="text-sm text-muted-foreground">Bathrooms</p>
                      </div>
                    </div>
                  )}
                  {property.landArea && (
                    <div className="flex items-center gap-3">
                      <Ruler className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-semibold text-lg">{property.landArea} sqm</p>
                        <p className="text-sm text-muted-foreground">Land Area</p>
                      </div>
                    </div>
                  )}
                  {property.yearBuilt && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-semibold text-lg">{property.yearBuilt}</p>
                        <p className="text-sm text-muted-foreground">Year Built</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="features">
                <h2 className="text-2xl font-semibold mb-6">Features & Amenities</h2>
                {property.features?.length ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.features.map((feature, i) => (
                      <div
                        key={i}
                        className="bg-muted/40 border rounded-lg p-4 flex items-center gap-3"
                      >
                        <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No features listed for this property.</p>
                )}
              </TabsContent>

              <TabsContent value="location">
                <h2 className="text-2xl font-semibold mb-6">Property Location</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <p className="font-medium">
                        {property.address || property.location}, {property.province || 'Solomon Islands'}
                      </p>
                      {hasCoords && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Coordinates: {property.coordinates?.lat.toFixed(6)}, {property.coordinates?.lng.toFixed(6)}
                        </p>
                      )}
                    </div>
                  </div>

                  {hasCoords && property.coordinates ? (
                    <div className="h-96 rounded-xl overflow-hidden border shadow-sm">
                      <PropertyMap
                        coordinates={property.coordinates}
                        title={property.title}
                      />
                    </div>
                  ) : (
                    <div className="h-64 bg-muted rounded-xl flex items-center justify-center">
                      <p className="text-muted-foreground">No coordinates available for map display</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 lg:h-fit space-y-8">
            <Card className="border-primary/20 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-primary">
                    ${property.price.toLocaleString()}
                  </span>
                  <Badge variant="outline" className="text-lg px-4 py-1">
                    {property.status.replace('-', ' ')}
                  </Badge>
                </div>

                {property.agent && property.agent.name ? (
                  <div className="space-y-5 pt-6 border-t">
                    <h3 className="font-semibold text-lg">Listing Agent</h3>
                    <div className="space-y-3">
                      <p className="font-medium text-base">{property.agent.name}</p>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{property.agent.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm break-all">{property.agent.email}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <Button variant="outline" className="w-full">
                        Call Agent
                      </Button>
                      <Button className="w-full">
                        Send Message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No agent information available
                  </p>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Loading Skeleton (unchanged but kept for completeness)
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-[60vh] bg-muted animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}