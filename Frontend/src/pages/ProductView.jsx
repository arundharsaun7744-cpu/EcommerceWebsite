import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const SERVER_BASE_URL = API_BASE_URL.replace("/api", "");
const PRODUCT_LIMIT = 100;

const getDisplayBrandName = (brandname = "") => {
  return brandname
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const normalizeText = (value = "") => {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ");
};

const compactText = (value = "") => {
  return normalizeText(value).replace(/\s+/g, "");
};

const getSearchWords = (value = "") => {
  return normalizeText(value)
    .split(" ")
    .map((word) => word.trim())
    .filter(Boolean);
};

const getBrandIntroConfig = (brandname = "", brandTitle = "Brand") => {
  const slug = normalizeText(brandname).replace(/\s+/g, "-");
  const title = brandTitle || getDisplayBrandName(brandname);

  if (slug.includes("apple")) {
    return {
      key: "apple",
      label: "Premium Store",
      title: "Apple Experience",
      text: "Products loading with cinematic reveal...",
      bg: "from-black via-gray-950 to-amber-950",
      primary: "text-amber-400",
      ring1: "border-amber-400/40",
      ring2: "border-orange-400/30",
      dot1: "bg-amber-300 shadow-[0_0_25px_rgba(251,191,36,1)]",
      dot2: "bg-orange-400 shadow-[0_0_25px_rgba(251,146,60,1)]",
      glow: "bg-amber-400/30",
      Logo: AppleLogo,
    };
  }

  if (slug.includes("samsung")) {
    return {
      key: "samsung",
      label: "Galaxy Store",
      title: "Samsung Universe",
      text: "Galaxy products entering with blue orbit reveal...",
      bg: "from-black via-blue-950 to-slate-950",
      primary: "text-blue-300",
      ring1: "border-blue-400/45",
      ring2: "border-cyan-400/30",
      dot1: "bg-blue-300 shadow-[0_0_25px_rgba(96,165,250,1)]",
      dot2: "bg-cyan-300 shadow-[0_0_25px_rgba(103,232,249,1)]",
      glow: "bg-blue-400/30",
      Logo: SamsungLogo,
    };
  }

  if (slug.includes("vivo")) {
    return {
      key: "vivo",
      label: "Smart Mobile Store",
      title: "Vivo Aura",
      text: "Vivo products loading with wave glow...",
      bg: "from-black via-indigo-950 to-violet-950",
      primary: "text-indigo-300",
      ring1: "border-indigo-400/45",
      ring2: "border-violet-400/30",
      dot1: "bg-indigo-300 shadow-[0_0_25px_rgba(129,140,248,1)]",
      dot2: "bg-violet-300 shadow-[0_0_25px_rgba(196,181,253,1)]",
      glow: "bg-indigo-400/30",
      Logo: VivoLogo,
    };
  }

  if (slug.includes("google") || slug.includes("pixel")) {
    return {
      key: "pixel",
      label: "Pixel Store",
      title: "Google Pixel Flow",
      text: "Pixel products loading with smart color motion...",
      bg: "from-black via-slate-950 to-emerald-950",
      primary: "text-emerald-300",
      ring1: "border-emerald-400/45",
      ring2: "border-yellow-400/30",
      dot1: "bg-emerald-300 shadow-[0_0_25px_rgba(110,231,183,1)]",
      dot2: "bg-yellow-300 shadow-[0_0_25px_rgba(253,224,71,1)]",
      glow: "bg-emerald-400/30",
      Logo: PixelLogo,
    };
  }

  if (slug.includes("xiaomi")) {
    return {
      key: "xiaomi",
      label: "Smart Tech Store",
      title: "Xiaomi Power",
      text: "Xiaomi products loading with orange speed reveal...",
      bg: "from-black via-orange-950 to-slate-950",
      primary: "text-orange-300",
      ring1: "border-orange-400/45",
      ring2: "border-yellow-400/30",
      dot1: "bg-orange-300 shadow-[0_0_25px_rgba(253,186,116,1)]",
      dot2: "bg-yellow-300 shadow-[0_0_25px_rgba(253,224,71,1)]",
      glow: "bg-orange-400/30",
      Logo: XiaomiLogo,
    };
  }

  if (slug.includes("nokia")) {
    return {
      key: "nokia",
      label: "Classic Mobile Store",
      title: "Nokia Signal",
      text: "Nokia products loading with signal wave animation...",
      bg: "from-black via-sky-950 to-blue-950",
      primary: "text-sky-300",
      ring1: "border-sky-400/45",
      ring2: "border-blue-400/30",
      dot1: "bg-sky-300 shadow-[0_0_25px_rgba(125,211,252,1)]",
      dot2: "bg-blue-300 shadow-[0_0_25px_rgba(147,197,253,1)]",
      glow: "bg-sky-400/30",
      Logo: NokiaLogo,
    };
  }

  if (slug.includes("nothing")) {
    return {
      key: "nothing",
      label: "Minimal Tech Store",
      title: "Nothing Glyph",
      text: "Nothing products loading with glyph light reveal...",
      bg: "from-black via-neutral-950 to-stone-950",
      primary: "text-white",
      ring1: "border-white/45",
      ring2: "border-gray-400/30",
      dot1: "bg-white shadow-[0_0_25px_rgba(255,255,255,1)]",
      dot2: "bg-gray-300 shadow-[0_0_25px_rgba(209,213,219,1)]",
      glow: "bg-white/25",
      Logo: NothingLogo,
    };
  }

  return {
    key: "generic",
    label: "Brand Store",
    title: `${title} Experience`,
    text: "Products loading with premium reveal...",
    bg: "from-black via-slate-950 to-orange-950",
    primary: "text-orange-300",
    ring1: "border-orange-400/45",
    ring2: "border-pink-400/30",
    dot1: "bg-orange-300 shadow-[0_0_25px_rgba(253,186,116,1)]",
    dot2: "bg-pink-300 shadow-[0_0_25px_rgba(249,168,212,1)]",
    glow: "bg-orange-400/30",
    Logo: (props) => <GenericBrandLogo {...props} title={title} />,
  };
};

const normalizeProduct = (product = {}) => {
  let rawImage =
    product.image ||
    product.productImage ||
    product.imageUrl ||
    product.img ||
    "";

  if (
    rawImage &&
    !rawImage.startsWith("http://") &&
    !rawImage.startsWith("https://")
  ) {
    rawImage = `${SERVER_BASE_URL}/uploads/${rawImage}`;
  } else if (!rawImage) {
    rawImage =
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' font-size='10' font-family='sans-serif' font-weight='bold' fill='%239ca3af' dominant-baseline='middle' text-anchor='middle'>No Image</text></svg>";
  }

  const productName = product.name || product.productName || "Product Name";
  const brandValue =
    product.brandname || product.BrandName || product.brand || "";

  const normalized = {
    ...product,
    id: product.id,
    name: productName,
    productName,
    brandname: String(brandValue).toLowerCase(),
    BrandName: brandValue,
    category: product.category || "",
    price: Number(product.price || 0),
    rating: Number(product.rating || 4.4),
    image: rawImage,
  };

  const searchSource = [
    normalized.name,
    normalized.productName,
    normalized.brandname,
    normalized.BrandName,
    normalized.category,
    normalized.price,
    normalized.rating,
    product.offer,
    product.description,
    product.model,
    product.storage,
    product.color,
    product.ram,
    product.rom,
  ]
    .filter(Boolean)
    .join(" ");

  normalized.searchIndex = normalizeText(searchSource);
  normalized.compactSearchIndex = compactText(searchSource);

  return normalized;
};

export default function ProductView({ bgToggle = false }) {
  const { brandname } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const brandFromState = location.state?.brand;

  const [brandProducts, setBrandProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showBrandIntro, setShowBrandIntro] = useState(false);
  const [productsReady, setProductsReady] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  const isFetchingRef = useRef(false);

  const brandTitle =
    brandFromState?.name || getDisplayBrandName(brandname || "Brand");

  const introConfig = useMemo(() => {
    return getBrandIntroConfig(brandname, brandTitle);
  }, [brandname, brandTitle]);

  const fetchBrandProducts = async (pageNumber = 1, isLoadMore = false) => {
    if (!brandname || isFetchingRef.current) return;

    try {
      isFetchingRef.current = true;

      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setProductsReady(false);
      }

      const response = await fetch(
        `${API_BASE_URL}/products/brand/${encodeURIComponent(
          brandname
        )}?page=${pageNumber}&limit=${PRODUCT_LIMIT}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Products loading failed");
      }

      const extracted = Array.isArray(data)
        ? data
        : data.products || data.data || [];

      const normalizedProducts = extracted.map(normalizeProduct);

      setBrandProducts((prev) => {
        if (pageNumber === 1) {
          return normalizedProducts;
        }

        const oldIds = new Set(prev.map((item) => item.id));

        const newProducts = normalizedProducts.filter(
          (item) => !oldIds.has(item.id)
        );

        return [...prev, ...newProducts];
      });

      setPage(pageNumber);
      setHasNextPage(Boolean(data.pagination?.hasNextPage));

      if (data.pagination?.totalProducts) {
        setTotalProducts(Number(data.pagination.totalProducts));
      }
    } catch (error) {
      console.error("❌ ProductView Error:", error);

      if (pageNumber === 1) {
        setBrandProducts([]);
        setHasNextPage(false);
        setTotalProducts(0);
      }
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setBrandProducts([]);
    setPage(1);
    setHasNextPage(true);
    setTotalProducts(0);
    setSearchText("");

    if (brandname) {
      fetchBrandProducts(1, false);
    }
  }, [brandname]);

  useEffect(() => {
    if (!loading) {
      setShowBrandIntro(true);
      setProductsReady(false);

      const introTimer = setTimeout(() => {
        setShowBrandIntro(false);
      }, 4000);

      const productTimer = setTimeout(() => {
        setProductsReady(true);
      }, 4150);

      return () => {
        clearTimeout(introTimer);
        clearTimeout(productTimer);
      };
    }
  }, [loading, brandname]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        loading ||
        loadingMore ||
        !hasNextPage ||
        searchText.trim() ||
        isFetchingRef.current
      ) {
        return;
      }

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const isNearBottom = scrollTop + windowHeight >= fullHeight - 600;

      if (isNearBottom) {
        fetchBrandProducts(page + 1, true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, hasNextPage, loading, loadingMore, searchText, brandname]);

  const normalizedSearch = useMemo(() => {
    return normalizeText(searchText);
  }, [searchText]);

  const compactSearch = useMemo(() => {
    return compactText(searchText);
  }, [searchText]);

  const searchWords = useMemo(() => {
    return getSearchWords(searchText);
  }, [searchText]);

  const searchedProducts = useMemo(() => {
    if (!normalizedSearch && !compactSearch) {
      return brandProducts;
    }

    return [...brandProducts]
      .map((product) => {
        const name = normalizeText(product.name);
        const productName = normalizeText(product.productName);
        const brand = normalizeText(product.brandname || product.BrandName);
        const category = normalizeText(product.category);

        const nameCompact = compactText(product.name);
        const productNameCompact = compactText(product.productName);
        const brandCompact = compactText(product.brandname || product.BrandName);
        const categoryCompact = compactText(product.category);

        const searchIndex = product.searchIndex || "";
        const compactSearchIndex =
          product.compactSearchIndex || compactText(searchIndex);

        const wordsMatch =
          searchWords.length === 0 ||
          searchWords.every((word) => searchIndex.includes(word));

        const compactMatch =
          compactSearch.length > 0 && compactSearchIndex.includes(compactSearch);

        if (!wordsMatch && !compactMatch) {
          return { product, score: 0 };
        }

        let score = 10;

        if (name === normalizedSearch) score += 150;
        if (productName === normalizedSearch) score += 150;

        if (name.startsWith(normalizedSearch)) score += 120;
        if (productName.startsWith(normalizedSearch)) score += 120;

        if (name.includes(normalizedSearch)) score += 90;
        if (productName.includes(normalizedSearch)) score += 90;

        if (brand === normalizedSearch) score += 70;
        if (brand.includes(normalizedSearch)) score += 50;

        if (category.includes(normalizedSearch)) score += 35;

        if (nameCompact === compactSearch) score += 160;
        if (productNameCompact === compactSearch) score += 160;

        if (nameCompact.startsWith(compactSearch)) score += 130;
        if (productNameCompact.startsWith(compactSearch)) score += 130;

        if (nameCompact.includes(compactSearch)) score += 110;
        if (productNameCompact.includes(compactSearch)) score += 110;

        if (brandCompact.includes(compactSearch)) score += 60;
        if (categoryCompact.includes(compactSearch)) score += 40;

        if (compactSearchIndex.includes(compactSearch)) score += 35;

        searchWords.forEach((word) => {
          if (name.includes(word)) score += 25;
          if (productName.includes(word)) score += 25;
          if (brand.includes(word)) score += 15;
          if (category.includes(word)) score += 10;
          if (searchIndex.includes(word)) score += 5;
        });

        return { product, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.product);
  }, [brandProducts, normalizedSearch, compactSearch, searchWords]);

  if (loading) {
    return (
      <div
        className={`min-h-screen pt-24 text-center transition-colors duration-500 ${
          bgToggle ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-950"
        }`}
      >
        <h2 className="text-xl font-black text-orange-500 animate-pulse">
          Loading {brandTitle} products...
        </h2>
      </div>
    );
  }

  const IntroLogo = introConfig.Logo;

  return (
    <div
      className={`relative min-h-screen overflow-hidden px-2 py-3 transition-colors duration-500 sm:px-5 sm:pt-24 lg:px-8 ${
        bgToggle ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-950"
      }`}
    >
      <style>{`
        @keyframes brandPortalZoom {
          0% {
            transform: scale(0.22) rotate(-18deg);
            opacity: 0;
            filter: blur(12px);
          }
          22% {
            transform: scale(1.08) rotate(0deg);
            opacity: 1;
            filter: blur(0px);
          }
          56% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          78% {
            transform: scale(1.3) rotate(5deg);
            opacity: 1;
          }
          100% {
            transform: scale(7.5) rotate(14deg);
            opacity: 0;
            filter: blur(18px);
          }
        }

        @keyframes brandRingPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.25);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.8);
            opacity: 0;
          }
        }

        @keyframes brandOrbit {
          0% {
            transform: rotate(0deg) translateX(120px) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: rotate(360deg) translateX(120px) rotate(-360deg);
            opacity: 0;
          }
        }

        @keyframes brandIntroText {
          0% {
            transform: translateY(18px);
            opacity: 0;
          }
          35% {
            transform: translateY(0);
            opacity: 1;
          }
          75% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-15px);
            opacity: 0;
          }
        }

        @keyframes brandLightSweep {
          0% {
            transform: translateX(-140%) rotate(20deg);
            opacity: 0;
          }
          35% {
            opacity: 1;
          }
          100% {
            transform: translateX(160%) rotate(20deg);
            opacity: 0;
          }
        }

        @keyframes productReveal {
          0% {
            opacity: 0;
            transform: translateY(28px) scale(0.98);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes logoSoftBounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.03);
          }
        }

        .brand-intro-overlay {
          animation: brandIntroText 4s ease-in-out both;
        }

        .brand-big-logo {
          animation: brandPortalZoom 4s cubic-bezier(.16, 1, .3, 1) both;
        }

        .brand-ring-one {
          animation: brandRingPulse 1.8s ease-out infinite;
        }

        .brand-ring-two {
          animation: brandRingPulse 1.8s ease-out .35s infinite;
        }

        .brand-ring-three {
          animation: brandRingPulse 1.8s ease-out .7s infinite;
        }

        .brand-orbit-dot-one {
          animation: brandOrbit 2.2s linear infinite;
        }

        .brand-orbit-dot-two {
          animation: brandOrbit 2.2s linear .3s infinite;
        }

        .brand-orbit-dot-three {
          animation: brandOrbit 2.2s linear .6s infinite;
        }

        .brand-light-sweep {
          animation: brandLightSweep 1.4s ease-in-out .65s both;
        }

        .products-reveal {
          animation: productReveal .75s cubic-bezier(.16, 1, .3, 1) both;
        }

        .logo-soft-bounce {
          animation: logoSoftBounce 2s ease-in-out infinite;
        }
      `}</style>

      {showBrandIntro && <BrandIntro bgToggle={bgToggle} config={introConfig} />}

      <div
        className={`transition duration-700 ${
          !productsReady
            ? "pointer-events-none opacity-0 scale-[0.98]"
            : "products-reveal opacity-100 scale-100"
        }`}
      >
        <section
          className={`relative mx-auto flex min-h-[140px] max-w-5xl flex-row items-center justify-between overflow-hidden rounded-3xl border p-5 shadow-sm sm:min-h-[160px] ${
            bgToggle
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="z-10 pr-4">
            <button
              onClick={() => navigate("/")}
              className="mb-3 rounded-full bg-gray-950 px-3 py-1.5 text-[11px] font-black text-white transition hover:bg-orange-600"
            >
              ← Back
            </button>

            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-orange-500">
              Brand Store
            </p>

            <h1 className="mt-1 text-2xl font-black sm:text-4xl">
              {brandTitle} Products
            </h1>

            <p
              className={`mt-1 text-xs font-semibold sm:text-sm ${
                bgToggle ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Loaded products:{" "}
              <span className="font-black text-orange-600">
                {brandProducts.length}
              </span>
              {totalProducts > 0 && (
                <>
                  {" "}
                  /{" "}
                  <span className="font-black text-orange-600">
                    {totalProducts}
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="z-10 flex items-center justify-center flex-shrink-0 pr-2 sm:pr-6">
            <IntroLogo
              className={`h-16 w-16 ${introConfig.primary} drop-shadow-sm sm:h-24 sm:w-24`}
            />
          </div>
        </section>

        <section
          className={`sticky top-0 z-40 mx-auto mt-4 max-w-5xl rounded-2xl border p-3 shadow-sm backdrop-blur sm:top-20 sm:mt-5 ${
            bgToggle
              ? "border-gray-800 bg-gray-900/95"
              : "border-gray-200 bg-white/95"
          }`}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full">
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={`Search loaded ${brandTitle} products...`}
                autoComplete="off"
                className={`w-full rounded-xl border px-4 py-3 pr-20 text-sm font-semibold outline-none transition ${
                  bgToggle
                    ? "border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-orange-500"
                    : "border-gray-200 bg-gray-50 text-gray-950 placeholder:text-gray-400 focus:border-orange-500"
                }`}
              />

              {searchText && (
                <button
                  onClick={() => setSearchText("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-black text-white transition hover:bg-orange-600"
                >
                  Clear
                </button>
              )}
            </div>

            <div
              className={`shrink-0 rounded-xl px-3 py-2 text-center text-xs font-black ${
                bgToggle
                  ? "bg-gray-800 text-gray-300"
                  : "bg-orange-50 text-orange-600"
              }`}
            >
              Showing {searchedProducts.length}
            </div>
          </div>

          {searchText && (
            <p
              className={`mt-2 text-[11px] font-semibold ${
                bgToggle ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Searching for:{" "}
              <span className="font-black text-orange-500">{searchText}</span>
            </p>
          )}
        </section>

        <main className="max-w-5xl mx-auto mt-4 sm:mt-6">
          {searchedProducts.length > 0 ? (
            <>
              <div className="flex flex-col gap-3.5 sm:gap-4">
                {searchedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id || `${product.productName}-${index}`}
                    product={product}
                    bgToggle={bgToggle}
                  />
                ))}
              </div>

              {loadingMore && (
                <div className="py-6 text-center">
                  <p className="text-sm font-black text-orange-500 animate-pulse">
                    Loading next 100 products...
                  </p>
                </div>
              )}

              {!loadingMore && !hasNextPage && !searchText && (
                <div className="py-6 text-center">
                  <p
                    className={`text-xs font-bold ${
                      bgToggle ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    All products loaded
                  </p>
                </div>
              )}

              {searchText && hasNextPage && (
                <div className="py-6 text-center">
                  <p
                    className={`text-xs font-bold ${
                      bgToggle ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Search current loaded products only. Clear search and scroll
                    to load more.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div
              className={`rounded-2xl border p-8 text-center shadow-sm ${
                bgToggle
                  ? "border-gray-800 bg-gray-900"
                  : "border-gray-200 bg-white"
              }`}
            >
              <h2 className="text-xl font-black">No products found</h2>

              <p
                className={`mt-2 text-sm font-semibold ${
                  bgToggle ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Example: apple16, apple 16, iphone16, 128gb nu search pannunga.
              </p>

              <button
                onClick={() => setSearchText("")}
                className="px-5 py-2 mt-4 text-sm font-black text-white transition bg-orange-500 rounded-xl hover:bg-orange-600"
              >
                Clear Search
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const BrandIntro = ({ config }) => {
  const Logo = config.Logo;

  return (
    <div className="brand-intro-overlay fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gray-950">
      <div className={`absolute inset-0 bg-gradient-to-br ${config.bg}`} />

      <div
        className={`brand-ring-one absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border ${config.ring1}`}
      />
      <div
        className={`brand-ring-two absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border ${config.ring2}`}
      />
      <div className="absolute -translate-x-1/2 -translate-y-1/2 border rounded-full brand-ring-three left-1/2 top-1/2 h-80 w-80 border-white/15" />

      <span
        className={`brand-orbit-dot-one absolute left-1/2 top-1/2 h-3 w-3 rounded-full ${config.dot1}`}
      />
      <span
        className={`brand-orbit-dot-two absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full ${config.dot2}`}
      />
      <span className="brand-orbit-dot-three absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-white shadow-[0_0_25px_rgba(255,255,255,1)]" />

      <div className="absolute inset-y-0 left-0 w-32 brand-light-sweep bg-white/20 blur-2xl" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative brand-big-logo">
          <div
            className={`absolute inset-0 rounded-full blur-3xl ${config.glow}`}
          />
          <Logo
            className={`relative h-36 w-36 ${config.primary} drop-shadow-[0_0_40px_rgba(255,255,255,0.35)] sm:h-48 sm:w-48`}
          />
        </div>

        <div className="-mt-2">
          <p
            className={`text-[10px] font-black uppercase tracking-[0.45em] sm:text-xs ${config.primary}`}
          >
            {config.label}
          </p>
          <h2 className="mt-2 text-2xl font-black text-white sm:text-4xl">
            {config.title}
          </h2>
          <p className="mt-2 text-xs font-semibold text-white/60 sm:text-sm">
            {config.text}
          </p>
        </div>
      </div>
    </div>
  );
};

const AppleLogo = ({ className = "" }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
    </svg>
  );
};

const SamsungLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="logo-soft-bounce rounded-full border-2 border-blue-300 bg-blue-600 px-5 py-3 text-[18px] font-black tracking-[0.18em] text-white shadow-[0_0_45px_rgba(59,130,246,0.95)] sm:px-7 sm:py-4 sm:text-2xl">
        SAMSUNG
      </div>
    </div>
  );
};

const VivoLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="logo-soft-bounce rounded-full border-2 border-indigo-300 bg-gradient-to-br from-blue-600 to-violet-600 px-6 py-3 text-2xl font-black tracking-[0.25em] text-white shadow-[0_0_45px_rgba(129,140,248,0.95)] sm:px-8 sm:py-4 sm:text-4xl">
        vivo
      </div>
    </div>
  );
};

const PixelLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="logo-soft-bounce grid h-28 w-28 grid-cols-2 overflow-hidden rounded-[2rem] border-2 border-white/40 shadow-[0_0_45px_rgba(110,231,183,0.8)] sm:h-36 sm:w-36">
        <span className="bg-blue-500" />
        <span className="bg-red-500" />
        <span className="bg-yellow-400" />
        <span className="bg-green-500" />
      </div>
    </div>
  );
};

const XiaomiLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="logo-soft-bounce flex h-28 w-28 items-center justify-center rounded-[2rem] border-2 border-orange-300 bg-orange-500 text-4xl font-black text-white shadow-[0_0_45px_rgba(251,146,60,0.9)] sm:h-36 sm:w-36 sm:text-5xl">
        MI
      </div>
    </div>
  );
};

const NokiaLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="logo-soft-bounce rounded-3xl border-2 border-sky-300 bg-gradient-to-br from-sky-600 to-blue-700 px-5 py-4 text-xl font-black tracking-[0.22em] text-white shadow-[0_0_45px_rgba(56,189,248,0.9)] sm:px-7 sm:py-5 sm:text-3xl">
        NOKIA
      </div>
    </div>
  );
};

const NothingLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="logo-soft-bounce flex h-28 w-28 items-center justify-center rounded-full border-2 border-white bg-black text-5xl font-black tracking-widest text-white shadow-[0_0_50px_rgba(255,255,255,0.8)] sm:h-36 sm:w-36 sm:text-6xl">
        N
      </div>
    </div>
  );
};

const GenericBrandLogo = ({ className = "", title = "Brand" }) => {
  const letter = String(title).trim().charAt(0).toUpperCase() || "B";

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="logo-soft-bounce flex h-28 w-28 items-center justify-center rounded-[2rem] border-2 border-orange-300 bg-gradient-to-br from-orange-500 to-pink-500 text-5xl font-black text-white shadow-[0_0_45px_rgba(249,115,22,0.9)] sm:h-36 sm:w-36 sm:text-6xl">
        {letter}
      </div>
    </div>
  );
};