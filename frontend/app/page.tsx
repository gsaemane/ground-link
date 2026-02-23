// src/app/(public)/page.tsx

import { fetchProperties, Property } from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Home, Building, LandPlot, MapPin, ArrowRight } from 'lucide-react';

export default async function LandingPage() {
  let properties: Property[] = [];
  try {
    properties = await fetchProperties();
  } catch (error) {
    console.error('Failed to load properties:', error);
  }

  const featured = properties.slice(0, 6); // Show top 6 as featured

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section – Tropical Premium Feel */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-10" />
          <img
            src="https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
            alt="Tropical Solomon Islands beachfront property view"
            className="w-full h-full object-cover brightness-90"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 md:px-12 lg:px-24 text-center text-white max-w-5xl">
          <Badge variant="outline" className="mb-6 px-6 py-2 text-base border-white/40 bg-black/30 backdrop-blur-sm">
            Premium Properties in the Solomon Islands
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-8 drop-shadow-2xl">
            Find Your <span className="text-primary">Perfect Place</span><br />
            in Paradise
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 drop-shadow-lg">
            Discover exclusive houses, land, beachfront lots, and investment opportunities across Honiara and the islands — guided by local expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button size="lg" className="text-lg px-10 py-7 rounded-full shadow-xl bg-primary hover:bg-primary/90">
              Browse All Properties
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-7 rounded-full border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm"
            >
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Search Bar (optional enhancement) */}
      <section className="relative z-30 -mt-16 container mx-auto px-6 max-w-5xl">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Property Type</label>
              <div className="relative">
                <select className="w-full h-12 pl-10 pr-4 border rounded-lg appearance-none bg-background">
                  <option>All Types</option>
                  <option>House</option>
                  <option>Land</option>
                  <option>Apartment</option>
                  <option>Commercial</option>
                </select>
                <Home className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Honiara, Guadalcanal..."
                  className="w-full h-12 pl-10 pr-4 border rounded-lg"
                />
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <select className="w-full h-12 px-4 border rounded-lg appearance-none bg-background">
                <option>Any Price</option>
                <option>Under SBD 500,000</option>
                <option>SBD 500,000 – 1M</option>
                <option>Over SBD 1M</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button className="w-full h-12 text-lg">
                <Search className="mr-2 h-5 w-5" /> Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Properties</h2>
              <p className="text-xl text-muted-foreground mt-3">
                Handpicked selections ready for viewing
              </p>
            </div>
            <Button variant="outline" size="lg" className="gap-2">
              View All Properties <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((prop) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-xl">Loading featured properties...</p>
            </div>
          )}
        </div>
      </section>

      {/* Property Types Explorer */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-background border-t">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold mb-6">Explore Property Types</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            From beachfront land to modern family homes — find exactly what suits your lifestyle in the Solomon Islands.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['House', 'Land', 'Apartment', 'Commercial'].map((type) => (
              <div
                key={type}
                className="group p-8 border rounded-xl hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer bg-card"
              >
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {type === 'House' && <Home className="h-8 w-8 text-primary" />}
                  {type === 'Land' && <LandPlot className="h-8 w-8 text-primary" />}
                  {type === 'Apartment' && <Building className="h-8 w-8 text-primary" />}
                  {type === 'Commercial' && <MapPin className="h-8 w-8 text-primary" />}
                </div>
                <h3 className="text-xl font-semibold mb-2">{type}</h3>
                <p className="text-sm text-muted-foreground">Discover {type.toLowerCase()} options</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-muted/20 py-12 px-6 text-center text-muted-foreground">
        <div className="container mx-auto max-w-5xl">
          <p className="text-lg font-medium mb-4">Ground Link – Your Trusted Real Estate Partner</p>
          <p>© {new Date().getFullYear()} Ground Link. All rights reserved. | Honiara, Solomon Islands</p>
        </div>
      </footer>
    </div>
  );
}