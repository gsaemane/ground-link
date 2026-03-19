import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, ChevronRight } from "lucide-react";
import { Property, getImageUrl } from "@/lib/api";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.image || property.images?.[0];
  const isLand = property.type.toLowerCase() === 'land';

  return (
    <Link href={`/properties/${property._id}`} className="group block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-[2rem]">
      <Card className="border-none shadow-none bg-transparent overflow-visible">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-sm mb-4 border border-black/5">
          <img
            src={getImageUrl(mainImage)}
            alt={property.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle gradient overlay for badges */}
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            {property.featured && (
              <Badge className="bg-white text-black font-bold border-none shadow-sm px-3 py-1 text-xs tracking-wider">
                FEATURED
              </Badge>
            )}
            <Badge className="bg-primary/90 text-white font-bold border-none shadow-sm px-3 py-1 text-xs tracking-wider uppercase backdrop-blur-sm">
              {property.status.replace('-', ' ')}
            </Badge>
          </div>

          <div className="absolute bottom-4 right-4">
             <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 shadow-sm text-primary">
                <ChevronRight className="h-5 w-5" />
             </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-0 space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">
                {property.title}
              </h3>
              <p className="text-[15px] font-medium text-slate-500 truncate flex items-center gap-1 mt-0.5">
                {property.location}{property.province ? `, ${property.province}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              SBD {property.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[15px] font-medium text-slate-600 mt-2">
            {!isLand && property.bedrooms !== undefined && (
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1.5 opacity-70" />
                {property.bedrooms} Beds
              </div>
            )}
            {!isLand && property.bathrooms !== undefined && (
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1.5 opacity-70" />
                {property.bathrooms} Baths
              </div>
            )}
            {property.landArea !== undefined && property.landArea > 0 && (
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1.5 opacity-70" />
                {property.landArea} m²
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}