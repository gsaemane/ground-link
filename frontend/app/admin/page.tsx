'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Eye, Pencil, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { Property } from '@/lib/api';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    forSale: 0,
    forRent: 0,
  });
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`, {
        credentials: 'include',
        cache: 'no-store',
      });

      if (!res.ok) throw new Error('Failed to fetch data');

      const properties: Property[] = await res.json();

      // Calculate stats
      setStats({
        total: properties.length,
        featured: properties.filter(p => p.featured).length,
        forSale: properties.filter(p => p.status === 'for-sale').length,
        forRent: properties.filter(p => p.status === 'for-rent').length,
      });

      // Show latest 5 properties
      setRecentProperties(properties.slice(0, 5));
    } catch (err) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-350 mx-auto px-6 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Welcome back to Ground Link Admin
              </p>
            </div>
            <Button onClick={() => router.push('/admin/properties/new')} size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Add New Property
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-350 mx-auto px-6 py-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="h-10 w-20" /> : <div className="text-4xl font-bold">{stats.total}</div>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Featured</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="h-10 w-20" /> : <div className="text-4xl font-bold text-primary">{stats.featured}</div>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">For Sale</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="h-10 w-20" /> : <div className="text-4xl font-bold">{stats.forSale}</div>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">For Rent</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="h-10 w-20" /> : <div className="text-4xl font-bold">{stats.forRent}</div>}
            </CardContent>
          </Card>
        </div>

        {/* Recent Properties */}
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Properties</CardTitle>
            <Button variant="outline" onClick={() => router.push('/admin/properties')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : recentProperties.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No properties yet</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProperties.map((prop) => (
                    <TableRow key={prop._id}>
                      <TableCell className="font-medium">{prop.title}</TableCell>
                      <TableCell className="capitalize">{prop.type}</TableCell>
                      <TableCell>${prop.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {prop.status.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/properties/${prop._id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/admin/properties/${prop._id}/edit`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}