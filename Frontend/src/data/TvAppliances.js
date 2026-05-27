import sonyTvImg from '../assets/t1.webp';
import fridgeImg from '../assets/t2.jpg';
import acImg from '../assets/t3.avif';
import ifbWashImg from '../assets/t4.webp';
import stoveImg from '../assets/t5.jpg';

const tvAppliances =[
    {
  id: 501,
  name: 'Sony 43" 4K Ultra HD Smart TV',
  price: 28999,
  originalPrice: 45999,
  rating: 4.7,
  reviews: 5120,
  image: sonyTvImg,
  description: '4K HDR display with Dolby Audio support',
  discount: 37,
  badges: ['Free Delivery', 'Easy Return', 'Assured'],
  category: 'TV & Appliances',
  inStock: true,
},
{
  id: 502,
  name: 'Whirlpool 265L Double Door Refrigerator',
  price: 21490,
  originalPrice: 27990,
  rating: 4.3,
  reviews: 2311,
  image: fridgeImg,
  description: 'Frost-free refrigerator with 6th sense technology',
  discount: 23,
  badges: ['Free Installation', 'Free Delivery'],
  category: 'TV & Appliances',
  inStock: true,
},
{
  id: 503,
  name: 'Panasonic 1.5 Ton 5★ Inverter AC',
  price: 32990,
  originalPrice: 42990,
  rating: 4.5,
  reviews: 1890,
  image: acImg,
  description: 'Energy efficient inverter AC with fast cooling',
  discount: 24,
  badges: ['Free Delivery', 'Assured'],
  category: 'TV & Appliances',
  inStock: true,
},
{
  id: 504,
  name: 'IFB 6kg Front Load Washing Machine',
  price: 18490,
  originalPrice: 24990,
  rating: 4.2,
  reviews: 1420,
  image: ifbWashImg,
  description: 'Steam wash & Aqua Energie water softener',
  discount: 26,
  badges: ['Free Installation', 'Easy Return'],
  category: 'TV & Appliances',
  inStock: true,
},
{
  id: 505,
  name: 'Prestige 3 Burner Gas Stove',
  price: 2499,
  originalPrice: 3999,
  rating: 4.4,
  reviews: 6723,
  image: stoveImg,
  description: 'Toughened glass top, tri-pin brass burners',
  discount: 38,
  badges: ['Free Delivery', 'Easy Return', 'Assured'],
  category: 'TV & Appliances',
  inStock: true,
}

]
export default tvAppliances;