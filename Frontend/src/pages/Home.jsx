import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Appleposter from "../assets/ChatGPT Image May 31, 2026, 07_08_14 PM.png";
import Samsungposter from "../assets/ChatGPT Image May 31, 2026, 07_12_21 PM.png";
import vivoposter from "../assets/ChatGPT Image May 31, 2026, 07_25_56 PM.png";
import googlepixcel from "../assets/ChatGPT Image May 31, 2026, 07_21_08 PM.png";
import XiaomiPoster from "../assets/ChatGPT Image May 31, 2026, 07_34_21 PM.png";
import NokiaPoster from "../assets/ChatGPT Image May 31, 2026, 07_44_40 PM.png";
import Nothingposter from "../assets/ChatGPT Image May 31, 2026, 07_54_37 PM.png";

import WalmartInc from "../assets/ChatGPT Image May 31, 2026, 08_30_07 PM.png";
import SchwarzGroup from "../assets/ChatGPT Image May 31, 2026, 08_32_23 PM.png";
import Costco from "../assets/ChatGPT Image May 31, 2026, 08_34_08 PM.png";
import RelianceFresh from "../assets/ChatGPT Image May 31, 2026, 08_36_35 PM.png";
import DMart from "../assets/ChatGPT Image May 31, 2026, 08_38_53 PM.png";
import BigBasket from "../assets/ChatGPT Image May 31, 2026, 08_41_07 PM.png";
import JioMart from "../assets/ChatGPT Image May 31, 2026, 08_50_14 PM.png";
import Blinkit from "../assets/ChatGPT Image May 31, 2026, 08_52_13 PM.png";
import Zepto from "../assets/ChatGPT Image May 31, 2026, 08_54_00 PM.png";
import Aldi from "../assets/ChatGPT Image May 31, 2026, 09_57_02 PM.png";
import Kroger from "../assets/ChatGPT Image May 31, 2026, 10_11_37 PM.png";

import f1 from "../assets/ChatGPT Image May 31, 2026, 10_54_14 PM.png";
import f2 from "../assets/ChatGPT Image May 31, 2026, 10_52_10 PM.png";
import f3 from "../assets/ChatGPT Image May 31, 2026, 10_50_25 PM.png";
import f4 from "../assets/ChatGPT Image May 31, 2026, 10_48_42 PM.png";
import f5 from "../assets/ChatGPT Image May 31, 2026, 10_46_28 PM.png";
import f6 from "../assets/ChatGPT Image May 31, 2026, 10_44_45 PM.png";
import f7 from "../assets/ChatGPT Image May 31, 2026, 10_43_03 PM.png";
import f8 from "../assets/ChatGPT Image May 31, 2026, 10_41_08 PM.png";
import f9 from "../assets/ChatGPT Image May 31, 2026, 10_39_21 PM.png";
import f10 from "../assets/ChatGPT Image May 31, 2026, 10_37_28 PM.png";
import f11 from "../assets/ChatGPT Image May 31, 2026, 11_20_15 PM.png";
import f12 from "../assets/ChatGPT Image May 31, 2026, 11_18_30 PM.png";
import f13 from "../assets/ChatGPT Image May 31, 2026, 11_16_30 PM.png";
import f14 from "../assets/ChatGPT Image May 31, 2026, 11_13_17 PM.png";
import f15 from "../assets/ChatGPT Image May 31, 2026, 11_11_04 PM.png";

import HA1 from "../assets/ChatGPT Image May 31, 2026, 11_34_14 PM.png";

import HA2 from "../assets/ChatGPT Image May 31, 2026, 11_37_45 PM.png";

import HA3 from "../assets/ChatGPT Image Jun 1, 2026, 11_45_00 AM.png";

import HA4 from "../assets/ChatGPT Image Jun 1, 2026, 11_49_08 AM.png";

import HA5 from "../assets/ChatGPT Image Jun 1, 2026, 11_52_18 AM.png";

import HA6 from "../assets/ChatGPT Image Jun 1, 2026, 11_55_28 AM.png";

import HA7 from "../assets/ChatGPT Image Jun 1, 2026, 12_02_02 PM.png";

import HA8 from "../assets/ChatGPT Image Jun 1, 2026, 11_59_52 AM.png"; 

import toy1 from "../assets/toy1.png"
import toy2 from "../assets/toy2.png"
import toy3 from "../assets/toy3.png"
import toy4 from "../assets/toy4.png"
import toy5 from "../assets/toy5.png"
import toy6 from "../assets/toy7.png"
import toy7 from "../assets/toy8.png"
import toy8 from "../assets/toy9.png"
import toy9 from "../assets/toyy6.png"
const API_BASE_URL = `${import.meta.env.VITE_API_URL}`;
const PREMIUM_BRANDS = [
  {
    name: "Apple",
    type: "Apple Premium Store",
    offer: "Apple products and accessories",
    tag: "Premium Store",
    badge: "Premium",
    poster: Appleposter,
  },
  {
    name: "SAMSUNG",
    type: "Electronics Store",
    offer: "Mobiles, laptops, TV and appliances",
    tag: "Top Electronics",
    badge: "Featured",
    poster: Samsungposter,
  },
  {
    name: "VIVO",
    type: "Electronics Megastore",
    offer: "Latest gadgets and home appliances",
    tag: "Mega Store",
    badge: "Sponsored",
    poster: vivoposter,
  },
  {
    name: "Google Pixel",
    type: "Mobile Retail Store",
    offer: "Mobiles, accessories and smart gadgets",
    tag: "Mobile Store",
    badge: "Trending",
    poster: googlepixcel,
  },
  {
    name: "Xiaomi",
    type: "Electronics Retail Store",
    offer: "Electronics, TV, laptop and home products",
    tag: "Electronics",
    badge: "Popular",
    poster: XiaomiPoster,
  },
  {
    name: "Nokia",
    type: "Mobile Store",
    offer: "Durable phones and mobile accessories",
    tag: "Mobile",
    badge: "Old Style",
    poster: NokiaPoster,
  },
  {
    name: "Nothing",
    type: "Mobile Store",
    offer: "Smartphones and tech accessories",
    tag: "Mobile",
    badge: "Style",
    poster: Nothingposter,
  },
];

const GROCERY_BRANDS = [
  {
    name: "Walmart",
    type: "Grocery Store",
    offer: "Fresh produce, daily essentials and grocery savings",
    tag: "Grocery",
    badge: "Fresh",
    poster: WalmartInc,
  },
  {
    name: "Schwarz",
    type: "Lidl & Kaufland Grocery",
    offer: "Fresh grocery, bakery, pantry and trusted value",
    tag: "Grocery",
    badge: "Value",
    poster: SchwarzGroup,
  },
  {
    name: "Costco",
    type: "Wholesale Grocery Store",
    offer: "Bulk grocery, pantry staples and member savings",
    tag: "Wholesale",
    badge: "Bulk",
    poster: Costco,
  },
  {
    name: "Reliance Fresh",
    type: "Fresh Grocery Store",
    offer: "Fresh fruits, vegetables and daily essentials",
    tag: "Fresh",
    badge: "Daily",
    poster: RelianceFresh,
  },
  {
    name: "D-Mart",
    type: "Value Grocery Store",
    offer: "Daily groceries, household items and low prices",
    tag: "Value",
    badge: "Savings",
    poster: DMart,
  },
  {
    name: "BigBasket",
    type: "Online Grocery Store",
    offer: "Online grocery delivery, fruits and pantry products",
    tag: "Online",
    badge: "Delivery",
    poster: BigBasket,
  },
  {
    name: "JioMart",
    type: "Online Grocery Store",
    offer: "Grocery delivery, daily essentials and great prices",
    tag: "Online",
    badge: "Reliance",
    poster: JioMart,
  },
  {
    name: "Blinkit",
    type: "Quick Commerce Grocery",
    offer: "Fast grocery delivery and daily essentials",
    tag: "Quick",
    badge: "10 Min",
    poster: Blinkit,
  },
  {
    name: "Zepto",
    type: "Quick Grocery Delivery",
    offer: "Fast groceries, snacks and daily needs",
    tag: "Quick",
    badge: "Fast",
    poster: Zepto,
  },
  {
    name: "Kroger",
    type: "Grocery Store",
    offer: "Fresh groceries, snacks and daily needs",
    tag: "Grocery",
    badge: "Fresh",
    poster: Kroger,
  },
  {
    name: "Aldi",
    type: "Grocery Store",
    offer: "Fresh groceries, snacks and daily needs",
    tag: "Grocery",
    badge: "Value",
    poster: Aldi,
  },
];

const FASHION_BRANDS = [
  {
    name: "Dior",
    type: "Luxury Fashion",
    offer: "Premium bags, fashion and lifestyle collection",
    tag: "Fashion",
    badge: "Luxury",
    poster: f1,
  },
  {
    name: "Cartier",
    type: "Luxury Fashion",
    offer: "Premium fashion and beauty collection",
    tag: "Fashion",
    badge: "Premium",
    poster: f2,
  },
  {
    name: "Uniqlo",
    type: "Sports Fashion",
    offer: "Shoes, sportswear and lifestyle products",
    tag: "Fashion",
    badge: "Sport",
    poster: f3,
  },
  {
    name: "Rolex",
    type: "Luxury Fashion",
    offer: "Luxury fashion and premium accessories",
    tag: "Fashion",
    badge: "Elite",
    poster: f4,
  },
  {
    name: "Adidas",
    type: "Fashion Store",
    offer: "Trending outfits and modern fashion",
    tag: "Fashion",
    badge: "Trend",
    poster: f5,
  },
  {
    name: "Zara",
    type: "Sports Fashion",
    offer: "Sportswear, shoes and performance style",
    tag: "Fashion",
    badge: "Sport",
    poster: f6,
  },
  {
    name: "Hermes",
    type: "Luxury Watch",
    offer: "Premium watches and luxury timepieces",
    tag: "Fashion",
    badge: "Watch",
    poster: f7,
  },
  {
    name: "Nike",
    type: "Fashion Store",
    offer: "Simple, clean and everyday fashion",
    tag: "Fashion",
    badge: "Daily",
    poster: f8,
  },
  {
    name: "Chanel",
    type: "Luxury Fashion",
    offer: "Jewellery, watches and luxury collection",
    tag: "Fashion",
    badge: "Luxury",
    poster: f9,
  },
  {
    name: "Louis Vuitton",
    type: "Luxury Fashion",
    offer: "Premium fashion and lifestyle collection",
    tag: "Fashion",
    badge: "Style",
    poster: f10,
  },
  {
    name: "Sabyasachi",
    type: "Luxury Fashion",
    offer: "Premium fashion and lifestyle collection",
    tag: "Fashion",
    badge: "Style",
    poster: f11,
  },
  {
    name: "Manyavar",
    type: "Luxury Fashion",
    offer: "Premium fashion and lifestyle collection",
    tag: "Fashion",
    badge: "Style",
    poster: f12,
  },
  {
    name: "Snitch",
    type: "Luxury Fashion",
    offer: "Premium fashion and lifestyle collection",
    tag: "Fashion",
    badge: "Style",
    poster: f13,
  },
  {
    name: "Peter England",
    type: "Luxury Fashion",
    offer: "Premium fashion and lifestyle collection",
    tag: "Fashion",
    badge: "Style",
    poster: f14,
  },
  {
    name: "Raymond",
    type: "Luxury Fashion",
    offer: "Premium fashion and lifestyle collection",
    tag: "Fashion",
    badge: "Style",
    poster: f15,
  },
];

