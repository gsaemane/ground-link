import { fetchProperties, Property } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const properties = await fetchProperties();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section – modern, full-bleed */}
      <section className="relative bg-linear-to-br from-slate-900 to-slate-800 text-white py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/hero-bg-pattern.svg')] bg-cover" />
        <div className="relative container mx-auto max-w-7xl text-center">
          <Badge variant="outline" className="mb-6 border-white/40 text-white/90 uppercase tracking-wider">
            Premium Properties
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Find Your <span className="text-primary">Dream Property</span><br />in the Solomon Islands
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
            Discover exclusive houses, land, and investment opportunities with expert local guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-10">Browse Listings</Button>
            <Button size="lg" variant="outline" className="text-lg px-10 border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-muted/40">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Properties</h2>
            <Button variant="link" className="text-lg">View All →</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(0, 6).map((prop: Property) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer – simple modern */}
      <footer className="mt-auto border-t bg-background py-12 px-6 text-center text-muted-foreground">
        <p>© {new Date().getFullYear()} Geolynx Real Estate. All rights reserved.</p>
      </footer>
    </div>
  );
}