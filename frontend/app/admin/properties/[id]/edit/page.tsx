'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { fetchProperty, updateProperty, Property } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

export default function EditPropertyPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]); // Existing images from property
  const [deletedImages, setDeletedImages] = useState<string[]>([]); // Deleted images from property

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: 'house',
    featured: false,
    location: '',
    province: '',
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

  // Load existing property
  useEffect(() => {
    const loadProperty = async () => {
      try {
        const data: Property = await fetchProperty(id);

        setFormData({
          title: data.title,
          description: data.description || '',
          price: data.price.toString(),
          type: data.type,
          featured: data.featured,
          location: data.location || '',
          province: data.province || '',
          address: data.address || '',
          lat: data.coordinates?.lat?.toString() || '',
          lng: data.coordinates?.lng?.toString() || '',
          bedrooms: data.bedrooms?.toString() || '',
          bathrooms: data.bathrooms?.toString() || '',
          landArea: data.landArea?.toString() || '',
          buildingArea: data.buildingArea?.toString() || '',
          status: data.status,
          yearBuilt: data.yearBuilt?.toString() || '',
          features: data.features?.join(', ') || '',
          videoUrl: data.videoUrl || '',
          agentName: data.agent?.name || '',
          agentPhone: data.agent?.phone || '',
          agentEmail: data.agent?.email || '',
        });

        // Set existing images for gallery
        setExistingImages(data.images || []);
      } catch (err) {
        toast.error('Failed to load property');
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

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

  const handleDeleteImage = (imagePath: string) => {
    // Remove from existing images
    setExistingImages(existingImages.filter(img => img !== imagePath));
    // Add to deleted list
    setDeletedImages([...deletedImages, imagePath]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== '' && value !== undefined) {
        data.append(key, value.toString());
      }
    });

    imageFiles.forEach(file => {
      data.append('images', file);
    });

    // Append deleted images array
    if (deletedImages.length > 0) {
      data.append('deletedImages', deletedImages.join(','));
    }

    try {
      await updateProperty(id, data);
      toast.success('Property updated successfully!');
      router.push('/admin/properties/all');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update property');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-lg">Loading property data...</div>;

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Edit Property</h1>
        <Button variant="outline" onClick={() => router.back()}>
          ← Back to List
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Basic Information */}
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
                  <SelectItem value="other">Other</SelectItem>
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
                  <SelectItem value="withdrawn">Withdrawn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader><CardTitle>Description</CardTitle></CardHeader>
          <CardContent>
            <Textarea name="description" rows={6} value={formData.description} onChange={handleChange} />
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader><CardTitle>Location</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><Label>Location</Label><Input name="location" value={formData.location} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>Province</Label><Input name="province" value={formData.province} onChange={handleChange} /></div>
            <div className="md:col-span-2 space-y-2"><Label>Full Address</Label><Input name="address" value={formData.address} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>Latitude</Label><Input name="lat" type="number" step="any" value={formData.lat} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>Longitude</Label><Input name="lng" type="number" step="any" value={formData.lng} onChange={handleChange} /></div>
          </CardContent>
        </Card>

        {/* Specs */}
        <Card>
          <CardHeader><CardTitle>Property Specifications</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2"><Label>Bedrooms</Label><Input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>Bathrooms</Label><Input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>Land Area (sqm)</Label><Input name="landArea" type="number" value={formData.landArea} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>Building Area (sqm)</Label><Input name="buildingArea" type="number" value={formData.buildingArea} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>Year Built</Label><Input name="yearBuilt" type="number" value={formData.yearBuilt} onChange={handleChange} /></div>
          </CardContent>
        </Card>

        {/* Features & Media */}
        <Card>
          <CardHeader><CardTitle>Features & Media</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Features (comma separated)</Label>
              <Input name="features" value={formData.features} onChange={handleChange} placeholder="ocean view, generator, solar, fenced" />
            </div>
            <div className="space-y-2">
              <Label>Video URL (optional)</Label>
              <Input name="videoUrl" value={formData.videoUrl} onChange={handleChange} />
            </div>
          </CardContent>
        </Card>

        {/* Agent */}
        <Card>
          <CardHeader><CardTitle>Agent Information</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2"><Label>Agent Name</Label><Input name="agentName" value={formData.agentName} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>Agent Phone</Label><Input name="agentPhone" value={formData.agentPhone} onChange={handleChange} /></div>
            <div className="space-y-2"><Label>Agent Email</Label><Input name="agentEmail" type="email" value={formData.agentEmail} onChange={handleChange} /></div>
          </CardContent>
        </Card>

        {/* Existing Images Gallery */}
        <Card>
          <CardHeader><CardTitle>Existing Images</CardTitle></CardHeader>
          <CardContent>
            {existingImages.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {existingImages.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border shadow-sm">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${img}`}
                      alt={`Property image ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
                      onClick={() => handleDeleteImage(img)}
                      title="Delete image"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No images uploaded yet</p>
            )}
          </CardContent>
        </Card>

        {/* New Image Upload */}
        <Card>
          <CardHeader><CardTitle>Upload New Images</CardTitle></CardHeader>
          <CardContent>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Add up to 10 new images. They will be appended to existing ones.
            </p>
            {imageFiles.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {imageFiles.map((file, i) => (
                  <div key={i} className="text-xs bg-muted px-3 py-1 rounded-full">
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Featured Toggle */}
        <div className="flex items-center gap-3">
          <Switch checked={formData.featured} onCheckedChange={handleSwitch} />
          <Label className="text-base font-medium">Mark as Featured Property</Label>
        </div>

        <Button type="submit" disabled={submitting} size="lg" className="w-full md:w-auto">
          {submitting ? 'Updating Property...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
}