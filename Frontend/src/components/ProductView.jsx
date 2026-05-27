import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { showSuccess } from "../utils/toast";
import {
  useProducts,
  useCart,
  useWishlist,
  useAuth,
} from "../hooks/useContexts";

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, getProductById } = useProducts();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();

  // Get product from context
  const product = getProductById(id);

  const [mainImage, setMainImage] = useState(product?.image);
  const [heartBounce, setHeartBounce] = useState(false);
  const [qty, setQty] = useState(1);
  const [qtyAnimate, setQtyAnimate] = useState(false);
  const [lastAction, setLastAction] = useState("increase");
  const isWishlisted = wishlist.some((item) => item.id === product?.id);

  // Update mainImage when product loads
  useEffect(() => {
    if (product?.image) {
      setMainImage(product.image);
    }
  }, [product]);

  const handleWishToggle = () => {
    setHeartBounce(true);
    setTimeout(() => setHeartBounce(false), 600);
    toggleWishlist(product);
    showSuccess(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  // Show error if product not found
  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-screen gap-4 mt-20"
      >
        <p className="text-2xl font-bold text-gray-900">Product not found</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="px-6 py-2 font-semibold text-white bg-orange-500 rounded-lg"
        >
          Back to Home
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid max-w-6xl grid-cols-1 gap-8 px-5 py-8 mx-auto mt-20 md:grid-cols-2"
    >
      {/* -------- LEFT IMAGE SECTION -------- */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          <motion.img
            key={mainImage}
            src={mainImage}
            alt={product.name}
            className="w-full h-[420px] object-contain rounded-xl shadow-md bg-gray-100 p-4 cursor-zoom-in"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>

        {/* Thumbnail preview */}
        <div className="flex gap-2 overflow-x-auto">
          {[product.image, ...(product.gallery || [])].map((img, i) => (
            <img
              key={i}
              src={img}
              alt="thumb"
              onClick={() => setMainImage(img)}
              className={`h-16 w-16 rounded-md object-cover cursor-pointer border
                ${mainImage === img ? "border-orange-500" : "border-gray-300"}`}
            />
          ))}
        </div>
      </div>

      {/* -------- RIGHT PRODUCT INFO -------- */}
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

          <motion.button
            onClick={handleWishToggle}
            animate={
              heartBounce ? { scale: [1, 1.4, 0.95, 1.1, 1] } : { scale: 1 }
            }
            transition={{ duration: 0.6 }}
            className="p-2 bg-white rounded-full shadow"
          >
            {isWishlisted ? (
              <Favorite sx={{ color: "#e63946" }} />
            ) : (
              <FavoriteBorder sx={{ color: "#333" }} />
            )}
          </motion.button>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-green-600 text-white text-xs font-bold px-2 py-[2px] rounded">
            {product.rating} ★
          </span>
          <span className="text-xs text-gray-500">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 mt-4">
          <span className="text-3xl font-bold text-gray-900">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
          <span className="text-sm font-semibold text-green-600">
            {product.discount || 20}% OFF
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 text-[15px] text-gray-700 leading-relaxed">
          {product.description || "No description available."}
        </p>

        {/* 🔥 Animated Quantity Selector */}
        <div className="flex items-center gap-4 mt-6">
          <span className="text-lg font-semibold text-gray-800">Quantity:</span>
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                if (qty > 1) {
                  setQty(qty - 1);
                  setLastAction("decrease");
                  setQtyAnimate(true);
                  setTimeout(() => setQtyAnimate(false), 300);
                }
              }}
              className="flex items-center justify-center text-xl font-bold bg-gray-200 rounded w-9 h-9 hover:bg-gray-300"
            >
              −
            </motion.button>

            <motion.span
              animate={
                qtyAnimate
                  ? {
                      scale: [1, 1.35, 1],
                      color: lastAction === "increase" ? "#10b981" : "#ef4444",
                    }
                  : { scale: 1, color: "#111" }
              }
              transition={{ duration: 0.3 }}
              className="px-4 py-1 text-2xl font-extrabold tracking-wide rounded"
              style={{ fontFamily: "Poppins" }}
            >
              {qty}
            </motion.span>

            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                setQty(qty + 1);
                setLastAction("increase");
                setQtyAnimate(true);
                setTimeout(() => setQtyAnimate(false), 300);
              }}
              className="flex items-center justify-center text-xl font-bold bg-gray-200 rounded w-9 h-9 hover:bg-gray-300"
            >
              +
            </motion.button>
          </div>
        </div>

        {/* Add / Buy buttons */}
        <div className="flex flex-col gap-3 mt-8 sm:flex-row">
          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 15px rgba(255,120,0,0.5)",
            }}
            whileTap={{ scale: 0.92 }}
            onClick={handleWishToggle}
            className="w-full py-3 text-sm font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600"
          >
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              navigate(`/payment`, { state: { product, qty } });
            }}
            className="w-full py-3 text-sm font-semibold text-gray-800 rounded-md"
            style={{ border: "4px solid #00fc8f" }}
          >
           Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
