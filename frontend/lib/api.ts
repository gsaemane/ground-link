const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export function getImageUrl(path: string | undefined): string {
  if (!path) return '/placeholder-property.jpg';
  if (path.startsWith('http')) return path;
  return `${API_BASE}${path}`;
}

export interface Property {
  _id: string;
  title: string;
  description?: string;
  price: number;
  type: string;
  image?: string;
  images?: string[];                  // multiple images
  featured: boolean;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  address?: string;
  province?: string;
  bedrooms?: number;
  bathrooms?: number;
  landArea?: number;
  buildingArea?: number;
  status: 'for-sale' | 'for-rent' | 'sold' | 'rented' | 'under-offer' | 'withdrawn';
  yearBuilt?: number;
  features?: string[];
  videoUrl?: string;
  agent?: {
    name: string;
    phone: string;
    email: string;
  };
  views: number;
  createdAt: string;
  updatedAt: string;
}
// Authentication
export async function loginAdmin(credentials: any) {

  const url = `${API_BASE}/api/auth/login`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', 
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const data = await res.json();
    console.error("BACKEND RESPONDED WITH ERROR:", res.status);
    throw new Error(data.error || 'Login failed');
  }
  return res.json();
}

export async function fetchProperties(): Promise<Property[]> {
  const res = await fetch(`${API_BASE}/api/properties`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch properties');
  return res.json();
}

export async function fetchProperty(id: string): Promise<Property> {
  
  const res = await fetch(`${API_BASE}/api/properties/${id}`, { cache: 'no-store' });
  if (!res.ok){
    console.error(`Failed to fetch property with id ${id}. Status: ${res.status}`);
   throw new Error('Failed to fetch property');
    
  }
  return res.json();
}

export async function createProperty(formData: FormData): Promise<Property> {
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  if (!token) {
    console.error("No token found. Make sure NEXT_PUBLIC_AUTH_TOKEN is set in your .env.local file.");
    throw new Error('Unauthorized: No token found');
  }

  const res = await fetch(`${API_BASE}/api/properties`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Failed to create property:', errorText);
    throw new Error('Failed to create property');
  }
  return res.json();
}

export async function updateProperty(id: string, formData: FormData): Promise<Property> {
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  if (!token) {
    console.error("No token found. Make sure NEXT_PUBLIC_AUTH_TOKEN is set in your .env.local file.");
    throw new Error('Unauthorized: No token found');
  }

  const res = await fetch(`${API_BASE}/api/properties/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Failed to update property:', errorText);
    throw new Error('Failed to update property');
  }
  return res.json();
}

export async function deleteProperty(id: string): Promise<{ message: string }> {
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  if (!token) {
    console.error("No token found. Make sure NEXT_PUBLIC_AUTH_TOKEN is set in your .env.local file.");
    throw new Error('Unauthorized: No token found');
  }
  const res = await fetch(`${API_BASE}/api/properties/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to delete property');
  return res.json();
}