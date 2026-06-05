import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useWishlist } from "../hooks/useContexts";
import { showSuccess } from "../utils/toast";

export default function ProductCard({ product, bgToggle = false }) {
  const [heartBounce, setHeartBounce] = useState(false);
  const navigate = useNavigate();
  const { wishlist = [], toggleWishlist } = useWishlist();

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const price = Number(product.price || 0);
  const originalPrice = Number(product.originalPrice || 0);

  const discount =
    product.discount ||
    (originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 20);

  const rating = product.rating || 4.4;
  const reviews = product.reviews || "1,234";
  const inStock = product.inStock !== false;

  const category =
    product.category || product.subCategory || product.type || "products";

  const highlights =
    product.highlights ||
    product.specs || [
      product.category
        ? `${product.category} product`
        : "Premium quality product",
      "Fast delivery available",
    ];

  const fallbackSVG =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' font-size='10' font-family='sans-serif' font-weight='bold' fill='%239ca3af' dominant-baseline='middle' text-anchor='middle'>No Image</text></svg>";

  const isApple =
    product.brandname?.toLowerCase().includes("apple") ||
    product.BrandName?.toLowerCase().includes("apple") ||
    product.brand?.toLowerCase().includes("apple");

  const handleToggleWishlist = (e) => {
    e.stopPropagation();

    setHeartBounce(true);
    setTimeout(() => setHeartBounce(false), 600);

    toggleWishlist(product);
    showSuccess(isWishlisted ? "Removed from wishlist!" : "Added to wishlist!");
  };

  const handleProductClick = () => {
    if (!inStock) return;

    // புது பேஜுக்கு டேட்டாவை அப்படியே பாஸ் பண்றோம் ப்ரோ!
    navigate(`/product/${product.id}`, {
      state: {
        product,
        productId: product.id,
        category,
      },
    });
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      onClick={handleProductClick}
      className={`group w-full cursor-pointer overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md ${
        bgToggle
          ? "border-gray-800 bg-gray-900 text-white hover:border-orange-500/40"
          : "border-gray-200 bg-white text-gray-950 hover:border-orange-200"
      }`}
    >
      <style>{`
        @keyframes discoBorderSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes discoGlowPulse {
          0%, 100% { opacity: 0.65; filter: blur(8px); }
          50% { opacity: 1; filter: blur(12px); }
        }
        .disco-image-border { position: relative; isolation: isolate; }
        .disco-image-border::before {
          content: ""; position: absolute; inset: -3px; z-index: -2; border-radius: 18px;
          background: conic-gradient(from 0deg, #ff004c, #ffb700, #00ff85, #00c8ff, #7c3cff, #ff00e6, #ff004c);
          animation: discoBorderSpin 2.2s linear infinite;
        }
        .disco-image-border::after {
          content: ""; position: absolute; inset: -6px; z-index: -3; border-radius: 22px;
          background: conic-gradient(from 0deg, #ff004c, #ffb700, #00ff85, #00c8ff, #7c3cff, #ff00e6, #ff004c);
          animation: discoBorderSpin 2.2s linear infinite, discoGlowPulse 1.5s ease-in-out infinite;
        }
        .disco-image-inner { position: relative; z-index: 1; }
      `}</style>

      <div className="relative grid grid-cols-[100px_1fr_40px] items-center gap-3 p-3 sm:grid-cols-[150px_1fr_80px] sm:gap-6 sm:p-5">
        {/* Product Image */}
        <div
          className={`relative h-[105px] w-[100px] flex-shrink-0 rounded-xl sm:h-[145px] sm:w-[140px] ${
            bgToggle ? "disco-image-border" : ""
          }`}
        >
          <div
            className={`disco-image-inner relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border p-2 ${
              bgToggle
                ? "border-transparent bg-gray-950"
                : "border-gray-100 bg-gray-50"
            }`}
          >
            {discount > 0 && (
              <span className="absolute left-1 top-1 z-10 rounded bg-green-600 px-1.5 py-0.5 text-[8px] font-black text-white shadow">
                {discount}% OFF
              </span>
            )}

            <motion.button
              onClick={handleToggleWishlist}
              animate={
                heartBounce
                  ? { scale: [1, 1.3, 0.95, 1.1, 1] }
                  : { scale: 1 }
              }
              className={`absolute right-1 top-1 z-10 flex h-7 w-7 items-center justify-center rounded-full shadow backdrop-blur-sm ${
                bgToggle ? "bg-gray-900/90" : "bg-white/90"
              }`}
              aria-label="Toggle wishlist"
            >
              {isWishlisted ? (
                <Favorite sx={{ fontSize: 15, color: "#e63946" }} />
              ) : (
                <FavoriteBorder
                  sx={{ fontSize: 15, color: bgToggle ? "#d1d5db" : "#777" }}
                />
              )}
            </motion.button>

            <img
              src={product.image || fallbackSVG}
              alt={product.name || product.productName || "Product"}
              loading="lazy"
              className={`h-full w-full object-contain ${
                bgToggle ? "" : "mix-blend-multiply"
              }`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackSVG;
              }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex h-full min-w-0 flex-col justify-between py-0.5">
          <div>
            <h3
              className={`line-clamp-2 text-xs font-bold leading-snug sm:text-base md:text-lg ${
                bgToggle
                  ? "text-white group-hover:text-orange-300"
                  : "text-gray-950 group-hover:text-blue-600"
              }`}
            >
              {product.name || product.productName || "Product Name"}
            </h3>

            <div className="mt-1 flex items-center gap-1.5">
              <span className="rounded bg-green-600 px-1 py-0.2 text-[9px] font-black text-white sm:text-xs">
                {rating} ★
              </span>

              <span className="text-[10px] font-semibold text-gray-400">
                ({reviews} sold)
              </span>

              <span
                className={`hidden rounded px-1.5 py-0.5 text-[9px] font-black sm:inline-block ${
                  bgToggle
                    ? "bg-blue-500/15 text-blue-300"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                Assured
              </span>
            </div>

            <ul
              className={`mt-2 hidden max-w-md space-y-0.5 text-xs font-medium sm:block ${
                bgToggle ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {highlights.slice(0, 2).map((item, index) => (
                <li key={index} className="flex items-center gap-1.5">
                  <span
                    className={`h-1 w-1 rounded-full ${
                      bgToggle ? "bg-gray-600" : "bg-gray-300"
                    }`}
                  />
                  <span className="line-clamp-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-baseline gap-1 mt-2 sm:gap-2">
            <p
              className={`text-sm font-black sm:text-xl ${
                bgToggle ? "text-white" : "text-gray-950"
              }`}
            >
              ₹{price.toLocaleString("en-IN")}
            </p>

            {originalPrice > price && (
              <p
                className={`text-[10px] font-bold line-through sm:text-xs ${
                  bgToggle ? "text-gray-500" : "text-gray-400"
                }`}
              >
                ₹{originalPrice.toLocaleString("en-IN")}
              </p>
            )}

            <p className="block w-full text-[10px] font-black text-green-600 sm:inline sm:w-auto sm:text-xs">
              {product.offer || "Bank Offer"}
            </p>
          </div>
        </div>

        {/* Right Icon */}
        <div className="flex items-center self-center justify-center w-full pr-1 sm:pr-2">
          {isApple && (
            <svg
              className={`h-5 w-5 opacity-90 drop-shadow-sm sm:h-6 sm:w-6 ${
                bgToggle ? "text-gray-200" : "text-gray-950"
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
            </svg>
          )}
        </div>
      </div>
    </motion.article>
  );
}