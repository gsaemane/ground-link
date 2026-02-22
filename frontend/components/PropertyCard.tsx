import { Property } from '@/lib/api';

export default function PropertyCard({ property }: { property: Property }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      {property.image && (
        <img
          src={`${API_BASE}${property.image}`}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        <p className="text-2xl font-bold text-green-600 mb-2">
          ${property.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {property.description || 'No description provided.'}
        </p>
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize">
          {property.type}
        </span>
      </div>
    </div>
  );
}