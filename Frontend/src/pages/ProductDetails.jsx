import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Favorite, FavoriteBorder, ShoppingBag, FlashOn, ArrowBack } from "@mui/icons-material";
import { useWishlist } from "../hooks/useContexts";
import { showSuccess } from "../utils/toast";

export default function ProductDetails({ bgToggle = false }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { wishlist = [], toggleWishlist } = useWishlist();

  // கார்டில் இருந்து வந்த ப்ராடக்ட் டேட்டா
  const product = state?.product;

  if (!product) {
    return (
      <div className={`flex min-h-screen items-center justify-center ${bgToggle ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-950"}`}>
        <div className="text-center">
          <p className="text-lg font-bold">Product Data Missing, Bro!</p>
          <button onClick={() => navigate("/")} className="px-5 py-2 mt-4 text-sm font-bold text-white bg-orange-500 rounded-xl">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const price = Number(product.price || 0);
  const originalPrice = Number(product.originalPrice || price * 1.25);
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  // EMI கால்குலேஷன் (மாதாந்திர தவணை லுக்)
  const emiCost = Math.round(price / 12);

  // போலி ரிவியூக்கள் (Default Reviews Setup)
  const dummyReviews = [
    { id: 1, name: "Arun Kumar", rating: 5, comment: "Semma product bro! Worth for money. Delivery-um fast-ah irundhadhu. 🔥", date: "2 days ago" },
    { id: 2, name: "Vijay", rating: 4, comment: "Build quality is very premium. Highly recommended for daily usage.", date: "1 week ago" },
    { id: 3, name: "Suresh", rating: 5, comment: "Semma packing and authentic product. Thanks bro!", date: "2 weeks ago" }
  ];

  const handleBuyNow = () => {
    showSuccess("Redirecting to checkout page... 🛒");
    navigate('/payment', {
    state: {
      product: product,
      qty: 1 // அல்லது உங்களிடம் qty ஸ்டேட் இருந்தால் அதை கொடுக்கலாம் ப்ரோ
    }
  });
  };

  return (
    <div className={`min-h-screen px-3 py-4 transition-colors duration-500 sm:px-6 lg:px-12 ${bgToggle ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-950"}`}>
      <div className="mx-auto max-w-7xl">
        
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className={`mb-6 flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-black transition-all ${bgToggle ? "border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100"}`}>
          <ArrowBack fontSize="small" /> Back
        </button>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          
          {/* ================= LEFT SECTION: IMAGE PREVIEW ================= */}
          <div className="flex flex-col items-center">
            <div className={`relative flex aspect-square w-full max-w-[450px] items-center justify-center overflow-hidden rounded-2xl border p-6 shadow-sm ${bgToggle ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
              
              {discount > 0 && (
                <span className="absolute left-4 top-4 z-10 rounded-lg bg-green-600 px-2.5 py-1 text-xs font-black text-white shadow-md">
                  {discount}% SPECIAL OFF
                </span>
              )}

              <img
                src={product.image || "https://via.placeholder.com/400"}
                alt={product.name || product.productName}
                className={`h-full w-full max-h-[380px] object-contain transition-transform duration-300 hover:scale-105 ${bgToggle ? "" : "mix-blend-multiply"}`}
              />
            </div>
          </div>

          {/* ================= RIGHT SECTION: FULL DETAILS ================= */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs font-black tracking-wider text-orange-500 uppercase">
                {product.category || "Premium Listing"}
              </span>
              <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                {product.name || product.productName}
              </h1>

              {/* Rating Dashboard Row */}
              <div className="flex items-center gap-3 mt-3">
                <span className="flex items-center gap-1 rounded-lg bg-green-600 px-2.5 py-0.5 text-sm font-black text-white">
                  {product.rating || 4.4} ★
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  {product.reviews || "1,234"} Ratings & Verified Customer Reviews
                </span>
              </div>

              {/* Pricing Grid */}
              <div className="mt-5 rounded-2xl border p-4 shadow-sm bg-opacity-30 backdrop-blur-md ${bgToggle ? 'border-gray-800 bg-gray-900/40' : 'border-gray-200 bg-gray-100/50'}">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black">₹{price.toLocaleString("en-IN")}</span>
                  {originalPrice > price && (
                    <span className="text-sm font-bold text-gray-400 line-through">₹{originalPrice.toLocaleString("en-IN")}</span>
                  )}
                </div>
                <p className="mt-1 text-xs font-black text-green-600">{product.offer || "Free Shipping & Extra Bank Offer applied"}</p>
              </div>

              {/* 💳 EMI Details Section */}
              <div className={`mt-4 rounded-xl border p-3.5 ${bgToggle ? "border-gray-800 bg-gray-900/20" : "border-gray-200 bg-orange-50/40"}`}>
                <p className="text-xs font-black tracking-wide text-orange-600 uppercase">Easy EMI Options Available</p>
                <p className="mt-1 text-sm font-bold">
                  No Cost EMI starts from <span className="font-black text-green-600">₹{emiCost.toLocaleString("en-IN")}/month</span> for 12 months tenure.
                </p>
                <p className="text-[11px] mt-0.5 text-gray-400">Credit card, Debit Card & Cardless EMI supporting available at checkout.</p>
              </div>

              {/* Specifications Block */}
              <div className="mt-6">
                <h3 className="text-sm font-black tracking-wider text-gray-400 uppercase">Key Product Specifications</h3>
                <div className={`mt-2 overflow-hidden rounded-xl border text-xs sm:text-sm ${bgToggle ? "border-gray-800" : "border-gray-200"}`}>
                  <div className={`grid grid-cols-2 border-b p-3 ${bgToggle ? "border-gray-800 bg-gray-900/50" : "border-gray-100 bg-gray-50"}`}>
                    <span className="font-bold text-gray-400">Brand Name</span>
                    <span className="font-black">{product.BrandName || product.brandname || "Premium Brand"}</span>
                  </div>
                  <div className={`grid grid-cols-2 border-b p-3 ${bgToggle ? "border-gray-800" : "border-gray-100"}`}>
                    <span className="font-bold text-gray-400">Quantity Stock</span>
                    <span className="font-black text-green-600">{product.quantity || "In Stock (Available)"} units</span>
                  </div>
                  <div className={`grid grid-cols-2 p-3`}>
                    <span className="font-bold text-gray-400">Total Sales</span>
                    <span className="font-black">{product.sales || "100+"} orders completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 🔥 Action Buttons (Buy Now & Wishlist) */}
            <div className="grid grid-cols-1 gap-3 mt-8 sm:grid-cols-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleWishlist(product)}
                className={`flex items-center justify-center gap-2 rounded-xl border py-3.5 text-sm font-black transition-all ${
                  isWishlisted
                    ? "border-red-500 bg-red-500/10 text-red-500"
                    : bgToggle
                    ? "border-gray-800 bg-gray-900 text-white hover:bg-gray-800"
                    : "border-gray-200 bg-white text-gray-950 hover:bg-gray-100"
                }`}
              >
                {isWishlisted ? <Favorite /> : <FavoriteBorder />}
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-black text-white shadow-lg hover:bg-orange-600 shadow-orange-500/20"
              >
                <FlashOn /> Buy Now
              </motion.button>
            </div>
          </div>
        </div>

        {/* ================= CUSTOMER REVIEWS SECTION ================= */}
        <div className="mt-12 border-t pt-8 ${bgToggle ? 'border-gray-800' : 'border-gray-200'}">
          <h2 className="text-xl font-black tracking-tight">Customer Reviews & Feedback</h2>
          <div className="mt-4 space-y-4">
            {dummyReviews.map((rev) => (
              <div key={rev.id} className={`rounded-xl border p-4 shadow-sm ${bgToggle ? "border-gray-800/60 bg-gray-900/40" : "border-gray-200 bg-white"}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black">{rev.name}</span>
                  <span className="text-xs font-semibold text-gray-400">{rev.date}</span>
                </div>
                <div className="flex mt-1 text-xs text-orange-400">
                  {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                </div>
                <p className={`mt-2 text-xs font-medium sm:text-sm ${bgToggle ? "text-gray-300" : "text-gray-600"}`}>
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}