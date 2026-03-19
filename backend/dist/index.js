import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { upload } from './multerConfig.js';
import Property from './models/Property.js';
import authRouter from './routes/auth.js';
import { authenticate, authorizeAdmin } from './middleware/auth.js';
import fs from 'fs/promises';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 4000;
// Middleware
app.use(cors({
    origin: (origin, callback) => {
        const allowed = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
        if (!origin || allowed.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('→ MongoDB connected'))
    .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
});
app.use('/api/auth', authRouter);
// GET all properties (public)
app.get('/api/properties', async (req, res) => {
    try {
        const properties = await Property.find().sort({ createdAt: -1 }).lean();
        res.json(properties);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// GET single property (public)
app.get('/api/properties/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).lean();
        if (!property)
            return res.status(404).json({ error: 'Property not found' });
        res.json(property);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// POST new property (protected)
app.post('/api/properties', authenticate, authorizeAdmin, upload.array('images', 10), async (req, res) => {
    try {
        const { title, description, price, type, featured, location, province, address, lat, lng, bedrooms, bathrooms, landArea, buildingArea, status, yearBuilt, features, videoUrl, agentName, agentPhone, agentEmail } = req.body;
        if (!title || !price || !type) {
            return res.status(400).json({ error: 'title, price and type are required' });
        }
        const propertyData = {
            title: title.trim(),
            description: description?.trim() || undefined,
            price: Number(price),
            type: type.toLowerCase().trim(),
            featured: featured === 'true' || featured === true,
            location: location?.trim() || 'Honiara',
            images: []
        };
        // Handle multiple images
        if (req.files && Array.isArray(req.files)) {
            propertyData.images = req.files.map(file => `/uploads/${file.filename}`);
        }
        // Additional fields
        if (province)
            propertyData.province = province.trim();
        if (address)
            propertyData.address = address.trim();
        if (lat && lng) {
            propertyData.coordinates = { lat: Number(lat), lng: Number(lng) };
        }
        if (bedrooms)
            propertyData.bedrooms = Number(bedrooms);
        if (bathrooms)
            propertyData.bathrooms = Number(bathrooms);
        if (landArea)
            propertyData.landArea = Number(landArea);
        if (buildingArea)
            propertyData.buildingArea = Number(buildingArea);
        if (status)
            propertyData.status = status.toLowerCase().trim();
        if (yearBuilt)
            propertyData.yearBuilt = Number(yearBuilt);
        if (features) {
            propertyData.features = features.split(',').map((f) => f.trim()).filter(Boolean);
        }
        if (videoUrl)
            propertyData.videoUrl = videoUrl.trim();
        if (agentName || agentPhone || agentEmail) {
            propertyData.agent = {
                name: agentName?.trim() || '',
                phone: agentPhone?.trim() || '',
                email: agentEmail?.trim() || '',
            };
        }
        const newProperty = new Property(propertyData);
        await newProperty.save();
        res.status(201).json(newProperty);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// PUT update property (protected)
app.put('/api/properties/:id', authenticate, authorizeAdmin, upload.array('images', 10), async (req, res) => {
    try {
        const { title, description, price, type, featured, location, province, address, lat, lng, bedrooms, bathrooms, landArea, buildingArea, status, yearBuilt, features, videoUrl, agentName, agentPhone, agentEmail, deletedImages } = req.body;
        const property = await Property.findById(req.params.id);
        if (!property)
            return res.status(404).json({ error: 'Property not found' });
        if (title !== undefined)
            property.title = title.trim();
        if (description !== undefined)
            property.description = description.trim() || undefined;
        if (price !== undefined)
            property.price = Number(price);
        if (type !== undefined)
            property.type = type.toLowerCase().trim();
        if (featured !== undefined)
            property.featured = featured === 'true' || featured === true;
        if (location !== undefined)
            property.location = location.trim() || 'Honiara';
        // Handle additional images
        if (req.files && Array.isArray(req.files)) {
            const newImages = req.files.map(file => `/uploads/${file.filename}`);
            property.images = [...(property.images || []), ...newImages];
        }
        // Additional fields
        if (province !== undefined)
            property.province = province.trim();
        if (address !== undefined)
            property.address = address.trim();
        if (lat !== undefined && lng !== undefined) {
            property.coordinates = { lat: Number(lat), lng: Number(lng) };
        }
        if (bedrooms !== undefined)
            property.bedrooms = Number(bedrooms);
        if (bathrooms !== undefined)
            property.bathrooms = Number(bathrooms);
        if (landArea !== undefined)
            property.landArea = Number(landArea);
        if (buildingArea !== undefined)
            property.buildingArea = Number(buildingArea);
        if (status !== undefined)
            property.status = status.toLowerCase().trim();
        if (yearBuilt !== undefined)
            property.yearBuilt = Number(yearBuilt);
        if (features !== undefined) {
            property.features = features.split(',').map((f) => f.trim()).filter(Boolean);
        }
        if (videoUrl !== undefined)
            property.videoUrl = videoUrl.trim();
        if (agentName !== undefined || agentPhone !== undefined || agentEmail !== undefined) {
            property.agent = {
                name: agentName?.trim() || property.agent?.name || '',
                phone: agentPhone?.trim() || property.agent?.phone || '',
                email: agentEmail?.trim() || property.agent?.email || '',
            };
        }
        // Handle image deletions
        if (deletedImages) {
            const imagesToDelete = deletedImages.split(',').map((img) => img.trim());
            for (const imgPath of imagesToDelete) {
                // Remove from array
                property.images = property.images?.filter(img => img !== imgPath) || [];
                // Delete file from disk
                const fullPath = path.join(__dirname, '../', imgPath);
                await fs.unlink(fullPath).catch(err => console.warn('Failed to delete image:', err));
            }
        }
        const updatedProperty = await property.save();
        res.status(200).json(updatedProperty);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// DELETE property (protected)
app.delete('/api/properties/:id', authenticate, authorizeAdmin, async (req, res) => {
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
    }
    catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ error: err.message || 'Server error during deletion' });
    }
});
app.post('/upload', upload.array('photos'), (req, res) => {
    // Use Type Casting to tell TS that 'files' exists here
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
    }
    const filePaths = files.map((file) => file.path);
    res.status(200).json({ paths: filePaths });
});
app.listen(PORT, () => {
    console.log(`Ground Link API running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map