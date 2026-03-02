'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Property } from '@/lib/api';

export default function AdminPropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`, {
        credentials: 'include',
        cache: 'no-store',
      });

      if (!res.ok) throw new Error('Failed to fetch properties');

      const data = await res.json();
      setProperties(data);
    } catch (err: any) {
      setError(err.message || 'Unable to load properties');
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to delete');

      toast.success('Property deleted');
      setProperties(properties.filter(p => p._id !== id));
    } catch (err) {
      toast.error('Failed to delete property');
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/properties/${id}/edit`);
  };

  const handleView = (id: string) => {
    router.push(`/properties/${id}`);
  };

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Full-width header section */}
      <div className="w-full border-b bg-card sticky top-0 z-10">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">All Properties</h1>
          <Button onClick={() => router.push('/admin/properties/new')}>
            Add New Property
          </Button>
        </div>
      </div>

      {/* Main content – full width table */}
      <div className="w-full overflow-x-auto">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {error ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-destructive mb-4">Error</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={fetchProperties}>Try Again</Button>
            </div>
          ) : loading ? (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-xl">No properties found yet.</p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => router.push('/admin/properties/new')}
              >
                Add Your First Property
              </Button>
            </div>
          ) : (
            <Table className="w-full border-collapse">
              <TableHeader className="bg-muted/50 sticky top-0">
                <TableRow>
                  <TableHead className="w-[30%]">Title</TableHead>
                  <TableHead className="w-[12%]">Type</TableHead>
                  <TableHead className="w-[14%]">Price (SBD)</TableHead>
                  <TableHead className="w-[12%]">Status</TableHead>
                  <TableHead className="w-[15%]">Location</TableHead>
                  <TableHead className="w-[17%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {properties.map((property) => (
                  <TableRow 
                    key={property._id} 
                    className="hover:bg-muted/50 transition-colors border-b last:border-0"
                  >
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{property.title}</span>
                        {property.featured && (
                          <Badge variant="default" className="mt-1 w-fit text-xs">Featured</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{property.type}</TableCell>
                    <TableCell className="font-medium">
                      ${property.price.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          property.status === 'for-sale' || property.status === 'for-rent'
                            ? 'default'
                            : 'secondary'
                        }
                        className="capitalize"
                      >
                        {property.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell className="text-right space-x-1 sm:space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(property._id)}
                        title="View on public site"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(property._id)}
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                        onClick={() => handleDelete(property._id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}