import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/lib/api";
import { MapPin, DollarSign } from "lucide-react"; // install lucide-react if not already: npm i lucide-react

export default function PropertyCard({ property }: { property: Property }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-border/60 group">
      <div className="relative aspect-[4/3] overflow-hidden">
        {property.image ? (
          <img
            src={`${API_BASE}${property.image}`}
            alt={property.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="bg-muted flex items-center justify-center h-full text-muted-foreground">
            No Image
          </div>
        )}
        {property.featured && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Featured</Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-xl font-semibold line-clamp-1">{property.title}</h3>
      </CardHeader>

      <CardContent className="space-y-3 pb-4">
        <div className="flex items-center text-2xl font-bold text-primary">
          <DollarSign className="h-6 w-6 mr-1" />
          {property.price.toLocaleString()}
        </div>

        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="capitalize">{property.type}</span>
        </div>

        {property.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {property.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
}