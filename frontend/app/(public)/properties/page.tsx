import { fetchProperties, Property } from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import HeroSearch from '@/components/HeroSearch';

export default async function PropertiesListingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  let allProperties: Property[] = [];

  try {
    allProperties = await fetchProperties();
  } catch (error) {
    console.error('Failed to load properties:', error);
  }

  // Helper to ensure single string for the search widget
  const getSingleValue = (val: string | string[] | undefined): string | undefined => {
    if (Array.isArray(val)) return val[0];
    return val;
  };

  const initialValues = {
    type: getSingleValue(params.type),
    location: getSingleValue(params.location),
    price: getSingleValue(params.price),
  };

  // Filter logic
  const filteredProperties = allProperties.filter((prop) => {
    const typeMatch = !initialValues.type || initialValues.type === "All Types" || 
      prop.type.toLowerCase() === initialValues.type.toLowerCase();

    const locationMatch = !initialValues.location || 
      prop.location.toLowerCase().includes(initialValues.location.toLowerCase()) ||
      prop.province?.toLowerCase().includes(initialValues.location.toLowerCase());

    let priceMatch = true;
    if (initialValues.price === "Under 500k") priceMatch = prop.price < 500000;
    if (initialValues.price === "500k - 1M") priceMatch = prop.price >= 500000 && prop.price <= 1000000;
    if (initialValues.price === "Over 1M") priceMatch = prop.price > 1000000;

    return typeMatch && locationMatch && priceMatch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* 1. Header Section with Image and Industrial Fade Overlay */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-black">
        {/* The Background Image - Using a broad architectural shot */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Real Estate Portfolio background"
            className="w-full h-full object-cover grayscale opacity-90 brightness-75"
          />
        </div>

        {/* The "Industrial Fade" Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-linear-to-b from-black via-black/80 to-background opacity-70" />
        
        <div className="container mx-auto max-w-7xl px-6 relative z-20 text-center">
          <Badge className="bg-primary text-white rounded-md px-3 py-1 mb-6 border-none uppercase text-[10px] tracking-widest animate-in fade-in slide-in-from-top-4 duration-1000">
            Full Portfolio
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white uppercase italic drop-shadow-2xl">
            Prime <span className="text-primary">Listings</span><span className="text-white">.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
            Explore our curated selection of premium real estate across the Solomon Islands.
          </p>
        </div>
      </section>

      {/* 2. Filter Bar prefilled with URL params */}
      <section className="relative z-30 -mt-12 container mx-auto px-6 max-w-7xl">
         <HeroSearch initialValues={initialValues} /> 
      </section>

      <main className="container mx-auto max-w-7xl px-6 py-16 relative z-20">
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Showing <span className="text-black">{filteredProperties.length}</span> luxury listings
          </p>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border-2 border-slate-100 rounded-lg bg-slate-50">
            <h3 className="text-xl font-black uppercase italic">No matches found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your filters to find your perfect property.</p>
          </div>
        )}
      </main>
    </div>
  );
}