const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameHi: { type: String, default: '' },
  code: { type: String, default: '' },
  price: { type: Number, required: true },
  priceUnit: { type: String, default: 'piece' },
  image: { type: String, default: '' },
  category: { type: String, required: true },
  stoneType: { type: String, default: '' },
  description: { type: String, default: '' },
  descriptionHi: { type: String, default: '' },
  features: { type: [String], default: [] },
  dimensions: { type: String, default: '' },
  leadTime: { type: String, default: '20-25 Days' },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('Connected to MongoDB Atlas successfully!');

    const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../clean_products.json'), 'utf8'));
    console.log(`Preparing to seed ${products.length} products...`);

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing product catalog.');

    // Insert all 122 products
    const inserted = await Product.insertMany(products);
    console.log(`Successfully inserted ${inserted.length} products into MongoDB Atlas!`);

    const count = await Product.countDocuments();
    console.log('Total products currently in MongoDB Atlas:', count);

    await mongoose.disconnect();
    console.log('Done!');
  } catch (err) {
    console.error('Error seeding DB:', err);
    process.exit(1);
  }
}

seed();

