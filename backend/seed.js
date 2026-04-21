const mongoose = require('mongoose');
const path = require('path');
const Product = require('./models/Product');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const products = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip, titanium design, 48MP camera',
    price: 99999,
    image: '/images/products/iphone-15-pro.svg',
    category: 'electronics',
    stock: 10,
    averageRating: 4.8,
    ratingCount: 124,
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Flagship Android phone with S Pen, 200MP camera',
    price: 89999,
    image: '/images/products/galaxy-s24-ultra.svg',
    category: 'electronics',
    stock: 15,
    averageRating: 4.7,
    ratingCount: 98,
  },
  {
    name: 'MacBook Pro M3',
    description: '16-inch MacBook Pro with M3 Max chip, Liquid Retina XDR display',
    price: 249999,
    image: '/images/products/macbook-pro-m3.svg',
    category: 'electronics',
    stock: 5,
    averageRating: 4.9,
    ratingCount: 67,
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancellation, 30hr battery',
    price: 29999,
    image: '/images/products/sony-headphones.svg',
    category: 'electronics',
    stock: 20,
    averageRating: 4.6,
    ratingCount: 156,
  },
  {
    name: 'Nike Air Jordan 1',
    description: 'Iconic high-top sneakers, premium leather',
    price: 12999,
    image: '/images/products/air-jordan.svg',
    category: 'clothing',
    stock: 25,
    averageRating: 4.5,
    ratingCount: 89,
  },
  {
    name: 'Adidas Ultraboost 23',
    description: 'Running shoes with Boost cushioning',
    price: 14999,
    image: '/images/products/ultraboost.svg',
    category: 'clothing',
    stock: 30,
    averageRating: 4.4,
    ratingCount: 112,
  },
  {
    name: 'Gucci Leather Jacket',
    description: 'Premium leather biker jacket',
    price: 89999,
    image: '/images/products/leather-jacket.svg',
    category: 'clothing',
    stock: 8,
    averageRating: 4.7,
    ratingCount: 34,
  },
  {
    name: 'Dell XPS 13 Laptop',
    description: 'Ultra-portable laptop with 13.4-inch InfinityEdge display',
    price: 109999,
    image: '/images/products/dell-xps-13.svg',
    category: 'electronics',
    stock: 12,
    averageRating: 4.6,
    ratingCount: 78,
  },
  {
    name: 'Kindle Paperwhite',
    description: 'Waterproof e-reader with 6.8-inch display',
    price: 13999,
    image: '/images/products/kindle-paperwhite.svg',
    category: 'electronics',
    stock: 50,
    averageRating: 4.8,
    ratingCount: 245,
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip TPE yoga mat, 6mm thick',
    price: 2499,
    image: '/images/products/yoga-mat.svg',
    category: 'fitness',
    stock: 40,
    averageRating: 4.3,
    ratingCount: 67,
  },
  {
    name: 'Apple Watch Series 9',
    description: 'Advanced health tracking, S9 chip',
    price: 44999,
    image: '/images/products/apple-watch.svg',
    category: 'electronics',
    stock: 18,
    averageRating: 4.7,
    ratingCount: 103,
  },
  {
    name: 'Ray-Ban Wayfarer Sunglasses',
    description: 'Classic style polarized lenses',
    price: 8999,
    image: '/images/products/wayfarer.svg',
    category: 'accessories',
    stock: 35,
    averageRating: 4.5,
    ratingCount: 76,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
}

seedDatabase();
