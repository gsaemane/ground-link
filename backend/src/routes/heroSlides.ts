import express from 'express';
import HeroSlide from '../models/HeroSlide.js';
import { put, del } from '@vercel/blob';
import multer from 'multer';
import { authenticate, authorizeAdmin } from '../middleware/auth.js'; 

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// GET all active slides (public)
router.get('/', async (req, res) => {
  try {
    const slides = await HeroSlide.find().sort({ order: 1 });
    res.json(slides);
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new slide (admin only)
router.post('/', authenticate, authorizeAdmin, upload.single('image'), async (req: any, res: any) => {
  try {
    const { title, subtitle, order, isActive } = req.body;
    let imageUrl = '';

    if (req.file) {
      const blob = await put(`hero/${Date.now()}-${req.file.originalname}`, req.file.buffer, {
        access: 'public',
      });
      imageUrl = blob.url;
    } else {
      return res.status(400).json({ message: 'Image file is required' });
    }

    let assignedOrder = order !== undefined ? Number(order) : await HeroSlide.countDocuments();

    const newSlide = new HeroSlide({
      imageUrl,
      title: title || '',
      subtitle: subtitle || '',
      order: assignedOrder,
      isActive: isActive === 'true' || isActive === true
    });

    const savedSlide = await newSlide.save();
    res.status(201).json(savedSlide);
  } catch (error) {
    console.error('Error creating hero slide:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update a slide (admin only)
router.put('/:id', authenticate, authorizeAdmin, upload.single('image'), async (req: any, res: any) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);
    if (!slide) return res.status(404).json({ message: 'Slide not found' });

    let imageUrl = slide.imageUrl;

    if (req.file) {
      // Delete old image
      if (slide.imageUrl) {
         await del(slide.imageUrl).catch(err => console.warn('Failed to delete blob:', err));
      }
      // Upload new image
      const blob = await put(`hero/${Date.now()}-${req.file.originalname}`, req.file.buffer, {
        access: 'public',
      });
      imageUrl = blob.url;
    }

    const updates: any = { imageUrl };
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.subtitle !== undefined) updates.subtitle = req.body.subtitle;
    if (req.body.order !== undefined) updates.order = Number(req.body.order);
    if (req.body.isActive !== undefined) updates.isActive = req.body.isActive === 'true' || req.body.isActive === true;

    const updatedSlide = await HeroSlide.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );
    res.json(updatedSlide);
  } catch (error) {
    console.error('Error updating hero slide:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a slide (admin only)
router.delete('/:id', authenticate, authorizeAdmin, async (req: any, res: any) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);
    if (!slide) return res.status(404).json({ message: 'Slide not found' });

    // Delete image from Vercel Blob
    if (slide.imageUrl) {
      await del(slide.imageUrl).catch(err => console.warn('Failed to delete blob:', err));
    }

    await HeroSlide.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slide deleted successfully' });
  } catch (error) {
    console.error('Error deleting hero slide:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