const HOME_APPLIANCE_BRANDS = [
  {
    name: "LG",
    type: "Home Appliances",
    offer: "Smart TV, washing machine and home appliances",
    tag: "Home Appliances",
    badge: "Smart",
    poster: HA1,
  },
  {
    name: "Samsung Appliances",
    type: "Home Appliances",
    offer: "Refrigerator, AC, washing machine and smart devices",
    tag: "Home Appliances",
    badge: "Premium",
    poster: HA2,
  },
  {
    name: "Whirlpool",
    type: "Home Appliances",
    offer: "Fridge, washing machine and kitchen appliances",
    tag: "Home Appliances",
    badge: "Cooling",
    poster: HA3,
  },
  {
    name: "Godrej",
    type: "Home Appliances",
    offer: "Home appliances and storage solutions",
    tag: "Home Appliances",
    badge: "Trusted",
    poster: HA4,
  },
  {
    name: "Voltas",
    type: "Home Appliances",
    offer: "AC, cooling products and appliances",
    tag: "Home Appliances",
    badge: "AC",
    poster: HA5,
  },
  {
    name: "IFB",
    type: "Home Appliances",
    offer: "Washing machine, dishwasher and home products",
    tag: "Home Appliances",
    badge: "Clean",
    poster: HA6,
  },
  {
    name: "Haier",
    type: "Home Appliances",
    offer: "Premium kitchen and home appliances",
    tag: "Home Appliances",
    badge: "Premium",
    poster: HA7,
  },
  {
    name: "Panasonic",
    type: "Home Appliances",
    offer: "TV, electronics and home appliances",
    tag: "Home Appliances",
    badge: "Smart",
    poster: HA8,
  },
];


const TOY_BRANDS = [
  {
    name: "LEGO",
    type: "Toy Store",
    offer: "Creative blocks, building sets and fun collections",
    tag: "Toys",
    badge: "Build",
    poster: toy1,
  },
  {
    name: "Hot Wheels",
    type: "Toy Store",
    offer: "Cars, tracks and racing toy collections",
    tag: "Toys",
    badge: "Race",
    poster: toy2,
  },
  {
    name: "Barbie",
    type: "Toy Store",
    offer: "Dolls, accessories and pretend play sets",
    tag: "Toys",
    badge: "Play",
    poster: toy3,
  },
  {
    name: "Nerf",
    type: "Toy Store",
    offer: "Action toys, outdoor play and fun games",
    tag: "Toys",
    badge: "Action",
    poster: toy4,
  },
  {
    name: "Funskool",
    type: "Toy Store",
    offer: "Board games, puzzles and learning toys",
    tag: "Toys",
    badge: "Learn",
    poster: toy5,
  },
  {
    name: "Hamleys",
    type: "Toy Store",
    offer: "Premium toys, games and kids collections",
    tag: "Toys",
    badge: "Premium",
    poster: toy6,
  },
  {
    name: "Fisher Price",
    type: "Toy Store",
    offer: "Baby toys, learning toys and activity sets",
    tag: "Toys",
    badge: "Kids",
    poster: toy7,
  },
  {
    name: "Play-Doh",
    type: "Toy Store",
    offer: "Creative clay, art toys and craft fun",
    tag: "Toys",
    badge: "Craft",
    poster: toy8,
  },
  {
    name: "Toy Kingdom",
    type: "Toy Store",
    offer: "Toys, games and kids gift collections",
    tag: "Toys",
    badge: "Fun",
    poster: toy9,
  },
];

const PREMIUM_POSTERS = PREMIUM_BRANDS.map(({ name, type, poster }) => ({
  name,
  type,
  poster,
}));

const FILTERS = [
  "All",
  "Electronics",
  "Mobile",
  "Grocery",
  "Fresh",
  "Online",
  "Quick",
  "Value",
  "Fashion",
  "Home Appliances",
  "Toys",
];

const getBrandSlug = (brandName) => {
  return brandName
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const handleImageError = (event) => {
  event.currentTarget.style.display = "none";
};

const normalizeText = (value = "") => {
  return String(value).toLowerCase().trim().replace(/\s+/g, " ");
};

const createSearchIndex = (brand) => {
  return normalizeText(
    [brand.name, brand.type, brand.offer, brand.tag, brand.badge]
      .filter(Boolean)
      .join(" ")
  );
};

const addSearchIndex = (list) => {
  return list.map((brand) => ({
    ...brand,
    searchIndex: createSearchIndex(brand),
  }));
};

const matchesBrand = (brand, keyword, filterKeyword, activeFilter) => {
  const brandSearchIndex = brand.searchIndex || createSearchIndex(brand);

  const searchMatch = keyword.length === 0 || brandSearchIndex.includes(keyword);

  const filterMatch =
    activeFilter === "All" ||
    normalizeText([brand.name, brand.type, brand.offer, brand.tag, brand.badge].join(" ")).includes(filterKeyword);

  return searchMatch && filterMatch;
};

const useDebouncedValue = (value, delay = 180) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

const INDEXED_PREMIUM_BRANDS = addSearchIndex(PREMIUM_BRANDS);
const INDEXED_GROCERY_BRANDS = addSearchIndex(GROCERY_BRANDS);
const INDEXED_FASHION_BRANDS = addSearchIndex(FASHION_BRANDS);
const INDEXED_HOME_APPLIANCE_BRANDS = addSearchIndex(HOME_APPLIANCE_BRANDS);
const INDEXED_TOY_BRANDS = addSearchIndex(TOY_BRANDS);

const HOME_PRELOAD_IMAGES = Array.from(
  new Set(
    [
      ...PREMIUM_BRANDS,
      ...GROCERY_BRANDS,
      ...FASHION_BRANDS,
      ...HOME_APPLIANCE_BRANDS,
      ...TOY_BRANDS,
    ]
      .map((brand) => brand.poster)
      .filter(Boolean)
  )
);

const HOME_IMAGE_LOADED_CACHE = new Set();
const HOME_IMAGE_PROMISE_CACHE = new Map();
let PREMIUM_HUB_INTRO_PLAYED = false;

const preloadSingleImage = (src) => {
  if (!src) {
    return Promise.resolve({ src, success: false });
  }

  if (HOME_IMAGE_LOADED_CACHE.has(src)) {
    return Promise.resolve({ src, success: true, cached: true });
  }

  if (HOME_IMAGE_PROMISE_CACHE.has(src)) {
    return HOME_IMAGE_PROMISE_CACHE.get(src);
  }

  const promise = new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.loading = "eager";

    image.onload = async () => {
      try {
        if (image.decode) {
          await image.decode();
        }
      } catch {
        // Some browsers reject decode after successful load; ignore safely.
      }

      HOME_IMAGE_LOADED_CACHE.add(src);
      resolve({ src, success: true, cached: false });
    };

    image.onerror = () => {
      HOME_IMAGE_PROMISE_CACHE.delete(src);
      resolve({ src, success: false, cached: false });
    };

    image.src = src;
  });

  HOME_IMAGE_PROMISE_CACHE.set(src, promise);
  return promise;
};

const useImagePreloader = (imageSources = []) => {
  const uniqueSources = useMemo(() => {
    return Array.from(new Set(imageSources)).filter(Boolean);
  }, [imageSources]);

  const getCachedCount = useCallback(() => {
    return uniqueSources.filter((src) => HOME_IMAGE_LOADED_CACHE.has(src)).length;
  }, [uniqueSources]);

  const [loadedCount, setLoadedCount] = useState(() => getCachedCount());
  const [imagesReady, setImagesReady] = useState(() => {
    return uniqueSources.length === 0 || getCachedCount() === uniqueSources.length;
  });

  useEffect(() => {
    let cancelled = false;

    if (uniqueSources.length === 0) {
      setLoadedCount(0);
      setImagesReady(true);
      return undefined;
    }

    const cachedCount = getCachedCount();
    setLoadedCount(cachedCount);

    if (cachedCount === uniqueSources.length) {
      setImagesReady(true);
      return undefined;
    }

    setImagesReady(false);

    const preloadImages = async () => {
      const batchSize = 5;
      const pendingSources = uniqueSources.filter(
        (src) => !HOME_IMAGE_LOADED_CACHE.has(src)
      );

      for (let index = 0; index < pendingSources.length; index += batchSize) {
        const batch = pendingSources.slice(index, index + batchSize);

        await Promise.all(batch.map((src) => preloadSingleImage(src)));

        if (cancelled) return;

        setLoadedCount(getCachedCount());

        await new Promise((resolve) => requestAnimationFrame(resolve));
      }

      if (!cancelled) {
        setLoadedCount(uniqueSources.length);
        setImagesReady(true);
      }
    };

    preloadImages();

    return () => {
      cancelled = true;
    };
  }, [uniqueSources, getCachedCount]);

  const totalCount = uniqueSources.length;
  const progress =
    totalCount === 0 ? 100 : Math.round((loadedCount / totalCount) * 100);

  return {
    imagesReady,
    loadedCount,
    totalCount,
    progress,
  };
};

