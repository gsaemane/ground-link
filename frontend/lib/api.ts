const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface Property {
  _id: string;
  title: string;
  description?: string;
  price: number;
  type: string;
  image?: string;
  featured?: boolean;
  createdAt: string;
}

export async function fetchProperties(): Promise<Property[]> {
  const res = await fetch(`${API_BASE}/api/properties`, {
    cache: 'no-store', // or use revalidate if needed
  });
  if (!res.ok) throw new Error('Failed to fetch properties');
  return res.json();
}

export async function createProperty(formData: FormData) {
  const res = await fetch(`${API_BASE}/api/properties`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Failed to create property');
  }

  return res.json();
}

// Add later: getSingle, update, delete...