import { fetchProperties, Property } from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
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
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-primary/20">
      <Navbar />

      {/* Clean Top Area for Search */}
      <section className="pt-32 pb-12 px-6 bg-white border-b border-slate-100">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-8">
            Explore Properties
          </h1>
          <HeroSearch initialValues={initialValues} /> 
        </div>
      </section>

      <main className="container mx-auto max-w-7xl px-6 py-12 relative z-20 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Showing <span className="text-black">{filteredProperties.length}</span> luxury listings
          </p>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border border-slate-200 border-dashed rounded-[3rem] bg-white">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">No matches found</h3>
            <p className="text-slate-500 font-medium max-w-md mx-auto">Try adjusting your budget or searching a different location to find what you're looking for.</p>
          </div>
        )}
      </main>
      
      {/* Minimal Footer */}
      <footer className="bg-white py-12 px-6 border-t border-slate-100 mt-auto">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-lg font-bold text-slate-900 tracking-tight mb-2">Ground Link</p>
          <p className="text-sm font-medium text-slate-500">
            © {new Date().getFullYear()} Ground Link. All rights reserved. • Honiara, Solomon Islands
          </p>
        </div>
      </footer>
    </div>
  );
}