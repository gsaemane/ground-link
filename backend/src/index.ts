import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import upload from './multerConfig.js';
import Property, { IProperty } from './models/Property.js';  // ← added { IProperty }
import authRouter from './routes/auth.js';
import { authenticate, authorizeAdmin } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowed = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('→ MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });

app.use('/api/auth', authRouter);

// GET all properties (public)
app.get('/api/properties', async (req: Request, res: Response) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 }).lean();
    res.json(properties);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET single property (public)
app.get('/api/properties/:id', async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id).lean();
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST new property (protected)
app.post('/api/properties', authenticate, authorizeAdmin, upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { title, description, price, type, featured, location } = req.body;

    if (!title || !price || !type) {
      return res.status(400).json({ error: 'title, price and type are required' });
    }

    const propertyData: Partial<IProperty> = {
      title: title.trim(),
      description: description?.trim(),
      price: Number(price),
      type: type.toLowerCase().trim(),
      featured: featured === 'true' || featured === true,
      location: location?.trim() || 'Honiara'
    };

    if (req.file) {
      propertyData.image = `/uploads/${req.file.filename}`;
    }

    const newProperty = new Property(propertyData);
    await newProperty.save();

    res.status(201).json(newProperty);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update property (protected)
app.put('/api/properties/:id', authenticate, authorizeAdmin, upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { title, description, price, type, featured, location } = req.body;

    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (title !== undefined) property.title = title.trim();
    if (description !== undefined) property.description = description.trim() || undefined;
    if (price !== undefined) property.price = Number(price);
    if (type !== undefined) property.type = type.toLowerCase().trim();
    if (featured !== undefined) property.featured = featured === 'true' || featured === true;
    if (location !== undefined) property.location = location.trim() || 'Honiara';

    if (req.file) {
      property.image = `/uploads/${req.file.filename}`;
    }

    const updatedProperty = await property.save();
    res.status(200).json(updatedProperty);
  } catch (err: any) {
    console.error('Update error:', err);
    res.status(500).json({ error: err.message || 'Server error during update' });
  }
});

// DELETE property (protected)
app.delete('/api/properties/:id', authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (property.image) {
      const imagePath = path.join(__dirname, '..', property.image);
      import('fs/promises')
        .then(fs => fs.unlink(imagePath))
        .catch(err => console.warn('Could not delete old image file:', err.message));
    }

    res.status(200).json({
      message: 'Property deleted successfully',
      deletedId: req.params.id
    });
  } catch (err: any) {
    console.error('Delete error:', err);
    res.status(500).json({ error: err.message || 'Server error during deletion' });
  }
});

app.listen(PORT, () => {
  console.log(`Ground Link API running on http://localhost:${PORT}`);
});