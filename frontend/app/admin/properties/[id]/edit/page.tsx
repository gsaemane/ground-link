'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchProperty, updateProperty, Property } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type FormValues = Omit<Property, '_id' | 'createdAt' | 'updatedAt' | 'views' | 'agent' | 'features'> & {
  lat?: number;
  lng?: number;
  features: string;
};

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<Property | null>(null);
  const { register, handleSubmit, reset, setValue, formState: { isSubmitting, errors } } = useForm<FormValues>();

  useEffect(() => {
    if (!id) return;

    const loadProperty = async () => {
      try {
        setLoading(true);
        const data = await fetchProperty(id);
        setProperty(data);
        // Populate form with fetched data
        reset({
          ...data,
          lat: data.coordinates?.lat,
          lng: data.coordinates?.lng,
          features: data.features?.join(', ') || '',
        });
      } catch (error) {
        toast.error('Failed to load property data.');
        router.push('/admin/properties/all');
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id, reset, router]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();

    // Simplified: append all form data. For file uploads, you'd handle `data.images` differently.
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'features') {
            const featuresArray = String(value).split(',').map(f => f.trim()).filter(Boolean);
            formData.append(key, JSON.stringify(featuresArray));
        } else if (value instanceof FileList) {
            for (let i = 0; i < value.length; i++) {
                formData.append('images', value[i]);
            }
        } else if (key !== 'images') {
            formData.append(key, String(value));
        }
      }
    });

    try {
      await updateProperty(id, formData);
      toast.success('Property updated successfully!');
      router.push(`/admin/properties/${id}`);
    } catch (error) {
      toast.error('Failed to update property. Please try again.');
      console.error(error);
    }
  };

  if (loading) {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <Skeleton className="h-8 w-48 mb-6" />
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent className="space-y-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                     <Skeleton className="h-12 w-32" />
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold ml-4">Edit Property</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Editing: {property?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title', { required: 'Title is required' })} />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <Label htmlFor="price">Price (SBD)</Label>
                <Input id="price" type="number" {...register('price', { required: true, valueAsNumber: true })} />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register('description')} rows={5} />
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="location">Location / Area</Label>
                <Input id="location" {...register('location', { required: 'Location is required' })} />
              </div>
              <div>
                <Label htmlFor="province">Province</Label>
                <Input id="province" {...register('province')} />
              </div>
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="lat">Latitude</Label>
                <Input id="lat" type="number" step="any" {...register('lat', { valueAsNumber: true })} />
              </div>
              <div>
                <Label htmlFor="lng">Longitude</Label>
                <Input id="lng" type="number" step="any" {...register('lng', { valueAsNumber: true })} />
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input id="bedrooms" type="number" {...register('bedrooms', { valueAsNumber: true })} />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input id="bathrooms" type="number" {...register('bathrooms', { valueAsNumber: true })} />
              </div>
              <div>
                <Label htmlFor="landArea">Land Area (sqm)</Label>
                <Input id="landArea" type="number" {...register('landArea', { valueAsNumber: true })} />
              </div>
              <div>
                <Label htmlFor="yearBuilt">Year Built</Label>
                <Input id="yearBuilt" type="number" {...register('yearBuilt', { valueAsNumber: true })} />
              </div>
            </div>

            {/* Type and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="type">Property Type</Label>
                    <Select onValueChange={(value) => setValue('type', value)} defaultValue={property?.type}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="land">Land</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="status">Status</Label>
                    <Select onValueChange={(value) => setValue('status', value as Property['status'])} defaultValue={property?.status}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
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
            </div>

            <div>
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Input id="features" {...register('features')} />
              <p className="text-sm text-muted-foreground mt-1">e.g. Swimming Pool, Fenced, Ocean View</p>
            </div>

            {/* Image Upload - Placeholder */}
            <div>
                <Label htmlFor="images">Upload New Images</Label>
                <Input id="images" type="file" multiple {...register('images')} />
                <p className="text-sm text-muted-foreground mt-1">
                    Uploading new images will replace existing ones.
                </p>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