const useScrollPerformanceMode = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      document.body.classList.add("app-is-scrolling");
      setIsScrolling(true);

      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }

      scrollTimerRef.current = setTimeout(() => {
        document.body.classList.remove("app-is-scrolling");
        setIsScrolling(false);
      }, 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }

      document.body.classList.remove("app-is-scrolling");
    };
  }, []);

  return isScrolling;
};


const rotateThreeCards = (list) => {
  if (list.length < 3) return list;

  const updatedList = [...list];
  const selectedIndexes = [];

  while (selectedIndexes.length < 3) {
    const randomIndex = Math.floor(Math.random() * updatedList.length);

    if (!selectedIndexes.includes(randomIndex)) {
      selectedIndexes.push(randomIndex);
    }
  }

  const [firstIndex, secondIndex, thirdIndex] = selectedIndexes;

  const firstCard = updatedList[firstIndex];
  const secondCard = updatedList[secondIndex];
  const thirdCard = updatedList[thirdIndex];

  updatedList[secondIndex] = firstCard;
  updatedList[thirdIndex] = secondCard;
  updatedList[firstIndex] = thirdCard;

  return updatedList;
};

export default function Home({ bgToggle, setBgToggle }) {
  const navigate = useNavigate();
  const { imagesReady, loadedCount, totalCount, progress } = useImagePreloader(
    HOME_PRELOAD_IMAGES
  );
  const isScrolling = useScrollPerformanceMode();
  const [showPremiumIntro, setShowPremiumIntro] = useState(() => {
    return !PREMIUM_HUB_INTRO_PLAYED;
  });

  useEffect(() => {
    if (!imagesReady || !showPremiumIntro) return undefined;

    const introTimer = setTimeout(() => {
      PREMIUM_HUB_INTRO_PLAYED = true;
      setShowPremiumIntro(false);
    }, 2700);

    return () => clearTimeout(introTimer);
  }, [imagesReady, showPremiumIntro]);

  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activePoster, setActivePoster] = useState(0);
  const [homeApplianceBrands, setHomeApplianceBrands] = useState(
    INDEXED_HOME_APPLIANCE_BRANDS
  );

  const debouncedSearchText = useDebouncedValue(searchText, 220);

  const normalizedSearchText = useMemo(() => {
    return normalizeText(debouncedSearchText);
  }, [debouncedSearchText]);

  const normalizedActiveFilter = useMemo(() => {
    return normalizeText(activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const isDarkTheme = Boolean(bgToggle);

    document.documentElement.classList.toggle("dark", isDarkTheme);
    document.body.classList.toggle("dark", isDarkTheme);
    document.documentElement.style.colorScheme = isDarkTheme ? "dark" : "light";
    localStorage.setItem("bgToggle", String(isDarkTheme));

    window.dispatchEvent(
      new CustomEvent("app-theme-change", {
        detail: { dark: isDarkTheme },
      })
    );
  }, [bgToggle]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (document.hidden) return;

      setActivePoster((prev) =>
        prev === PREMIUM_POSTERS.length - 1 ? 0 : prev + 1
      );
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Performance fix: continuous shuffling re-mounted many image cards every few seconds.
  // That caused scroll jank/hang on low-end devices, so the home appliance grid stays stable.
  // Cards still keep hover transitions without forcing re-render during scroll.

  const filterBrandList = useCallback(
    (list) => {
      return list.filter((brand) =>
        matchesBrand(brand, normalizedSearchText, normalizedActiveFilter, activeFilter)
      );
    },
    [normalizedSearchText, normalizedActiveFilter, activeFilter]
  );

  const filteredPremiumBrands = useMemo(() => {
    return filterBrandList(INDEXED_PREMIUM_BRANDS);
  }, [filterBrandList]);

  const filteredGroceryBrands = useMemo(() => {
    return filterBrandList(INDEXED_GROCERY_BRANDS);
  }, [filterBrandList]);

  const filteredFashionBrands = useMemo(() => {
    return filterBrandList(INDEXED_FASHION_BRANDS);
  }, [filterBrandList]);

  const filteredHomeApplianceBrands = useMemo(() => {
    return filterBrandList(homeApplianceBrands);
  }, [homeApplianceBrands, filterBrandList]);

  const filteredToyBrands = useMemo(() => {
    return filterBrandList(INDEXED_TOY_BRANDS);
  }, [filterBrandList]);

  const handleThemeToggle = () => {
    setBgToggle((prevValue) => !prevValue);
  };
const handleBrandClick = async (brand) => {
  try {
    const brandSlug = getBrandSlug(brand.name);

    console.log("Sending brandname to backend:", brandSlug);

    const response = await fetch(
      `${API_BASE_URL}/products/brand/${encodeURIComponent(brandSlug)}`
    );

    const data = await response.json();

    console.log("Backend brand products:", data);

    navigate(`/brand/${brandSlug}`, {
      state: {
        brand,
        brandname: brandSlug,
        products: data.products || [],
      },
    });
  } catch (error) {
    console.error("Brand products fetch error:", error);

    const brandSlug = getBrandSlug(brand.name);

    navigate(`/brand/${brandSlug}`, {
      state: {
        brand,
        brandname: brandSlug,
        products: [],
      },
    });
  }
};

  const goPrevPoster = () => {
    setActivePoster((prev) =>
      prev === 0 ? PREMIUM_POSTERS.length - 1 : prev - 1
    );
  };

  const goNextPoster = () => {
    setActivePoster((prev) =>
      prev === PREMIUM_POSTERS.length - 1 ? 0 : prev + 1
    );
  };

  const isSearchingOrFiltering =
    normalizedSearchText.length > 0 || activeFilter !== "All";

  const getSectionPriority = (section) => {
    if (!isSearchingOrFiltering) return section.order;

    const searchHitsSection =
      normalizedSearchText.length > 0 &&
      section.searchIndex.includes(normalizedSearchText);

    const filterHitsSection =
      activeFilter !== "All" &&
      section.searchIndex.includes(normalizedActiveFilter);

    if (searchHitsSection || filterHitsSection) return -100 + section.order;

    return section.order;
  };

  const matchedBrandSections = [
    {
      id: "premium",
      order: 1,
      count: filteredPremiumBrands.length,
      searchIndex: "premium mobiles electronics mobile apple samsung vivo google pixel xiaomi nokia nothing",
      node: (
        <>
          <BrandBlockHeader
            title="Premium Mobiles"
            subtitle="Rectangle → Square, compact mobile/tablet order"
            count={filteredPremiumBrands.length}
            bgToggle={bgToggle}
            premium
          />

          <div className="grid items-stretch grid-cols-3 gap-2 mb-5 auto-rows-auto sm:grid-cols-6 sm:gap-3 lg:gap-4">
            {filteredPremiumBrands.map((brand, index) => (
              <PremiumBrandCard
                key={`${brand.name}-${index}`}
                brand={brand}
                index={index}
                onClick={() => handleBrandClick(brand)}
              />
            ))}
          </div>
        </>
      ),
    },
    {
      id: "grocery",
      order: 2,
      count: filteredGroceryBrands.length,
      searchIndex: "top grocery brands grocery fresh online quick value walmart schwarz costco reliance d-mart bigbasket jiomart blinkit zepto kroger aldi",
      node: (
        <>
          <BrandBlockHeader
            title="Top Grocery Brands"
            subtitle="Square grocery posters with smooth mobile animation"
            count={filteredGroceryBrands.length}
            bgToggle={bgToggle}
          />

          <div className="grid items-stretch grid-cols-2 gap-3 mb-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredGroceryBrands.map((brand, index) => (
              <GroceryBrandCard
                key={`${brand.name}-${index}`}
                brand={brand}
                index={index}
                onClick={() => handleBrandClick(brand)}
              />
            ))}
          </div>
        </>
      ),
    },
    {
      id: "fashion",
      order: 3,
      count: filteredFashionBrands.length,
      searchIndex: "top fashion brands fashion luxury dior cartier uniqlo rolex adidas zara hermes nike chanel louis vuitton sabyasachi manyavar snitch peter england raymond",
      node: (
        <>
          <BrandBlockHeader
            title="Top Fashion Brands"
            subtitle="Circle fashion posters with premium animation"
            count={filteredFashionBrands.length}
            bgToggle={bgToggle}
            fashion
          />

          <div className="grid items-start grid-cols-3 gap-4 mb-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
            {filteredFashionBrands.map((brand, index) => (
              <FashionBrandCircle
                key={`${brand.name}-${index}`}
                brand={brand}
                index={index}
                onClick={() => handleBrandClick(brand)}
              />
            ))}
          </div>
        </>
      ),
    },
    {
      id: "home-appliances",
      order: 4,
      count: filteredHomeApplianceBrands.length,
      searchIndex: "top home appliances home appliances lg samsung whirlpool godrej voltas ifb haier panasonic refrigerator ac washing machine tv",
      node: (
        <>
          <BrandBlockHeader
            title="Top Home Appliances"
            subtitle="Only 3 cards change places every 6 seconds"
            count={filteredHomeApplianceBrands.length}
            bgToggle={bgToggle}
            home
          />

          <div className="grid grid-cols-1 gap-4 mb-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {filteredHomeApplianceBrands.map((brand, index) => (
              <HomeApplianceParallelogram
                key={`${brand.name}-${index}`}
                brand={brand}
                index={index}
                onClick={() => handleBrandClick(brand)}
              />
            ))}
          </div>
        </>
      ),
    },
    {
      id: "toys",
      order: 5,
      count: filteredToyBrands.length,
      searchIndex: "top toy brands toys toy lego hot wheels barbie nerf funskool hamleys fisher price play-doh toy kingdom train",
      node: (
        <>
          <BrandBlockHeader
            title="Top Toy Brands"
            subtitle="Train animation: rectangle engine + square toy wagons"
            count={filteredToyBrands.length}
            bgToggle={bgToggle}
            toy
          />

          <div className="grid grid-cols-2 gap-3 mb-5 sm:grid-cols-3 lg:hidden">
            {filteredToyBrands.map((brand, index) => (
              <ToyMobileBoxCard
                key={`${brand.name}-${index}`}
                brand={brand}
                index={index}
                onClick={() => handleBrandClick(brand)}
              />
            ))}
          </div>

          <div className="toy-train-stage mb-5 hidden overflow-hidden rounded-[28px] border border-yellow-300/50 bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 px-4 py-7 shadow-sm lg:block">
            <div className="flex items-center gap-4 pr-4 w-max toy-train-row">
              {[...filteredToyBrands, ...filteredToyBrands].map((brand, index) => {
                const trainIndex = index % filteredToyBrands.length;
                const isEngine = trainIndex === 0;

                return (
                  <ToyBrandCard
                    key={`${brand.name}-${index}`}
                    brand={brand}
                    index={index}
                    isEngine={isEngine}
                    onClick={() => handleBrandClick(brand)}
                  />
                );
              })}
            </div>
          </div>
        </>
      ),
    },
  ]
    .filter((section) => section.count > 0)
    .sort((firstSection, secondSection) => {
      const priorityDiff =
        getSectionPriority(firstSection) - getSectionPriority(secondSection);

      if (priorityDiff !== 0) return priorityDiff;

      return secondSection.count - firstSection.count;
    });

  if (!imagesReady) {
    return (
      <HomeImagePreloader
        bgToggle={bgToggle}
        progress={progress}
        loadedCount={loadedCount}
        totalCount={totalCount}
      />
    );
  }

  if (showPremiumIntro) {
    return <PremiumHubOpeningAnimation bgToggle={bgToggle} />;
  }

  return (
    <div
      className={`home-optimized min-h-screen transition-colors duration-500 ${
        isScrolling ? "home-scroll-active" : ""
      } ${
        bgToggle ? "bg-gray-950 text-white" : "bg-gray-50 text-black"
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


        @keyframes chainIdleSwing {
          0%, 100% { transform: rotate(-0.8deg); }
          50% { transform: rotate(0.8deg); }
        }

        @keyframes chainKnobGlow {
          0%, 100% { box-shadow: 0 12px 26px rgba(148, 163, 184, 0.35); }
          50% { box-shadow: 0 18px 42px rgba(226, 232, 240, 0.55); }
        }

        @keyframes chainHintBounce {
          0%, 100% { transform: translateY(0px); opacity: 0.72; }
          50% { transform: translateY(5px); opacity: 1; }
        }

        .chain-theme-wrap {
          animation: chainIdleSwing 3.6s ease-in-out infinite;
          transform-origin: top center;
        }

        .chain-theme-knob {
          animation: chainKnobGlow 2.4s ease-in-out infinite;
        }

        .chain-pull-hint {
          animation: chainHintBounce 1.45s ease-in-out infinite;
        }

        .chain-link {
          position: relative;
          width: 10px;
          height: 17px;
          margin-top: -3px;
          border: 2px solid #cbd5e1;
          border-radius: 999px;
          background: linear-gradient(145deg, rgba(255,255,255,.95), rgba(148,163,184,.28));
          box-shadow:
            inset 0 1px 2px rgba(255,255,255,.95),
            inset 0 -2px 3px rgba(15,23,42,.22),
            0 1px 2px rgba(15,23,42,.18);
        }

        .chain-link:nth-child(even) {
          transform: rotate(90deg);
        }

        .chain-link-dark {
          border-color: #94a3b8;
          background: linear-gradient(145deg, rgba(248,250,252,.82), rgba(71,85,105,.52));
        }

        .chain-link-light {
          border-color: #cbd5e1;
          background: linear-gradient(145deg, rgba(255,255,255,.98), rgba(148,163,184,.30));
        }

        .chain-extension {
          transition: height 0.2s ease;
        }

        .chain-vertical-handle {
          background:
            linear-gradient(90deg, rgba(255,255,255,.85), transparent 18%, transparent 82%, rgba(15,23,42,.18)),
            linear-gradient(145deg, #f8fafc, #94a3b8 52%, #e2e8f0);
          box-shadow:
            inset 0 2px 3px rgba(255,255,255,.8),
            inset 0 -4px 7px rgba(15,23,42,.24),
            0 12px 28px rgba(15,23,42,.25);
        }

        @keyframes premiumFloat {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        @keyframes groceryFloat {
          0%,100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-4px) scale(1.01); }
        }

        @keyframes fashionPulse {
          0%,100% {
            transform: translateY(0px) scale(1);
            box-shadow: 0 10px 25px rgba(236, 72, 153, 0.18);
          }
          50% {
            transform: translateY(-5px) scale(1.03);
            box-shadow: 0 18px 35px rgba(236, 72, 153, 0.32);
          }
        }

        @keyframes haFloat {
          0%,100% {
            transform: skewX(-10deg) translateY(0px);
          }
          50% {
            transform: skewX(-10deg) translateY(-5px);
          }
        }

        @keyframes haShuffleIn {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.94);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }

        @keyframes haGlow {
          0%,100% {
            opacity: .25;
            transform: scale(1);
          }
          50% {
            opacity: .75;
            transform: scale(1.08);
          }
        }

        @keyframes toyTrainMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes toyWagonFloat {
          0%,100% {
            transform: translateY(0px) rotate(-0.5deg);
          }
          50% {
            transform: translateY(-6px) rotate(0.8deg);
          }
        }

        @keyframes toyWheelSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes toyPop {
          0%,100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        @keyframes toyMobileBounce {
          0%,100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-5px) scale(1.02);
          }
        }

        @keyframes toyMobileGlow {
          0%,100% {
            opacity: .28;
            transform: scale(1);
          }
          50% {
            opacity: .75;
            transform: scale(1.08);
          }
        }

        @keyframes toySpinFloat {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: .55;
          }
          50% {
            transform: translateY(-8px) rotate(16deg);
            opacity: 1;
          }
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: .55;
          }
        }

        @keyframes toySmokeFloat {
          0% {
            transform: translateY(0px) scale(.7);
            opacity: .15;
          }
          50% {
            transform: translateY(-14px) scale(1.1);
            opacity: .55;
          }
          100% {
            transform: translateY(-24px) scale(1.35);
            opacity: 0;
          }
        }

        @keyframes circleGlow {
          0%,100% {
            opacity: .35;
            transform: scale(1);
          }
          50% {
            opacity: .75;
            transform: scale(1.08);
          }
        }

        @keyframes premiumGlow {
          0%,100% { opacity: .15; transform: scale(1); }
          50% { opacity: .38; transform: scale(1.02); }
        }

        @keyframes shineMove {
          0% { transform: translateX(-160%) rotate(18deg); }
          100% { transform: translateX(160%) rotate(18deg); }
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

        .premium-float {
          animation: premiumFloat 3s ease-in-out infinite;
        }

        .grocery-float {
          animation: groceryFloat 3.2s ease-in-out infinite;
        }

        .fashion-circle {
          animation: fashionPulse 3s ease-in-out infinite;
        }

        .ha-card {
          animation: haFloat 3.2s ease-in-out infinite;
        }

        .toy-train-stage {
          position: relative;
        }

        .toy-train-stage::before,
        .toy-train-stage::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 5px;
          border-radius: 999px;
          background: repeating-linear-gradient(90deg, rgba(120,53,15,.75) 0 20px, rgba(251,191,36,.95) 20px 34px);
          z-index: 4;
          opacity: .85;
        }

        .toy-train-stage::before {
          top: 14px;
        }

        .toy-train-stage::after {
          bottom: 14px;
        }

        .toy-train-row {
          animation: toyTrainMove 24s linear infinite;
        }

        .toy-train-stage:hover .toy-train-row {
          animation-play-state: paused;
        }

        .toy-card {
          animation: toyWagonFloat 3s ease-in-out infinite;
        }

        .toy-wheel {
          animation: toyWheelSpin 1.4s linear infinite;
        }

        .toy-pop {
          animation: toyPop 2.2s ease-in-out infinite;
        }

        .toy-mobile-card {
          animation: toyMobileBounce 2.8s ease-in-out infinite;
        }

        .toy-mobile-glow {
          animation: toyMobileGlow 2.4s ease-in-out infinite;
        }

        .toy-icon-float {
          animation: toySpinFloat 2.8s ease-in-out infinite;
        }

        .toy-smoke {
          animation: toySmokeFloat 2.4s ease-in-out infinite;
        }

        .ha-shuffle-enter {
          animation: haShuffleIn .55s ease-out both;
        }

        .ha-glow {
          animation: haGlow 2.8s ease-in-out infinite;
        }

        .circle-glow {
          animation: circleGlow 2.6s ease-in-out infinite;
        }

        .premium-glow {
          animation: premiumGlow 2.5s ease-in-out infinite;
        }

        .premium-shine {
          animation: shineMove 4s ease-in-out infinite;
        }

        .premium-card:nth-child(2),
        .grocery-card:nth-child(2),
        .fashion-card:nth-child(2),
        .ha-card:nth-child(2),
        .toy-card:nth-child(2) {
          animation-delay: .2s;
        }

        .premium-card:nth-child(3),
        .grocery-card:nth-child(3),
        .fashion-card:nth-child(3),
        .ha-card:nth-child(3),
        .toy-card:nth-child(3) {
          animation-delay: .4s;
        }

        .premium-card:nth-child(4),
        .grocery-card:nth-child(4),
        .fashion-card:nth-child(4),
        .ha-card:nth-child(4),
        .toy-card:nth-child(4) {
          animation-delay: .6s;
        }

        .premium-card:nth-child(5),
        .grocery-card:nth-child(5),
        .fashion-card:nth-child(5),
        .ha-card:nth-child(5),
        .toy-card:nth-child(5) {
          animation-delay: .8s;
        }

        .premium-card:nth-child(6),
        .grocery-card:nth-child(6),
        .fashion-card:nth-child(6),
        .ha-card:nth-child(6),
        .toy-card:nth-child(6) {
          animation-delay: 1s;
        }

        .premium-image {
          image-rendering: auto;
          backface-visibility: hidden;
          transform: translateZ(0);
        }


        /* ==========================
           ADVANCED NO-LAG MODE
           ========================== */
        .home-optimized img {
          content-visibility: auto;
          transform: translateZ(0);
          backface-visibility: hidden;
          contain: paint;
        }

        .home-optimized .premium-card,
        .home-optimized .grocery-card,
        .home-optimized .fashion-card,
        .home-optimized .ha-card,
        .home-optimized .toy-card,
        .home-optimized .toy-mobile-card {
          transform: translateZ(0);
          backface-visibility: hidden;
          contain: layout paint style;
        }

        /* Real-time apps avoid infinite animations on big image grids.
           Intro animation runs once; card animations are disabled after that for smooth scroll. */
        .home-optimized .premium-float,
        .home-optimized .grocery-float,
        .home-optimized .fashion-circle,
        .home-optimized .ha-card,
        .home-optimized .toy-card,
        .home-optimized .toy-mobile-card,
        .home-optimized .toy-mobile-glow,
        .home-optimized .toy-icon-float,
        .home-optimized .toy-pop,
        .home-optimized .circle-glow,
        .home-optimized .premium-glow,
        .home-optimized .premium-shine,
        .home-optimized .ha-glow,
        .home-optimized .toy-train-row,
        .home-optimized .toy-wheel,
        .home-optimized .toy-smoke {
          animation: none !important;
        }

        .home-optimized .toy-train-row {
          transform: translate3d(0, 0, 0) !important;
        }

        .home-scroll-active *,
        .app-is-scrolling * {
          animation-play-state: paused !important;
        }

        .home-scroll-active .premium-card,
        .home-scroll-active .grocery-card,
        .home-scroll-active .fashion-card,
        .home-scroll-active .ha-card,
        .home-scroll-active .toy-card,
        .home-scroll-active .toy-mobile-card {
          transition-duration: 0ms !important;
        }

        .home-section-virtual {
          content-visibility: auto;
          contain-intrinsic-size: 800px;
          contain: layout paint style;
        }


        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* ==========================
           SCROLL PERFORMANCE FIX
           ========================== */
        .premium-card,
        .grocery-card,
        .fashion-card,
        .ha-card,
        .toy-card,
        .toy-mobile-card,
        .premium-image {
          contain: layout paint style;
        }

        .premium-card,
        .grocery-card,
        .fashion-card,
        .ha-card,
        .toy-mobile-card {
          content-visibility: auto;
          contain-intrinsic-size: 180px;
        }

        .premium-image {
          transform: translateZ(0);
          will-change: auto;
        }

        /* Stop always-running animations while scrolling on mobile/tablet */
        @media (max-width: 1023px) {
          .premium-float,
          .grocery-float,
          .fashion-circle,
          .ha-card,
          .toy-mobile-card,
          .toy-mobile-glow,
          .toy-icon-float,
          .toy-pop,
          .circle-glow,
          .premium-glow,
          .premium-shine,
          .ha-glow {
            animation: none !important;
          }

          .premium-card:hover,
          .grocery-card:hover,
          .toy-mobile-card:hover,
          .fashion-card:hover {
            transform: none !important;
          }
        }

        /* Laptop train animation speed reduce to avoid GPU pressure */
        .toy-train-row {
          animation-duration: 52s !important;
          will-change: transform;
        }

        .toy-wheel,
        .toy-smoke,
        .toy-icon-float,
        .toy-pop {
          will-change: auto;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            scroll-behavior: auto !important;
          }
        }

      `}</style>

      <div className="w-full px-2 py-3 sm:px-4 sm:py-5 lg:px-6 lg:py-6">
        {!isSearchingOrFiltering && (
          <PremiumPosterSlider
            posters={PREMIUM_POSTERS}
            activePoster={activePoster}
            setActivePoster={setActivePoster}
            goPrevPoster={goPrevPoster}
            goNextPoster={goNextPoster}
            bgToggle={bgToggle}
            onPosterClick={handleBrandClick}
          />
        )}

        <ThemeRopeToggle bgToggle={bgToggle} onToggle={handleThemeToggle} />

        {!isSearchingOrFiltering && (
        <section
          className={`mb-4 hidden overflow-hidden rounded-2xl border shadow-sm sm:mb-5 sm:block sm:rounded-3xl ${
            bgToggle
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="relative p-3 overflow-hidden sm:p-4 lg:p-5">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-pink-500/10" />

            <div className="relative z-10 grid gap-3 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-orange-500 sm:text-xs">
                  Premium Header
                </p>

                <h1 className="max-w-3xl mt-1 text-xl font-black leading-tight tracking-tight sm:text-2xl lg:text-3xl">
                  Premium brand posters
                </h1>

                <p
                  className={`mt-2 max-w-2xl text-xs font-medium leading-5 sm:text-sm ${
                    bgToggle ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Mobile, grocery, fashion and home appliance brand posters.
                </p>
              </div>

              <div
                className={`rounded-2xl border p-3 sm:p-4 ${
                  bgToggle
                    ? "border-gray-800 bg-gray-950/70"
                    : "border-gray-200 bg-white/80"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p
                      className={`text-[11px] font-bold ${
                        bgToggle ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Total Stores
                    </p>
                    <h2 className="mt-1 text-2xl font-black">
                      {PREMIUM_BRANDS.length +
                        GROCERY_BRANDS.length +
                        FASHION_BRANDS.length +
                        HOME_APPLIANCE_BRANDS.length +
                        TOY_BRANDS.length}
                      +
                    </h2>
                  </div>

                  <div className="flex items-center justify-center text-lg font-black text-white bg-orange-500 shadow-lg h-11 w-11 rounded-xl">
                    B
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        )}

        <section
          className={`sticky top-0 z-30 mb-4 rounded-2xl border p-3 shadow-sm sm:top-2 sm:mb-5 ${
            bgToggle
              ? "border-gray-800 bg-gray-900/95"
              : "border-gray-200 bg-white/95"
          }`}
        >
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search brands by name, type, offer, tag..."
              autoComplete="off"
              className={`w-full rounded-xl border px-3 py-2.5 text-xs font-semibold outline-none transition sm:text-sm ${
                bgToggle
                  ? "border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-orange-500"
                  : "border-gray-200 bg-gray-50 text-black placeholder:text-gray-400 focus:border-orange-500"
              }`}
            />

            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 rounded-full px-3 py-2 text-[11px] font-black transition ${
                    activeFilter === filter
                      ? "bg-orange-500 text-white shadow"
                      : bgToggle
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {isSearchingOrFiltering ? (
          matchedBrandSections.length > 0 ? (
            matchedBrandSections.map((section) => (
              <div key={section.id}>{section.node}</div>
            ))
          ) : (
            <EmptyBlock bgToggle={bgToggle} text="No matching brands found" />
          )
        ) : (
          <>

        <BrandBlockHeader
          title="Premium Mobiles"
          subtitle="Rectangle → Square, compact mobile/tablet order"
          count={filteredPremiumBrands.length}
          bgToggle={bgToggle}
          premium
        />

        {filteredPremiumBrands.length > 0 ? (
          <div className="grid items-stretch grid-cols-3 gap-2 mb-5 auto-rows-auto sm:grid-cols-6 sm:gap-3 lg:gap-4">
            {filteredPremiumBrands.map((brand, index) => (
              <PremiumBrandCard
                key={`${brand.name}-${index}`}
                brand={brand}
                index={index}
                onClick={() => handleBrandClick(brand)}
              />
            ))}
          </div>
        ) : (
          <EmptyBlock bgToggle={bgToggle} text="No premium brands found" />
        )}

        <BrandBlockHeader
          title="Top Grocery Brands"
          subtitle="Square grocery posters with smooth mobile animation"
          count={filteredGroceryBrands.length}
          bgToggle={bgToggle}
        />

        {filteredGroceryBrands.length > 0 ? (
          <div className="grid items-stretch grid-cols-2 gap-3 mb-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredGroceryBrands.map((brand, index) => (
              <GroceryBrandCard
                key={`${brand.name}-${index}`}
                brand={brand}
                index={index}
                onClick={() => handleBrandClick(brand)}
              />
            ))}
          </div>
        ) : (
          <EmptyBlock bgToggle={bgToggle} text="No grocery brands found" />
        )}

        <BrandBlockHeader
          title="Top Fashion Brands"
          subtitle="Circle fashion posters with premium animation"
          count={filteredFashionBrands.length}
          bgToggle={bgToggle}
          fashion
        />

        {filteredFashionBrands.length > 0 ? (
          <div className="grid items-start grid-cols-3 gap-4 mb-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
            {filteredFashionBrands.map((brand, index) => (
              <FashionBrandCircle
                key={`${brand.name}-${index}`}
                brand={brand}
                index={index}
                onClick={() => handleBrandClick(brand)}
              />
            ))}
          </div>
        ) : (
          <EmptyBlock bgToggle={bgToggle} text="No fashion brands found" />
        )}

        <BrandBlockHeader
          title="Top Home Appliances"
          subtitle="Only 3 cards change places every 6 seconds"
          count={filteredHomeApplianceBrands.length}
          bgToggle={bgToggle}
          home
        />

        {filteredHomeApplianceBrands.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {filteredHomeApplianceBrands.map((brand, index) => (
              <HomeApplianceParallelogram
                key={`${brand.name}-${index}`}
                brand={brand}
                index={index}
                onClick={() => handleBrandClick(brand)}
              />
            ))}
          </div>
        ) : (
          <EmptyBlock
            bgToggle={bgToggle}
            text="No home appliance brands found"
          />
        )}

        <BrandBlockHeader
          title="Top Toy Brands"
          subtitle="Train animation: rectangle engine + square toy wagons"
          count={filteredToyBrands.length}
          bgToggle={bgToggle}
          toy
        />

        {filteredToyBrands.length > 0 ? (
          <>
            {/* Mobile + tablet: normal box format, no train moving */}
            <div className="grid grid-cols-2 gap-3 mb-5 sm:grid-cols-3 lg:hidden">
              {filteredToyBrands.map((brand, index) => (
                <ToyMobileBoxCard
                  key={`${brand.name}-${index}`}
                  brand={brand}
                  index={index}
                  onClick={() => handleBrandClick(brand)}
                />
              ))}
            </div>

            {/* Laptop/Desktop only: train moving animation */}
            <div className="toy-train-stage mb-5 hidden overflow-hidden rounded-[28px] border border-yellow-300/50 bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 px-4 py-7 shadow-sm lg:block">
              <div className="flex items-center gap-4 pr-4 w-max toy-train-row">
                {[...filteredToyBrands, ...filteredToyBrands].map((brand, index) => {
                  const trainIndex = index % filteredToyBrands.length;
                  const isEngine = trainIndex === 0;

                  return (
                    <ToyBrandCard
                      key={`${brand.name}-${index}`}
                      brand={brand}
                      index={index}
                      isEngine={isEngine}
                      onClick={() => handleBrandClick(brand)}
                    />
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <EmptyBlock bgToggle={bgToggle} text="No toy brands found" />
        )}

          </>
        )}
      </div>
    </div>
  );
}



const PremiumHubOpeningAnimation = ({ bgToggle }) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden px-5 transition-colors duration-500 ${
        bgToggle
          ? "bg-gradient-to-br from-gray-950 via-slate-950 to-black text-white"
          : "bg-gradient-to-br from-white via-orange-50 to-slate-100 text-slate-950"
      }`}
    >
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-[-10%] top-[-15%] h-80 w-80 rounded-full bg-orange-500/25 blur-3xl premium-hub-orb-one" />
        <div className="absolute bottom-[-16%] right-[-10%] h-96 w-96 rounded-full bg-pink-500/20 blur-3xl premium-hub-orb-two" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl premium-hub-orb-three" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl text-center premium-hub-stage">
        <div className="premium-hub-logo-shell relative flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/25 bg-white/10 shadow-2xl backdrop-blur-xl sm:h-36 sm:w-36 sm:rounded-[2.5rem]">
          <span className="premium-hub-ring absolute inset-[-18px] rounded-[2.8rem] border border-orange-400/50" />
          <span className="premium-hub-ring-two absolute inset-[-34px] rounded-[3.4rem] border border-pink-400/35" />
          <span className="absolute inset-y-0 left-0 w-12 -skew-x-12 premium-hub-shine bg-white/35 blur-xl" />

          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-[1.6rem] bg-gradient-to-br from-orange-500 via-pink-500 to-slate-950 text-4xl font-black text-white shadow-xl sm:h-24 sm:w-24 sm:text-5xl">
            P
          </div>
        </div>

        <div className="mt-8 premium-hub-text">
          <p className="text-[11px] font-black uppercase tracking-[0.34em] text-orange-500 sm:text-xs">
            Welcome to
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 bg-clip-text sm:text-6xl">
            Premium Hub
          </h1>
          <p
            className={`mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 sm:text-base ${
              bgToggle ? "text-gray-300" : "text-slate-600"
            }`}
          >
            Posters are ready. Opening a smooth shopping experience without repeated image loading.
          </p>
        </div>

        <div className="w-full max-w-sm p-1 mt-8 rounded-full shadow-inner premium-hub-loader bg-white/20">
          <div className="h-3 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500" />
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-orange-500">
          <span className="w-2 h-2 bg-orange-500 rounded-full premium-hub-dot" />
          <span className="w-2 h-2 bg-pink-500 rounded-full premium-hub-dot" />
          <span className="w-2 h-2 rounded-full premium-hub-dot bg-sky-500" />
        </div>
      </div>

      <style>{`
        @keyframes premiumHubStageIn {
          0% { opacity: 0; transform: translateY(28px) scale(.94); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        @keyframes premiumHubLogoPop {
          0% { transform: scale(.55) rotate(-12deg); opacity: 0; }
          55% { transform: scale(1.08) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        @keyframes premiumHubRingSpin {
          from { transform: rotate(0deg) scale(1); opacity: .35; }
          50% { transform: rotate(180deg) scale(1.04); opacity: .8; }
          to { transform: rotate(360deg) scale(1); opacity: .35; }
        }

        @keyframes premiumHubShineMove {
          0% { transform: translateX(-180%) skewX(-12deg); opacity: 0; }
          35% { opacity: .9; }
          100% { transform: translateX(280%) skewX(-12deg); opacity: 0; }
        }

        @keyframes premiumHubTextIn {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes premiumHubLoader {
          0% { width: 0%; }
          70% { width: 84%; }
          100% { width: 100%; }
        }

        @keyframes premiumHubOrbFloat {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(18px,-18px,0) scale(1.08); }
        }

        @keyframes premiumHubDotPulse {
          0%, 100% { opacity: .25; transform: scale(.75); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .premium-hub-stage { animation: premiumHubStageIn .75s cubic-bezier(.2,1,.3,1) both; }
        .premium-hub-logo-shell { animation: premiumHubLogoPop .9s cubic-bezier(.2,1.4,.3,1) both; }
        .premium-hub-ring { animation: premiumHubRingSpin 2.4s linear infinite; }
        .premium-hub-ring-two { animation: premiumHubRingSpin 3.2s linear infinite reverse; }
        .premium-hub-shine { animation: premiumHubShineMove 1.9s ease-in-out infinite; }
        .premium-hub-text { animation: premiumHubTextIn .8s ease-out .35s both; }
        .premium-hub-loader > div { animation: premiumHubLoader 2.25s ease-in-out both; }
        .premium-hub-orb-one, .premium-hub-orb-two, .premium-hub-orb-three { animation: premiumHubOrbFloat 3s ease-in-out infinite; }
        .premium-hub-dot { animation: premiumHubDotPulse 1s ease-in-out infinite; }
        .premium-hub-dot:nth-child(2) { animation-delay: .18s; }
        .premium-hub-dot:nth-child(3) { animation-delay: .36s; }
      `}</style>
    </div>
  );
};



const HomeImagePreloader = ({ bgToggle, progress, loadedCount, totalCount }) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex min-h-screen items-center justify-center px-5 transition-colors duration-500 ${
        bgToggle
          ? "bg-gradient-to-br from-gray-950 via-slate-950 to-black text-white"
          : "bg-gradient-to-br from-orange-50 via-white to-slate-100 text-slate-950"
      }`}
    >
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-[2rem] border p-6 text-center shadow-2xl ${
          bgToggle
            ? "border-white/10 bg-white/[0.06] shadow-black/40"
            : "border-white bg-white/90 shadow-slate-200/80"
        }`}
      >
        <div className="absolute rounded-full -left-16 -top-16 h-36 w-36 bg-orange-500/20 blur-3xl" />
        <div className="absolute rounded-full -bottom-16 -right-16 h-36 w-36 bg-sky-500/20 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center justify-center w-16 h-16 mx-auto text-2xl font-black text-white shadow-xl rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500">
            P
          </div>

          <p className="mt-5 text-[11px] font-black uppercase tracking-[0.25em] text-orange-500">
            Premium Hub
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Preparing posters once
          </h2>

          <p
            className={`mt-2 text-sm font-semibold ${
              bgToggle ? "text-gray-300" : "text-slate-600"
            }`}
          >
            Images are being decoded and cached before the page opens.
          </p>

          <div
            className={`mt-6 overflow-hidden rounded-full p-1 ${
              bgToggle ? "bg-white/10" : "bg-slate-100"
            }`}
          >
            <div
              className="h-3 transition-all duration-300 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-3 text-xs font-black">
            <span>{loadedCount}/{totalCount} images</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThemeRopeToggle = ({ bgToggle, onToggle }) => {
  const startYRef = useRef(0);
  const [pullY, setPullY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const maxPull = 105;
  const triggerPull = 62;
  const chainHeight = 300;
  const linkGap = 14;
  const totalLinks = Math.ceil((chainHeight + pullY) / linkGap);

  const handlePointerDown = (event) => {
    event.preventDefault();
    startYRef.current = event.clientY;
    setIsDragging(true);

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;

    const diff = Math.max(0, event.clientY - startYRef.current);
    setPullY(Math.min(diff, maxPull));
  };

  const handlePointerUp = () => {
    if (!isDragging) return;

    if (pullY >= triggerPull) {
      onToggle();
    }

    setIsDragging(false);
    setPullY(0);
  };

  return (
    <>
      {/* Mobile only: old star animation */}
      <button
        onClick={onToggle}
        className="fixed bottom-5 right-5 z-[2000] flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gray-500 to-pink-400 shadow-lg transition hover:scale-110 active:scale-95 sm:hidden animate-blink"
        aria-label={bgToggle ? "Switch to light theme" : "Switch to dark theme"}
        aria-pressed={bgToggle}
        title={bgToggle ? "Switch to light theme" : "Switch to dark theme"}
      >
        <span className="absolute left-2 top-1 text-[10px] text-white animate-star1">
          ★
        </span>
        <span className="absolute bottom-2 right-3 text-[9px] text-white animate-star2">
          ★
        </span>
        <span className="absolute right-2 top-3 text-[9px] text-white animate-star3">
          ★
        </span>
        <span className="text-sm font-bold text-white animate-pulse">O</span>
      </button>

      {/* Tablet + laptop: thin silver hanging chain switch */}
      <div className="fixed right-5 top-12 z-[2000] hidden select-none sm:block lg:right-8">
        <div
          className="relative flex flex-col items-center w-10 chain-theme-wrap"
          style={{
            transform: isDragging ? "rotate(0deg)" : undefined,
            animationPlayState: isDragging ? "paused" : "running",
          }}
        >
          <div className="relative flex flex-col items-center pt-1">
            <div
              className="flex flex-col items-center overflow-hidden chain-extension"
              style={{
                height: `${chainHeight + pullY}px`,
                transition: isDragging
                  ? "height 0s"
                  : "height 0.46s cubic-bezier(.2,1.6,.4,1)",
              }}
            >
              {Array.from({ length: totalLinks }).map((_, linkIndex) => (
                <span
                  key={linkIndex}
                  className={`chain-link ${
                    bgToggle ? "chain-link-dark" : "chain-link-light"
                  }`}
                />
              ))}
            </div>

            {/* Vertical rectangle pull handle - connected to chain */}
            <button
              type="button"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`chain-theme-knob chain-vertical-handle relative -mt-[3px] flex h-16 w-7 cursor-grab items-center justify-center rounded-lg border text-xs font-black transition active:cursor-grabbing ${
                bgToggle
                  ? "border-slate-500 text-yellow-200"
                  : "border-slate-300 text-slate-800"
              }`}
              style={{
                transform: `scale(${isDragging ? 1.05 : 1})`,
                transition: isDragging
                  ? "transform 0s"
                  : "transform 0.46s cubic-bezier(.2,1.6,.4,1)",
                touchAction: "none",
              }}
              aria-label={
                bgToggle
                  ? "Pull chain to switch to light theme"
                  : "Pull chain to switch to dark theme"
              }
              aria-pressed={bgToggle}
              title="Pull the silver chain handle down and release"
            >
              {/* Top ring joins chain and handle, no visual gap */}
              <span className="absolute w-4 h-4 -translate-x-1/2 border-2 rounded-full shadow-sm -top-3 left-1/2 border-slate-300 bg-slate-100" />

              <span className="pointer-events-none rotate-90 text-[10px] tracking-[0.18em]">
                {bgToggle ? "SUN" : "MOON"}
              </span>

              <span className="absolute bottom-1 h-1.5 w-4 rounded-full bg-slate-500/60" />
            </button>

            <div
              className={`chain-pull-hint mt-2 rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-wide shadow-sm ${
                bgToggle
                  ? "bg-white/10 text-slate-300"
                  : "bg-white text-slate-600"
              }`}
            >
              Pull
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PremiumPosterSlider = ({
  posters,
  activePoster,
  setActivePoster,
  goPrevPoster,
  goNextPoster,
  bgToggle,
  onPosterClick,
}) => {
  const poster = posters[activePoster];

  return (
    <section
      className={`mb-4 overflow-hidden rounded-2xl border shadow-sm sm:mb-5 ${
        bgToggle ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
      }`}
    >
      <div className="relative flex min-h-[145px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-gray-950 p-2 sm:min-h-[190px] sm:p-3 lg:min-h-[240px]">
        <div className="absolute left-[-60px] top-[-60px] h-32 w-32 rounded-full bg-white/10 blur-2xl premium-glow" />
        <div className="absolute bottom-[-60px] right-[-60px] h-36 w-36 rounded-full bg-black/20 blur-2xl premium-glow" />

        <button
          onClick={goPrevPoster}
          className="absolute z-30 flex items-center justify-center text-base font-black transition rounded-full shadow-md left-2 h-7 w-7 bg-white/95 text-gray-950 hover:scale-110 active:scale-95 sm:left-3 sm:h-8 sm:w-8"
          aria-label="Previous poster"
        >
          ‹
        </button>

        <button
          onClick={goNextPoster}
          className="absolute z-30 flex items-center justify-center text-base font-black transition rounded-full shadow-md right-2 h-7 w-7 bg-white/95 text-gray-950 hover:scale-110 active:scale-95 sm:right-3 sm:h-8 sm:w-8"
          aria-label="Next poster"
        >
          ›
        </button>

        <button
          onClick={() => onPosterClick(poster)}
          className="relative z-10 mx-7 h-[130px] w-full max-w-3xl overflow-hidden rounded-xl border border-white/20 bg-white shadow-lg transition duration-500 hover:scale-[1.01] active:scale-[0.99] sm:mx-10 sm:h-[170px] lg:h-[220px]"
        >
          <img
        loading="eager"
        decoding="async"
            src={poster.poster}
            alt={poster.name}
            onError={handleImageError}
            draggable="false"
            className="absolute inset-0 object-contain w-full h-full p-1 transition duration-700 premium-image hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          <span className="absolute inset-y-0 left-0 z-20 w-16 pointer-events-none premium-shine bg-white/15 blur-xl" />

          <div className="absolute left-2 top-2 z-20 rounded-full bg-black/45 px-2.5 py-1 text-[8px] font-black uppercase tracking-wide text-white backdrop-blur sm:left-3 sm:top-3 sm:text-[10px]">
            {poster.name}
          </div>

          <div className="absolute bottom-2 right-2 z-20 rounded-full bg-orange-500 px-2.5 py-1 text-[8px] font-black text-white shadow-md sm:bottom-3 sm:right-3 sm:px-3 sm:py-1.5 sm:text-[10px]">
            View →
          </div>
        </button>

        <div className="absolute bottom-1.5 left-1/2 z-30 flex -translate-x-1/2 gap-1.5 sm:bottom-2">
          {posters.map((item, index) => (
            <button
              key={item.name}
              onClick={() => setActivePoster(index)}
              className={`h-1.5 rounded-full transition-all ${
                activePoster === index ? "w-5 bg-white" : "w-1.5 bg-white/45"
              }`}
              aria-label={`Go to ${item.name} poster`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const BrandBlockHeader = ({
  title,
  subtitle,
  count,
  bgToggle,
  premium,
  fashion,
  home,
  toy,
}) => {
  return (
    <section
      className={`mb-3 rounded-2xl border p-3 shadow-sm sm:p-4 ${
        premium
          ? "border-orange-500/30 bg-gradient-to-r from-orange-500/15 via-pink-500/10 to-transparent"
          : fashion
          ? "border-pink-500/30 bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-transparent"
          : home
          ? "border-sky-500/30 bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-transparent"
          : toy
          ? "border-yellow-500/30 bg-gradient-to-r from-yellow-400/20 via-orange-400/10 to-pink-400/10"
          : bgToggle
          ? "border-gray-800 bg-gray-900"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-end justify-between gap-3">
        <div>
          <p
            className={`text-[10px] font-black uppercase tracking-[0.18em] ${
              fashion
                ? "text-pink-500"
                : home
                ? "text-sky-500"
                : toy
                ? "text-yellow-500"
                : "text-orange-500"
            }`}
          >
            {premium
              ? "Premium Block"
              : fashion
              ? "Fashion Block"
              : home
              ? "Home Appliances"
              : toy
              ? "Toy Block"
              : "Grocery Block"}
          </p>

          <h2 className="mt-1 text-lg font-black tracking-tight sm:text-xl lg:text-2xl">
            {title}
          </h2>

          <p
            className={`mt-1 text-[11px] font-semibold sm:text-xs ${
              bgToggle ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {subtitle}
          </p>
        </div>

        <div
          className={`rounded-xl px-3 py-1.5 text-xs font-black text-white shadow ${
            fashion
              ? "bg-pink-500"
              : home
              ? "bg-sky-500"
              : toy
              ? "bg-yellow-500"
              : "bg-orange-500"
          }`}
        >
          {count}
        </div>
      </div>
    </section>
  );
};

const PremiumBrandCard = ({ brand, index, onClick }) => {
  const isRectangle = index % 2 === 0;

  const shapeClass = isRectangle
    ? "col-span-2 aspect-[2/1] sm:aspect-[2.05/1]"
    : "col-span-1 aspect-square";

  return (
    <button
      onClick={onClick}
      className={`premium-card premium-float group relative overflow-hidden rounded-xl border border-orange-300/30 bg-white text-left text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] sm:rounded-2xl ${shapeClass}`}
    >
      <img
        loading="eager"
        decoding="async"
        src={brand.poster}
        alt={brand.name}
        onError={handleImageError}
        draggable="false"
        className="absolute inset-0 object-cover w-full h-full transition duration-700 premium-image group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-black/5 to-transparent" />
      <span className="absolute inset-y-0 left-0 w-12 pointer-events-none premium-shine bg-white/15 blur-xl" />

      <div className="relative z-10 flex h-full flex-col justify-between p-2 sm:p-2.5 lg:p-3">
        <div className="flex items-start justify-end">
          <span className="rounded-full bg-black/45 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wide text-white backdrop-blur sm:px-2 sm:py-1 sm:text-[8px]">
            {brand.badge}
          </span>
        </div>

        <div>
          <h3 className="line-clamp-1 text-[10px] font-black leading-tight drop-shadow-lg sm:text-xs lg:text-sm">
            {brand.name}
          </h3>

          <div className="mt-1 inline-flex rounded-full bg-white px-2 py-1 text-[7px] font-black text-gray-950 transition group-hover:bg-orange-500 group-hover:text-white sm:px-2.5 sm:text-[8px]">
            Explore →
          </div>
        </div>
      </div>
    </button>
  );
};

const GroceryBrandCard = ({ brand, index, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="grocery-card grocery-float group relative aspect-square overflow-hidden rounded-2xl border border-green-300/30 bg-white text-left text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <img
        loading="eager"
        decoding="async"
        src={brand.poster}
        alt={brand.name}
        onError={handleImageError}
        draggable="false"
        className="absolute inset-0 object-cover w-full h-full transition duration-700 premium-image group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      <div className="absolute inset-0 transition opacity-0 ring-2 ring-green-400/50 group-hover:opacity-100" />
      <span className="absolute inset-y-0 left-0 pointer-events-none premium-shine w-14 bg-white/20 blur-xl" />

      <div className="relative z-10 flex h-full flex-col justify-between p-2.5 sm:p-3">
        <div className="flex items-start justify-between gap-2">
          <span className="rounded-full bg-green-500 px-2 py-1 text-[8px] font-black uppercase tracking-wide text-white shadow sm:text-[9px]">
            {brand.badge}
          </span>

          <span className="rounded-full bg-black/45 px-2 py-1 text-[8px] font-black uppercase tracking-wide text-white backdrop-blur sm:text-[9px]">
            {brand.tag}
          </span>
        </div>

        <div>
          <h3 className="text-xs font-black leading-tight line-clamp-1 drop-shadow-lg sm:text-sm lg:text-base">
            {brand.name}
          </h3>

          <p className="mt-1 line-clamp-1 text-[9px] font-semibold text-white/85 sm:text-[10px]">
            {brand.type}
          </p>

          <div className="mt-2 inline-flex rounded-full bg-white px-2.5 py-1 text-[8px] font-black text-gray-950 transition group-hover:bg-green-500 group-hover:text-white sm:px-3 sm:py-1.5 sm:text-[9px]">
            View Grocery →
          </div>
        </div>
      </div>
    </button>
  );
};

const FashionBrandCircle = ({ brand, index, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 text-center transition fashion-card group active:scale-95"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative w-24 h-24 overflow-hidden transition duration-300 bg-white border-4 rounded-full shadow-lg fashion-circle border-pink-300/70 group-hover:scale-105 group-hover:border-pink-500 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
        <img
        loading="eager"
        decoding="async"
          src={brand.poster}
          alt={brand.name}
          onError={handleImageError}
          draggable="false"
          className="object-cover w-full h-full transition duration-700 rounded-full premium-image group-hover:scale-110"
        />

        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/35 via-transparent to-white/10" />
        <div className="absolute inset-0 rounded-full pointer-events-none circle-glow ring-4 ring-pink-400/30" />

        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-2 py-0.5 text-[7px] font-black uppercase text-white backdrop-blur sm:text-[8px]">
          {brand.badge}
        </span>
      </div>

      <div>
        <h3
          className={`line-clamp-1 text-[11px] font-black sm:text-xs lg:text-sm ${
            brand.name.length > 10 ? "max-w-[90px] sm:max-w-[110px]" : ""
          }`}
        >
          {brand.name}
        </h3>

        <p className="mt-0.5 text-[9px] font-semibold text-pink-500 sm:text-[10px]">
          Fashion
        </p>
      </div>
    </button>
  );
};

const HomeApplianceParallelogram = ({ brand, index, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="ha-shuffle-enter group relative h-[135px] overflow-visible px-2 transition active:scale-95 sm:h-[155px] lg:h-[170px]"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="relative w-full h-full overflow-hidden transition duration-300 bg-white border shadow-lg ha-card border-sky-300/40 group-hover:shadow-2xl">
        <img
        loading="eager"
        decoding="async"
          src={brand.poster}
          alt={brand.name}
          onError={handleImageError}
          draggable="false"
          className="absolute inset-0 object-cover w-full h-full transition duration-700 premium-image group-hover:scale-110"
          style={{ transform: "skewX(10deg) scale(1.14)" }}
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
          style={{ transform: "skewX(10deg) scale(1.14)" }}
        />

        <span
          className="absolute inset-y-0 left-0 pointer-events-none premium-shine w-14 bg-white/25 blur-xl"
          style={{ transform: "skewX(10deg)" }}
        />

        <div
          className="absolute w-20 h-20 rounded-full pointer-events-none ha-glow -right-8 -top-8 bg-sky-300/30 blur-xl"
          style={{ transform: "skewX(10deg)" }}
        />

        <div
          className="relative z-10 flex flex-col justify-between h-full p-3 text-white"
          style={{ transform: "skewX(10deg)" }}
        >
          <div className="flex items-start justify-between gap-2">
            <span className="rounded-full bg-sky-500 px-2 py-1 text-[8px] font-black uppercase tracking-wide text-white shadow">
              {brand.badge}
            </span>

            <span className="rounded-full bg-black/45 px-2 py-1 text-[8px] font-black uppercase text-white backdrop-blur">
              HA
            </span>
          </div>

          <div>
            <h3 className="text-sm font-black line-clamp-1 drop-shadow-lg sm:text-base">
              {brand.name}
            </h3>

            <p className="mt-1 line-clamp-1 text-[9px] font-semibold text-white/85 sm:text-[10px]">
              {brand.type}
            </p>

            <div className="mt-2 inline-flex rounded-full bg-white px-3 py-1.5 text-[8px] font-black text-gray-950 transition group-hover:bg-sky-500 group-hover:text-white">
              View Appliances →
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};


const ToyMobileBoxCard = ({ brand, index, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden text-left text-white transition duration-300 bg-white border-2 shadow-md toy-mobile-card group aspect-square rounded-2xl border-yellow-300/80 hover:-translate-y-1 hover:shadow-xl active:scale-95"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <img
        loading="eager"
        decoding="async"
        src={brand.poster}
        alt={brand.name}
        onError={handleImageError}
        draggable="false"
        className="absolute inset-0 object-cover w-full h-full transition duration-700 premium-image group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-white/5" />
      <div className="absolute w-20 h-20 rounded-full pointer-events-none toy-mobile-glow -right-6 -top-6 bg-yellow-300/45 blur-xl" />
      <span className="absolute inset-y-0 left-0 w-12 pointer-events-none premium-shine bg-white/25 blur-xl" />

      <span className="absolute text-lg left-2 top-2 drop-shadow-md toy-icon-float">🧸</span>
      <span
        className="absolute text-base right-2 top-2 drop-shadow-md toy-icon-float"
        style={{ animationDelay: '.35s' }}
      >
        🎈
      </span>
      <span
        className="absolute text-base right-3 bottom-12 drop-shadow-md toy-icon-float"
        style={{ animationDelay: '.7s' }}
      >
        ✨
      </span>

      <div className="relative z-10 flex h-full flex-col justify-between p-2.5">
        <div className="flex justify-end">
          <span className="toy-pop rounded-full bg-yellow-400 px-2 py-1 text-[8px] font-black uppercase tracking-wide text-gray-950 shadow">
            {brand.badge}
          </span>
        </div>

        <div>
          <h3 className="text-xs font-black leading-tight line-clamp-1 drop-shadow-lg sm:text-sm">
            {brand.name}
          </h3>

          <p className="mt-1 line-clamp-1 text-[9px] font-semibold text-white/90">
            {brand.type}
          </p>

          <div className="mt-2 inline-flex rounded-full bg-white px-2.5 py-1 text-[8px] font-black text-gray-950 transition group-hover:bg-yellow-400 group-hover:text-gray-950">
            Play Now →
          </div>
        </div>
      </div>
    </button>
  );
};

const ToyBrandCard = ({ brand, index, isEngine, onClick }) => {
  const cardSizeClass = isEngine
    ? "h-[132px] w-[190px] sm:h-[150px] sm:w-[230px] lg:h-[165px] lg:w-[260px]"
    : "h-[132px] w-[132px] sm:h-[150px] sm:w-[150px] lg:h-[165px] lg:w-[165px]";

  return (
    <button
      onClick={onClick}
      className={`toy-card group relative shrink-0 overflow-visible text-left text-white transition duration-300 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.96] ${cardSizeClass}`}
      style={{ animationDelay: `${index * 0.11}s` }}
    >
      <span className="absolute z-0 w-8 h-3 -translate-y-1/2 rounded-full shadow -right-4 top-1/2 bg-yellow-700/70" />

      {isEngine && (
        <>
          <span className="absolute z-30 w-5 h-5 rounded-full shadow-lg toy-smoke -top-7 left-8 bg-white/85" />
          <span
            className="absolute z-30 w-4 h-4 rounded-full shadow-lg toy-smoke -top-9 left-14 bg-white/75"
            style={{ animationDelay: ".45s" }}
          />
          <span
            className="toy-smoke absolute -top-6 left-20 z-30 h-3.5 w-3.5 rounded-full bg-white/70 shadow-lg"
            style={{ animationDelay: ".9s" }}
          />
        </>
      )}

      <div className="relative z-10 w-full h-full overflow-hidden transition duration-300 bg-white border-2 shadow-lg rounded-2xl border-yellow-300/80 group-hover:shadow-2xl">
        <img
        loading="eager"
        decoding="async"
          src={brand.poster}
          alt={brand.name}
          onError={handleImageError}
          draggable="false"
          className="absolute inset-0 object-cover w-full h-full transition duration-700 premium-image group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/10 to-white/5" />

        {isEngine ? (
          <>
            <div className="absolute right-0 z-10 w-10 h-16 -translate-y-1/2 shadow-lg top-1/2 rounded-l-2xl bg-yellow-400/90" />
            <div className="absolute z-20 w-6 h-6 -translate-y-1/2 rounded-full right-2 top-1/2 bg-gray-950/85 ring-2 ring-white/70" />
            <span className="absolute text-xl pointer-events-none toy-icon-float left-3 top-3 drop-shadow-md sm:text-2xl">
              🚂
            </span>
          </>
        ) : (
          <>
            <span className="absolute text-lg pointer-events-none toy-icon-float left-2 top-2 drop-shadow-md sm:text-xl">
              🧸
            </span>
            <span
              className="absolute text-base pointer-events-none toy-icon-float right-2 top-3 drop-shadow-md sm:text-lg"
              style={{ animationDelay: ".35s" }}
            >
              🎈
            </span>
            <span
              className="absolute text-base pointer-events-none toy-icon-float bottom-11 right-3 drop-shadow-md sm:text-lg"
              style={{ animationDelay: ".7s" }}
            >
              ✨
            </span>
          </>
        )}

        <span className="absolute inset-y-0 left-0 pointer-events-none premium-shine w-14 bg-white/25 blur-xl" />

        <div className="relative z-10 flex h-full flex-col justify-between p-2.5 sm:p-3">
          <div className="flex items-start justify-end">
            <span className="toy-pop rounded-full bg-yellow-400 px-2 py-1 text-[8px] font-black uppercase tracking-wide text-gray-950 shadow sm:text-[9px]">
              {isEngine ? "Engine" : brand.badge}
            </span>
          </div>

          <div>
            <h3 className="text-xs font-black leading-tight line-clamp-1 drop-shadow-lg sm:text-sm lg:text-base">
              {brand.name}
            </h3>

            <p className="mt-1 line-clamp-1 text-[9px] font-semibold text-white/90 sm:text-[10px]">
              {isEngine ? "Toy Train Engine" : brand.type}
            </p>

            <div className="mt-2 inline-flex rounded-full bg-white px-2.5 py-1 text-[8px] font-black text-gray-950 transition group-hover:bg-yellow-400 group-hover:text-gray-950 sm:px-3 sm:py-1.5 sm:text-[9px]">
              {isEngine ? "Start Train →" : "Play Now →"}
            </div>
          </div>
        </div>
      </div>

      <div className={`absolute -bottom-3 z-20 flex ${isEngine ? "left-7 gap-28 sm:gap-36 lg:gap-44" : "left-5 gap-10 sm:left-6 sm:gap-12"}`}>
        <span className="toy-wheel h-6 w-6 rounded-full border-[5px] border-yellow-400 bg-gray-950 shadow" />
        <span className="toy-wheel h-6 w-6 rounded-full border-[5px] border-yellow-400 bg-gray-950 shadow" />
      </div>
    </button>
  );
};

const EmptyBlock = ({ bgToggle, text }) => {
  return (
    <div
      className={`mb-5 rounded-2xl border py-10 text-center text-sm font-bold ${
        bgToggle
          ? "border-gray-800 bg-gray-950 text-gray-400"
          : "border-gray-200 bg-white text-gray-500"
      }`}
    >
      {text}
    </div>
  );
};