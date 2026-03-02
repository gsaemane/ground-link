import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description?: string;
  price: number;
  type: string;
  image?: string;
  images?: string[];                    // multiple photos
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
  landArea?: number;                    // in sqm or acres – add unit field if needed
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
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema = new Schema<IProperty>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      required: true,
      enum: ['house', 'land', 'apartment', 'condo', 'commercial', 'villa', 'beachfront', 'other'],
      lowercase: true,
    },
    image: { type: String, default: null },           // main/featured image
    images: [{ type: String }],                       // additional photos
    featured: { type: Boolean, default: false },
    location: { type: String, trim: true, default: 'Honiara' },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    address: { type: String, trim: true },
    province: { type: String, trim: true, default: 'Guadalcanal' },
    bedrooms: { type: Number, min: 0 },
    bathrooms: { type: Number, min: 0 },
    landArea: { type: Number, min: 0 },               // sqm
    buildingArea: { type: Number, min: 0 },
    status: {
      type: String,
      enum: ['for-sale', 'for-rent', 'sold', 'rented', 'under-offer', 'withdrawn'],
      default: 'for-sale',
      lowercase: true,
    },
    yearBuilt: { type: Number, min: 1900 },
    features: [{ type: String }],
    videoUrl: { type: String },
    agent: {
      name: { type: String, trim: true },
      phone: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true },
    },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Property: Model<IProperty> = mongoose.model<IProperty>('Property', propertySchema);

export default Property;