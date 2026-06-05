import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const getProductImage = (product) => {
  return (
    product?.image ||
    product?.productImage ||
    product?.imageUrl ||
    product?.thumbnail ||
    product?.product_image ||
    product?.images?.[0] ||
    ""
  );
};

const getProductName = (product) => {
  return product?.productName || product?.name || product?.title || "Product";
};

const getProductBrand = (product) => {
  return product?.BrandName || product?.brandName || product?.brand || "Brand";
};

const getProductPrice = (product) => {
  const price = product?.price || product?.productPrice || product?.amount || 0;
  return Number(price).toLocaleString("en-IN");
};

export default function Wishlist({ bgToggle }) {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist);
  }, []);

  const totalValue = useMemo(() => {
    return wishlistItems.reduce((total, product) => {
      return total + Number(product?.price || product?.productPrice || 0);
    }, 0);
  }, [wishlistItems]);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(
      (product) => product.id !== productId
    );

    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem("wishlist");
  };

  const openProduct = (product) => {
    const productId = product?.id;
    const category = product?.category || product?.Category || "product";

    if (productId) {
      navigate(`/product/${category}/${productId}`, { state: { product } });
    }
  };

  return (
    <div
      className={`min-h-screen px-3 py-4 transition-colors duration-500 sm:px-5 lg:px-8 ${
        bgToggle
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-slate-950 text-white"
          : "bg-[#f6f7fb] text-gray-950"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section
          className={`mb-5 overflow-hidden rounded-3xl border shadow-sm ${
            bgToggle
              ? "border-white/10 bg-white/[0.04]"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="relative p-4 sm:p-6">
            <div className="absolute w-40 h-40 rounded-full -right-16 -top-16 bg-orange-500/20 blur-3xl" />
            <div className="absolute rounded-full -bottom-16 left-10 h-36 w-36 bg-blue-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-500">
                  Shopping Collection
                </p>

                <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                  My Wishlist
                </h1>

                <p
                  className={`mt-2 max-w-xl text-sm font-medium leading-6 ${
                    bgToggle ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Save your favourite products and come back anytime to buy them.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:flex">
                <div
                  className={`rounded-2xl border px-4 py-3 ${
                    bgToggle
                      ? "border-white/10 bg-black/20"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <p
                    className={`text-[11px] font-bold ${
                      bgToggle ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Saved Items
                  </p>
                  <h2 className="mt-1 text-xl font-black">
                    {wishlistItems.length}
                  </h2>
                </div>

                <div
                  className={`rounded-2xl border px-4 py-3 ${
                    bgToggle
                      ? "border-white/10 bg-black/20"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <p
                    className={`text-[11px] font-bold ${
                      bgToggle ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Total Value
                  </p>
                  <h2 className="mt-1 text-xl font-black">
                    ₹{totalValue.toLocaleString("en-IN")}
                  </h2>
                </div>
              </div>
            </div>

            {wishlistItems.length > 0 && (
              <div className="relative z-10 flex flex-wrap gap-2 mt-5">
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/")}
                  className="px-4 py-2 text-xs font-black text-white transition bg-orange-500 rounded-full shadow-lg shadow-orange-500/20 hover:bg-orange-600 sm:text-sm"
                >
                  Continue Shopping
                </motion.button>

                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={clearWishlist}
                  className={`rounded-full border px-4 py-2 text-xs font-black transition sm:text-sm ${
                    bgToggle
                      ? "border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white"
                      : "border-red-200 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white"
                  }`}
                >
                  Clear Wishlist
                </motion.button>
              </div>
            )}
          </div>
        </section>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex min-h-[55vh] items-center justify-center rounded-3xl border p-6 text-center shadow-sm ${
              bgToggle
                ? "border-white/10 bg-white/[0.04]"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="max-w-sm">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="flex items-center justify-center w-24 h-24 mx-auto text-5xl rounded-full bg-orange-500/10"
              >
                🛍️
              </motion.div>

              <h2 className="mt-5 text-2xl font-black">
                Your wishlist is empty
              </h2>

              <p
                className={`mt-2 text-sm font-medium leading-6 ${
                  bgToggle ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Like products from the home page. Your favourite items will be
                saved here.
              </p>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/")}
                className="mt-5 rounded-full bg-orange-500 px-6 py-2.5 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
              >
                Start Shopping
              </motion.button>
            </div>
          </motion.section>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            <AnimatePresence mode="popLayout">
              {wishlistItems.map((product, index) => {
                const image = getProductImage(product);
                const name = getProductName(product);
                const brand = getProductBrand(product);
                const price = getProductPrice(product);

                return (
                  <motion.article
                    layout
                    key={product.id || `${name}-${index}`}
                    initial={{ opacity: 0, y: 18, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.03,
                    }}
                    className={`group overflow-hidden rounded-2xl border shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      bgToggle
                        ? "border-white/10 bg-white/[0.05]"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="relative overflow-hidden bg-gray-100 aspect-square">
                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          className="object-cover w-full h-full transition duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-4xl">
                          🛒
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />

                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="absolute flex items-center justify-center w-8 h-8 text-sm font-black text-red-500 transition rounded-full shadow-md right-2 top-2 bg-white/95 hover:scale-110 hover:bg-red-500 hover:text-white active:scale-95"
                        aria-label="Remove from wishlist"
                      >
                        ×
                      </button>

                      <span className="absolute left-2 top-2 rounded-full bg-orange-500 px-2 py-1 text-[9px] font-black uppercase text-white shadow">
                        Saved
                      </span>
                    </div>

                    <div className="p-3">
                      <p
                        className={`line-clamp-1 text-[10px] font-black uppercase tracking-wide ${
                          bgToggle ? "text-orange-300" : "text-orange-500"
                        }`}
                      >
                        {brand}
                      </p>

                      <h3 className="mt-1 line-clamp-2 min-h-[34px] text-xs font-black leading-[17px] sm:text-sm sm:leading-5">
                        {name}
                      </h3>

                      <div className="flex items-center justify-between gap-2 mt-3">
                        <p className="text-sm font-black sm:text-base">
                          ₹{price}
                        </p>

                        <span
                          className={`rounded-full px-2 py-1 text-[9px] font-black ${
                            bgToggle
                              ? "bg-green-500/15 text-green-300"
                              : "bg-green-50 text-green-600"
                          }`}
                        >
                          In Stock
                        </span>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => openProduct(product)}
                        className="mt-3 w-full rounded-xl bg-gray-950 px-3 py-2 text-[11px] font-black text-white transition hover:bg-orange-500 sm:text-xs"
                      >
                        View Product
                      </motion.button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}