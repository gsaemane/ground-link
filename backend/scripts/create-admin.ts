// scripts/create-admin.ts
import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../src/models/User.js';

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ email: 'admin@groundlink.sb' });
    if (existing) {
      console.log('Admin user already exists. Skipping creation.');
      process.exit(0);
    }

    const admin = new User({
      email: 'admin@groundlink.sb',
      password: 'Admin123!', // will be hashed automatically
      name: 'Geolynx Admin',
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@groundlink.sb');
    console.log('Password: Admin123!');
  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();