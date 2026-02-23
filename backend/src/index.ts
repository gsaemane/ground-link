import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import upload from './multerConfig.js';
import Property from './models/Property.js';
import authRouter from './routes/auth.js';
import { authenticate, authorizeAdmin } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const PORT = process.env.PORT || 4000;

// ... rest of your middleware, cors, static, mongoose.connect ...

app.use('/api/auth', authRouter);

//GET all properties
app.get('/api/properties', async (req: Request, res: Response) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 }).lean();
    res.json(properties);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET single property
app.get('/api/properties/:id', async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id).lean();
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


// POST new property
app.post('/api/properties', upload.single('image'), async (req: Request, res: Response) => {
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

// PUT update property
app.put('/api/properties/:id', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { title, description, price, type, featured, location } = req.body;

    // Find the property first
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Update fields only if provided in request
    if (title !== undefined) property.title = title.trim();
    if (description !== undefined) property.description = description.trim() || undefined;
    if (price !== undefined) property.price = Number(price);
    if (type !== undefined) {
      property.type = type.toLowerCase().trim();
      // Optional: you can add validation here if you want to enforce enum
    }
    if (featured !== undefined) property.featured = featured === 'true' || featured === true;
    if (location !== undefined) property.location = location.trim() || 'Honiara';

    // Handle image replacement (optional)
    if (req.file) {
      // You could delete old image here if you want (requires fs.unlink)
      property.image = `/uploads/${req.file.filename}`;
    }

    // Save updated document
    const updatedProperty = await property.save();

    res.status(200).json(updatedProperty);
  } catch (err: any) {
    console.error('Update error:', err);
    res.status(500).json({ error: err.message || 'Server error during update' });
  }
});

// DELETE /api/properties/:id
app.delete('/api/properties/:id', async (req: Request, res: Response) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Optional: delete image file from disk
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