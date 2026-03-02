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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function NewPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: 'house',
    featured: false,
    location: 'Honiara',
    province: 'Guadalcanal',
    address: '',
    lat: '',
    lng: '',
    bedrooms: '',
    bathrooms: '',
    landArea: '',
    buildingArea: '',
    status: 'for-sale',
    yearBuilt: '',
    features: '',
    videoUrl: '',
    agentName: '',
    agentPhone: '',
    agentEmail: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitch = (checked: boolean) => {
    setFormData(prev => ({ ...prev, featured: checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== '' && value !== undefined) {
        data.append(key, value.toString());
      }
    });

    // Multiple images
    imageFiles.forEach(file => {
      data.append('images', file);
    });

    try {
      await createProperty(data);
      toast.success('Property created successfully!');
      router.push('/admin/properties/all');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Add New Property</h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        <Card>
          <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input name="title" required value={formData.title} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Price (SBD) *</Label>
              <Input name="price" type="number" required value={formData.price} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Type *</Label>
              <Select value={formData.type} onValueChange={(v) => handleSelectChange('type', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="beachfront">Beachfront</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status *</Label>
              <Select value={formData.status} onValueChange={(v) => handleSelectChange('status', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="for-sale">For Sale</SelectItem>
                  <SelectItem value="for-rent">For Rent</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                  <SelectItem value="under-offer">Under Offer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Description</CardTitle></CardHeader>
          <CardContent>
            <Textarea name="description" rows={6} value={formData.description} onChange={handleChange} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Location</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input name="location" value={formData.location} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Province</Label>
              <Input name="province" value={formData.province} onChange={handleChange} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Full Address</Label>
              <Input name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Latitude</Label>
              <Input name="lat" type="number" step="any" value={formData.lat} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Longitude</Label>
              <Input name="lng" type="number" step="any" value={formData.lng} onChange={handleChange} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Specs</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2"><Label>Bedrooms</Label><Input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>Bathrooms</Label><Input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>Land Area (sqm)</Label><Input name="landArea" type="number" value={formData.landArea} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>Building Area (sqm)</Label><Input name="buildingArea" type="number" value={formData.buildingArea} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>Year Built</Label><Input name="yearBuilt" type="number" value={formData.yearBuilt} onChange={handleChange} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Features & Media</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Features (comma separated)</Label>
              <Input name="features" value={formData.features} onChange={handleChange} placeholder="ocean view, generator, solar" />
            </div>
            <div className="space-y-2">
              <Label>Video URL</Label>
              <Input name="videoUrl" value={formData.videoUrl} onChange={handleChange} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Agent Info</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2"><Label>Agent Name</Label><Input name="agentName" value={formData.agentName} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>Agent Phone</Label><Input name="agentPhone" value={formData.agentPhone} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>Agent Email</Label><Input name="agentEmail" value={formData.agentEmail} onChange={handleChange} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Images (Multiple)</CardTitle></CardHeader>
          <CardContent>
            <Input type="file" multiple accept="image/*" onChange={handleImageChange} />
            <p className="text-xs text-muted-foreground mt-2">You can select up to 10 images</p>
            {imageFiles.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {imageFiles.map((file, i) => (
                  <div key={i} className="text-xs bg-muted px-3 py-1 rounded">{file.name}</div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Switch checked={formData.featured} onCheckedChange={handleSwitch} />
          <Label>Featured Property</Label>
        </div>

        <Button type="submit" disabled={loading} size="lg" className="w-full">
          {loading ? 'Creating Property...' : 'Create Property'}
        </Button>
      </form>
    </div>
  );
}