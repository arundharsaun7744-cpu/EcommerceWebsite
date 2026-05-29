import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Loaders";
import { useProducts } from "../hooks/useContexts";
import ProductBar from "../components/ProductBar";

const CATEGORY_MAP = {
  Phone: "phone",
  "TV Appliances": "tvAppliances",
  Toys: "toys",
  Fashion: "Fashion",
  "Home Electronics": "homeElectronics",
  "Home Furniture": "homeFurniture",
};

export default function Home({ bgToggle, setBgToggle }) {
  const navigate = useNavigate();
  const { products } = useProducts();
  const loading = false;

  const categoryConfig = [
    { name: "Phone", cardsCount: 5 },
    { name: "TV Appliances", cardsCount: 5 },
    { name: "Toys", cardsCount: 5 },
    { name: "Fashion", cardsCount: 5 },
    { name: "Home Electronics", cardsCount: 5 },
    { name: "Home Furniture", cardsCount: 5 },
  ];

  const groupedProducts = useMemo(() => {
    const grouped = {};

    categoryConfig.forEach(({ name, cardsCount }) => {
      const categoryKey = CATEGORY_MAP[name];

      grouped[name] = categoryKey
        ? (products?.[categoryKey] || []).slice(0, cardsCount)
        : [];
    });

    return grouped;
  }, [products]);

  const handleThemeToggle = () => {
    const newValue = !bgToggle;
    setBgToggle(newValue);
    localStorage.setItem("bgToggle", newValue);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        bgToggle ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <style>{`
        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0.45; }
        }

        .animate-blink {
          animation: blink 1.2s infinite;
        }

        @keyframes starFade1 {
          0% { transform: scale(.8); opacity: .2; }
          50% { transform: scale(1.4); opacity: 1; }
          100% { transform: scale(.8); opacity: .2; }
        }

        @keyframes starFade2 {
          0% { transform: scale(1); opacity: .3; }
          50% { transform: scale(1.6); opacity: 1; }
          100% { transform: scale(1); opacity: .3; }
        }

        @keyframes starFade3 {
          0% { transform: scale(.6); opacity: .1; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(.6); opacity: .1; }
        }

        .animate-star1 {
          animation: starFade1 1.8s infinite;
        }

        .animate-star2 {
          animation: starFade2 2.2s infinite;
        }

        .animate-star3 {
          animation: starFade3 1.5s infinite;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="w-full px-2 py-3 sm:px-4 sm:py-5 lg:px-6 lg:py-6">
        {/* Product moving bar */}
        <div
          className={`mb-4 overflow-hidden rounded-xl border shadow-sm sm:mb-6 sm:rounded-2xl ${
            bgToggle
              ? "border-gray-700 bg-gray-800/80"
              : "border-gray-200 bg-white"
          }`}
        >
          <marquee scrollamount="4">
            <ProductBar />
          </marquee>
        </div>

        {/* Theme toggle */}
        <button
          onClick={handleThemeToggle}
          className="fixed bottom-5 right-4 z-[2000] flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gray-500 to-pink-400 shadow-lg transition hover:scale-110 active:scale-95 sm:bottom-auto sm:top-5 sm:h-14 sm:w-14 animate-blink"
          aria-label="Toggle theme"
        >
          <span className="absolute left-2 top-1 text-[10px] text-white animate-star1 sm:text-sm">
            ★
          </span>
          <span className="absolute bottom-2 right-3 text-[9px] text-white animate-star2 sm:text-xs">
            ★
          </span>
          <span className="absolute right-2 top-3 text-[9px] text-white animate-star3 sm:text-xs">
            ★
          </span>
          <span className="text-sm font-bold text-white animate-pulse sm:text-lg">
            O
          </span>
        </button>

        {loading ? (
          <ProductGridSkeleton count={30} />
        ) : (
          <div className="space-y-4 transition-all duration-500 sm:space-y-7 lg:space-y-10">
            {categoryConfig.map(({ name, cardsCount }) => (
              <section
                key={name}
                className={`rounded-2xl border p-3 shadow-sm transition-all duration-300 sm:rounded-3xl sm:p-5 lg:p-6 ${
                  bgToggle
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                }`}
              >
                {/* Category header */}
                <div className="flex items-end justify-between gap-2 mb-3 sm:mb-5 lg:mb-6">
                  <div className="min-w-0">
                    <h2 className="inline-block pb-1 text-lg font-black tracking-tight border-b-2 border-orange-500 sm:border-b-4 sm:pb-3 sm:text-2xl lg:text-3xl">
                      {name}
                    </h2>

                    <p
                      className={`mt-1 text-[11px] sm:mt-2 sm:text-sm ${
                        bgToggle ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Showing {cardsCount} featured items
                    </p>
                  </div>

                  <button
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold transition sm:px-4 sm:py-2 sm:text-xs ${
                      bgToggle
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                    }`}
                  >
                    View All
                  </button>
                </div>

                {groupedProducts[name]?.length > 0 ? (
                  <>
                    {/* ✅ Mobile compact cards */}
                    <div className="grid grid-cols-2 gap-2 sm:hidden">
                      {groupedProducts[name].map((item) => (
                        <MobileProductCard
                          key={item.id}
                          product={item}
                          bgToggle={bgToggle}
                          onClick={() => navigate(`/product/${item.id}`)}
                        />
                      ))}
                    </div>

                    {/* ✅ Tablet + Laptop original cards */}
                    <div className="hidden sm:grid sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
                      {groupedProducts[name].map((item) => (
                        <div
                          key={item.id}
                          className="transition duration-300 hover:-translate-y-1 active:scale-[0.98]"
                        >
                          <ProductCard product={item} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div
                    className={`rounded-2xl py-8 text-center text-sm font-semibold ${
                      bgToggle
                        ? "bg-gray-900 text-gray-400"
                        : "bg-gray-50 text-gray-500"
                    }`}
                  >
                    No products available in this category
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const MobileProductCard = ({ product, bgToggle, onClick }) => {
  const price = product?.price || 0;
  const oldPrice =
    product?.originalPrice || product?.oldPrice || Math.round(price * 1.2);
  const discount = product?.discount || 20;
  const rating = product?.rating || 4.7;

  return (
    <div
      onClick={onClick}
      className={`group flex min-h-[245px] flex-col overflow-hidden rounded-2xl border shadow-sm transition active:scale-[0.98] ${
        bgToggle
          ? "border-gray-700 bg-gray-900 text-white"
          : "border-gray-200 bg-white text-black"
      }`}
    >
      {/* Image area */}
      <div
        className={`relative flex h-28 items-center justify-center p-2 ${
          bgToggle ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute z-10 flex items-center justify-center text-gray-500 bg-white rounded-full shadow-sm left-2 top-2 h-7 w-7"
        >
          ♡
        </button>

        <span className="absolute right-2 top-2 rounded-md bg-red-500 px-1.5 py-1 text-[9px] font-black text-white">
          {discount}% OFF
        </span>

        <img
          src={product?.image}
          alt={product?.name || "Product"}
          className="object-contain h-full max-w-full transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-2.5">
        <div>
          <h3 className="line-clamp-2 min-h-[34px] text-[12px] font-black leading-4">
            {product?.name || "Product"}
          </h3>

          <div className="mt-2 flex items-center gap-1.5">
            <span className="rounded bg-green-500 px-1.5 py-0.5 text-[9px] font-black text-white">
              {rating} ★
            </span>

            <span
              className={`text-[10px] ${
                bgToggle ? "text-gray-400" : "text-gray-500"
              }`}
            >
              ({product?.reviews || "2100"})
            </span>
          </div>

          <div className="flex flex-wrap items-end gap-1 mt-2">
            <span className="text-[15px] font-black">₹{price.toLocaleString()}</span>

            <span
              className={`text-[10px] line-through ${
                bgToggle ? "text-gray-500" : "text-gray-400"
              }`}
            >
              ₹{oldPrice.toLocaleString()}
            </span>

            <span className="text-[10px] font-black text-green-600">
              off
            </span>
          </div>
        </div>

        <button
          className="mt-3 w-full rounded-lg bg-orange-500 px-2 py-2 text-[11px] font-black text-white transition hover:bg-orange-600"
        >
          View Product
        </button>
      </div>
    </div>
  );
};