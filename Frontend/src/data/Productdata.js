// Import images from assets
import appleiphone from '../assets/appleiphone.jpg';
import s24 from '../assets/s24.jpg';
import img1 from "../assets/ph1.webp";
import img2 from "../assets/p2.webp";
import img3 from "../assets/p3.webp";

/**
 * Product data with imported images from assets folder
 * These images are bundled with the build and optimized by Vite
 */
const Mobilephones = [
  // PHONE CATEGORY
  {
    id: 1,
    name: 'Apple iPhone 14',
    price: 69999,
    originalPrice: 87499,
    rating: 4.6,
    reviews: 2456,
    image: appleiphone,
    description: 'Powerful performance with A15 Bionic chip',
    discount: 20,
    badges: ['Free Delivery', 'Easy Return', 'Assured'],
    category: 'Phone',
    inStock: true,
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    price: 62999,
    originalPrice: 79999,
    rating: 4.5,
    reviews: 1834,
    image: s24,
    description: 'Flagship smartphone with Snapdragon processor',
    discount: 21,
    badges: ['Free Delivery', 'Easy Return'],
    category: 'Phone',
    inStock: true,
  },
  {
    id: 3,
    name: 'OnePlus 11',
    price: 45999,
    originalPrice: 56999,
    rating: 4.4,
    reviews: 1245,
    image: img1,
    description: 'Fast and smooth performance',
    discount: 19,
    badges: ['Free Delivery', 'Easy Return'],
    category: 'Phone',
    inStock: true,
  },
  {
    id: 4,
    name: 'Xiaomi 13',
    price: 39999,
    originalPrice: 49999,
    rating: 4.3,
    reviews: 987,
    image: img2,
    description: 'Value for money smartphone',
    discount: 20,
    badges: ['Free Delivery'],
    category: 'Phone',
    inStock: true,
  },
  {
    id: 5,
    name: 'Google Pixel 7',
    price: 55999,
    originalPrice: 69999,
    rating: 4.7,
    reviews: 2100,
    image: img3,
    description: 'Best camera performance',
    discount: 20,
    badges: ['Free Delivery', 'Easy Return', 'Assured'],
    category: 'Phone',
    inStock: true,
  }, 
];

export default Mobilephones;
