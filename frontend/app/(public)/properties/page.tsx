import { fetchProperties, Property } from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';

export default async function Home() {
  let properties: Property[] = [];

  try {
    properties = await fetchProperties();
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Real Estate Listings</h1>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500">No properties available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <PropertyCard key={prop._id} property={prop} />
          ))}
        </div>
      )}
    </main>
  );
}