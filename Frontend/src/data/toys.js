import legoImg from '../assets/t1.jpg';
import rcTruckImg from '../assets/t2.jpg';
import barbieImg from '../assets/t3.jpg';
import teddyImg from '../assets/t4.jpg';
import puzzleMatImg from '../assets/t5.webp';

const toys =[
    {
  id: 401,
  name: 'Lego Classic Creative Bricks Set',
  price: 1299,
  originalPrice: 1999,
  rating: 4.8,
  reviews: 3201,
  image: legoImg,
  description: '550+ colorful pieces for unlimited creativity',
  discount: 35,
  badges: ['Free Delivery', 'Assured'],
  category: 'Toys',
  inStock: true,
},
{
  id: 402,
  name: 'Remote Control Monster Truck',
  price: 899,
  originalPrice: 1499,
  rating: 4.3,
  reviews: 876,
  image: rcTruckImg,
  description: 'All-terrain RC truck with high speed control',
  discount: 40,
  badges: ['Free Delivery', 'Easy Return'],
  category: 'Toys',
  inStock: true,
},
{
  id: 403,
  name: 'Barbie Dreamhouse Doll Set',
  price: 2599,
  originalPrice: 3499,
  rating: 4.6,
  reviews: 1454,
  image: barbieImg,
  description: 'Beautiful doll set with accessories',
  discount: 25,
  badges: ['Premium Quality', 'Assured'],
  category: 'Toys',
  inStock: true,
},
{
  id: 404,
  name: 'Teddy Bear Soft Toy (3ft)',
  price: 499,
  originalPrice: 999,
  rating: 4.4,
  reviews: 2310,
  image: teddyImg,
  description: 'Huggable, soft and washable teddy bear',
  discount: 50,
  badges: ['Free Delivery'],
  category: 'Toys',
  inStock: true,
},
{
  id: 405,
  name: 'Puzzle Mat for Kids (Alphabet)',
  price: 349,
  originalPrice: 599,
  rating: 4.1,
  reviews: 543,
  image: puzzleMatImg,
  description: 'Educational foam puzzle mat for kids',
  discount: 42,
  badges: ['Easy Return', 'Assured'],
  category: 'Toys',
  inStock: true,
}

]

export default toys;