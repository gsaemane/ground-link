import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description?: string;
  price: number;
  type: string;
  image?: string;
  featured: boolean;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, trim: true, maxlength: 4000 },
    price: { type: Number, required: true, min: 0 },
    type: {
      type: String,
      required: true,
      enum: ['house', 'land', 'apartment', 'condo', 'commercial', 'villa', 'beachfront', 'other'],
      lowercase: true
    },
    image: { type: String, default: null },
    featured: { type: Boolean, default: false },
    location: { type: String, trim: true, default: 'Honiara' }
  },
  { timestamps: true }
);

const Property: Model<IProperty> = mongoose.model<IProperty>('Property', propertySchema);

export default Property;