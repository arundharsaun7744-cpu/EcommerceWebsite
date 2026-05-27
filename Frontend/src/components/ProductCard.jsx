import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useWishlist } from "../hooks/useContexts";
import { WishlistContext } from "../Context/WishlistContext";
import { showSuccess } from "../utils/toast";

export default function ProductCard({ product, navigateToWishlist = false }) {
  const [heartBounce, setHeartBounce] = useState(false);
  const navigate = useNavigate();

  const { wishlist = [], toggleWishlist } = useWishlist();
  const { addToWishlist } = useContext(WishlistContext);

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const discount = product.discount || 20;

  const handleToggleWishlist = (e) => {
    e.stopPropagation();

    setHeartBounce(true);
    setTimeout(() => setHeartBounce(false), 600);

    toggleWishlist(product);
    showSuccess(isWishlisted ? "Removed from wishlist!" : "Added to wishlist!");
    showSuccess(isWishlisted ? "Removed from wishlist!" : "Added to wishlist!");

    if (!isWishlisted && !navigateToWishlist) {
      addToWishlist(product);
      setTimeout(() => navigate("/wishlist"), 500);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.12)" }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white border rounded-lg p-3 cursor-pointer transition-all duration-300 relative
                 sm:w-[250px] flex flex-col"
    >
      {discount > 0 && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-[2px] rounded">
          {discount}% OFF
        </span>
      )}

      <motion.button
        onClick={handleToggleWishlist}
        animate={heartBounce ? { scale: [1, 1.4, 0.95, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute p-1 bg-white rounded-full shadow-sm top-2 left-2"
      >
        {isWishlisted ? (
          <motion.div
            animate={heartBounce ? { rotate: [0, 15, -15, 0] } : { rotate: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Favorite sx={{ fontSize: 18, color: "#e74c3c" }} />
          </motion.div>
        ) : (
          <FavoriteBorder sx={{ fontSize: 18, color: "#666" }} />
        )}
      </motion.button>

      <div className="flex items-center justify-center w-full h-32 overflow-hidden rounded-md bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain h-full p-1"
          loading="lazy"
        />
      </div>

      <h3 className="text-[13px] font-semibold mt-2 line-clamp-2 min-h-[35px] text-gray-900">
        {product.name}
      </h3>

      <div className="flex items-center gap-1 mt-1">
        <span className="bg-green-600 text-white text-[10px] font-semibold px-1 py-[1px] rounded">
          {product.rating} ★
        </span>
        {product.reviews && (
          <span className="text-[10px] text-gray-500">({product.reviews})</span>
        )}
      </div>

      <div className="flex items-center gap-1 mt-2">
        <span className="text-lg font-bold text-gray-900">
          ₹{product.price.toLocaleString()}
        </span>
        {product.originalPrice && (
          <span className="text-[11px] text-gray-400 line-through">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        )}
        <span className="text-[11px] text-green-600 font-semibold">
          {discount}% off
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/product/${product.id}`);
        }}
        disabled={!product.inStock}
        className="w-full mt-[15px] py-1.5 bg-orange-500 hover:bg-orange-600 rounded text-white text-xs font-semibold
                   disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {product.inStock ? "View Product" : "OUT OF STOCK"}
      </button>
    </motion.div>
  );
}
