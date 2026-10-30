/**
 * Corporate Catalog Seeder for RK Stone Corporation
 * Synchronized with official catalog (122 products across 16 categories)
 */
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// DNS fix for Windows SRV resolution
if (process.platform === 'win32') {
  try {
    const dns = require('dns');
    dns.setServers(['8.8.8.8', '8.8.4.4']);
  } catch (e) {}
}

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

const officialProducts = JSON.parse(fs.readFileSync(path.join(__dirname, '../clean_products.json'), 'utf8'));

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000
    });
    console.log("MongoDB Atlas connected successfully.");

    await Product.deleteMany({});
    console.log("Cleared existing catalog.");

    const inserted = await Product.insertMany(officialProducts);
    console.log(`Successfully seeded ${inserted.length} official products to MongoDB Atlas!`);

    await mongoose.disconnect();
    console.log("Seeding complete and disconnected.");
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

if (require.main === module) {
  seed();
}

module.exports = { officialProducts, seed };
