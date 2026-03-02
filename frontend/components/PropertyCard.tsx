import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, DollarSign, Eye } from "lucide-react";
import { Property } from "@/lib/api";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const mainImage = property.image || property.images?.[0] || "/placeholder-property.jpg";

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={`${API_BASE}${mainImage}`}
          alt={property.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        {property.featured && (
          <Badge className="absolute top-4 left-4 bg-primary">Featured</Badge>
        )}
        <Badge variant="secondary" className="absolute top-4 right-4 capitalize">
          {property.status.replace('-', ' ')}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-xl font-semibold line-clamp-1">{property.title}</h3>
        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
          <MapPin className="h-4 w-4" />
          {property.location} {property.province && `• ${property.province}`}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary flex items-center">
            <DollarSign className="h-6 w-6 mr-1" />
            {property.price.toLocaleString()}
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <Eye className="h-4 w-4 mr-1" />
            {property.views} views
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
          {property.bedrooms !== undefined && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.bedrooms} beds
            </div>
          )}
          {property.bathrooms !== undefined && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.bathrooms} baths
            </div>
          )}
          {property.landArea && (
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              {property.landArea} m²
            </div>
          )}
        </div>

        {property.features && property.features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {property.features.slice(0, 4).map((feat, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {feat}
              </Badge>
            ))}
            {property.features.length > 4 && (
              <Badge variant="outline" className="text-xs">+{property.features.length - 4}</Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
}