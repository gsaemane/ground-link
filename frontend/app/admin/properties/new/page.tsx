'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProperty } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export default function NewPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: 'house',
    featured: false,
    location: 'Honiara',
    province: 'Guadalcanal',
    address: '',
    bedrooms: '',
    bathrooms: '',
    landArea: '',
    buildingArea: '',
    status: 'for-sale',
    yearBuilt: '',
    features: '', // We'll split this string into an array on submit
    videoUrl: '',
    agentName: '',
    agentPhone: '',
    agentEmail: '',
    lat: '',
    lng: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    // 1. Append simple strings and numbers
    data.append('title', formData.title);
    data.append('price', formData.price); // Backend should cast to Number
    data.append('type', formData.type);
    data.append('status', formData.status);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('province', formData.province);
    data.append('address', formData.address);
    data.append('featured', String(formData.featured));

    // 2. Handle optional numeric fields (ensure they aren't empty strings)
    if (formData.bedrooms) data.append('bedrooms', formData.bedrooms);
    if (formData.bathrooms) data.append('bathrooms', formData.bathrooms);
    if (formData.landArea) data.append('landArea', formData.landArea);
    if (formData.buildingArea) data.append('buildingArea', formData.buildingArea);
    if (formData.yearBuilt) data.append('yearBuilt', formData.yearBuilt);

    // 3. Nested Objects (Send as JSON strings)
    data.append('coordinates', JSON.stringify({
      lat: formData.lat ? Number(formData.lat) : undefined,
      lng: formData.lng ? Number(formData.lng) : undefined,
    }));

    data.append('agent', JSON.stringify({
      name: formData.agentName,
      phone: formData.agentPhone,
      email: formData.agentEmail,
    }));

    // 4. Arrays
    const featuresArray = formData.features.split(',').map(f => f.trim()).filter(Boolean);
    data.append('features', JSON.stringify(featuresArray));

    // 5. Images
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput?.files) {
      Array.from(fileInput.files).forEach(file => data.append('images', file));
    }

    try {
      await createProperty(data);
      toast.success('Property created successfully');
      router.push('/admin/properties/all');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Add New Property</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">

        {/* Basic Info */}
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" required onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (SBD) *</Label>
          <Input id="price" name="price" type="number" required onChange={handleChange} />
        </div>

        {/* Selects */}
        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <Select onValueChange={v => setFormData(p => ({ ...p, type: v }))} defaultValue="house">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {['house', 'land', 'apartment', 'condo', 'commercial', 'villa', 'beachfront', 'other'].map(t => (
                <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select onValueChange={v => setFormData(p => ({ ...p, status: v as any }))} defaultValue="for-sale">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {['for-sale', 'for-rent', 'sold', 'rented', 'under-offer', 'withdrawn'].map(s => (
                <SelectItem key={s} value={s}>{s.replace('-', ' ').toUpperCase()}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Section */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 border-y py-4 my-2">
          <div className="space-y-2">
            <Label>Province</Label>
            <Input name="province" defaultValue="Guadalcanal" onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Location (City/Area)</Label>
            <Input name="location" defaultValue="Honiara" onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input name="address" onChange={handleChange} />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2">
          <Label>Bedrooms</Label>
          <Input name="bedrooms" type="number" onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label>Bathrooms</Label>
          <Input name="bathrooms" type="number" onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label>Land Area (sqm)</Label>
          <Input name="landArea" type="number" onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label>Building Area (sqm)</Label>
          <Input name="buildingArea" type="number" onChange={handleChange} />
        </div>

        {/* Media & Features */}
        <div className="md:col-span-2 space-y-2">
          <Label>Features (comma separated)</Label>
          <Input name="features" placeholder="Pool, Fenced, Solar, Aircon" onChange={handleChange} />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label>Images</Label>
          <Input id="image-upload" type="file" multiple accept="image/*" />
        </div>

        {/* Agent Info */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-muted p-4 rounded-lg">
          <div className="space-y-2">
            <Label>Agent Name</Label>
            <Input name="agentName" onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Agent Phone</Label>
            <Input name="agentPhone" onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Agent Email</Label>
            <Input name="agentEmail" type="email" onChange={handleChange} />
          </div>
        </div>

        <div className="md:col-span-2 flex items-center space-x-2">
          <Switch id="featured" checked={formData.featured} onCheckedChange={(v) => setFormData(p => ({ ...p, featured: v }))} />
          <Label htmlFor="featured">Mark as Featured Property</Label>
        </div>

        <div className="md:col-span-2 pt-4">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create Property'}
          </Button>
        </div>
      </form>
    </div>
  );
}