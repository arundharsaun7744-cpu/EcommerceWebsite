import applesImg from '../assets/s1.jpg';
import wheatFlourImg from '../assets/s2.jpg';
import oilImg from '../assets/s3.webp';
import eggsImg from '../assets/s4.webp';
import milkImg from '../assets/s5.avif';

const groceery =[
    {
  id: 201,
  name: 'Fresh Farm Apples (1kg)',
  price: 199,
  originalPrice: 250,
  rating: 4.3,
  reviews: 532,
  image: applesImg,
  description: 'Naturally grown fresh apples, crispy and sweet',
  discount: 20,
  badges: ['Free Delivery', 'Assured'],
  category: 'Grocery',
  inStock: true,
},
{
  id: 202,
  name: 'Aashirvaad Wheat Flour (5kg)',
  price: 310,
  originalPrice: 360,
  rating: 4.7,
  reviews: 1240,
  image: wheatFlourImg,
  description: '100% whole wheat, high in fiber',
  discount: 14,
  badges: ['No Cost EMI', 'Assured'],
  category: 'Grocery',
  inStock: true,
},
{
  id: 203,
  name: 'Fortune Sunflower Oil (1L)',
  price: 135,
  originalPrice: 160,
  rating: 4.5,
  reviews: 890,
  image: oilImg,
  description: 'Heart healthy refined sunflower oil',
  discount: 16,
  badges: ['Free Delivery'],
  category: 'Grocery',
  inStock: false,
},
{
  id: 204,
  name: 'Organic Brown Eggs (12 pcs)',
  price: 149,
  originalPrice: 180,
  rating: 4.2,
  reviews: 321,
  image: eggsImg,
  description: 'Rich in protein, organic farm eggs',
  discount: 17,
  badges: ['Easy Return', 'Assured'],
  category: 'Grocery',
  inStock: true,
},
{
  id: 205,
  name: 'Fresh Cow Milk (1L)',
  price: 58,
  originalPrice: 65,
  rating: 4.6,
  reviews: 2100,
  image: milkImg,
  description: 'Pure and fresh pasteurized milk',
  discount: 10,
  badges: ['Free Delivery', 'Easy Return'],
  category: 'Grocery',
  inStock: true,
}

]

export default groceery;