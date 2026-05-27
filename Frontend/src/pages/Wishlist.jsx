
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import {useState,useEffect } from "react";
export default function Wishlist() {
  const navigate = useNavigate();
 const [wishlistItems, setWishlistItems] = useState([]);

useEffect(() => {
  const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  setWishlistItems(storedWishlist);
}, []);
  
  return (
    <div className="max-w-6xl p-4 mx-auto mt-20 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">My Wishlist</h2>

        {wishlistItems.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded"
          >
            Continue Shopping
          </motion.button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="py-12 text-center">
          <p className="mb-4 text-lg text-gray-500">
            Your wishlist is empty.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="px-6 py-2 font-semibold text-white bg-orange-500 rounded"
          >
            Start Shopping
          </motion.button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              navigateToWishlist={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
