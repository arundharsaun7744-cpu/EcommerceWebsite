import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Popover,
} from "@mui/material";

import {
  Search as SearchIcon,
  ShoppingCart,
  Favorite,
  AccountCircle,
  AutoAwesome,
} from "@mui/icons-material";

import { motion } from "framer-motion";

import {
  useAuth,
  useProducts,
  useCart,
  useWishlist,
} from "../hooks/useContexts";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}`;
const IMAGE_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const getProfileImageUrl = (image) => {
  if (!image) return null;

  const cleanImage = String(image).trim();

  if (!cleanImage) return null;

  if (cleanImage.startsWith("http://") || cleanImage.startsWith("https://")) {
    return cleanImage;
  }

  if (cleanImage.startsWith("/uploads")) {
    return `${IMAGE_BASE_URL}${cleanImage}`;
  }

  if (cleanImage.startsWith("uploads/")) {
    return `${IMAGE_BASE_URL}/${cleanImage}`;
  }

  return `${IMAGE_BASE_URL}/uploads/${cleanImage}`;
};

const Header = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { products } = useProducts();
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchAnchor, setSearchAnchor] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileForHeader = async () => {
      const userId = localStorage.getItem("u_id");

      if (!userId) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/get-user?user_id=${userId}`
        );

        const data = await response.json();

        if (response.ok && data.success) {
          setProfileData(data.user);
        }
      } catch (error) {
        console.error("Header profile fetch error:", error);
      }
    };

    fetchProfileForHeader();
  }, []);

  const profileImage = getProfileImageUrl(profileData?.userImage);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchResults([]);
      setSearchAnchor(null);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const filtered = (products || [])
        .filter((product) => {
          const searchLower = query.toLowerCase();

          return (
            product.name?.toLowerCase().includes(searchLower) ||
            product.description?.toLowerCase().includes(searchLower)
          );
        })
        .slice(0, 5);

      setSearchResults(filtered);
      setSearchAnchor(e.currentTarget);
    } else {
      setSearchResults([]);
      setSearchAnchor(null);
    }
  };

  const handleCloseSearch = () => {
    setSearchResults([]);
    setSearchAnchor(null);
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: showHeader ? 0 : -100,
        opacity: showHeader ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(135deg, rgba(17,24,39,0.98), rgba(88,28,135,0.96), rgba(234,88,12,0.94))",
          color: "#ffffff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: { xs: 1, sm: 2 },
            padding: { xs: "0 0.5rem", sm: "0 1rem", md: "0 2rem" },
            minHeight: { xs: 62, sm: 72 },
          }}
        >
          {/* Premium Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              minWidth: "fit-content",
            }}
            onClick={() => navigate("/")}
          >
            <Box
              sx={{
                width: { xs: 38, sm: 46 },
                height: { xs: 38, sm: 46 },
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg, #ffffff, #fed7aa, #fb923c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111827",
                boxShadow: "0 8px 22px rgba(251,146,60,0.35)",
                border: "1px solid rgba(255,255,255,0.55)",
              }}
            >
              <AutoAwesome fontSize="small" />
            </Box>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Box
                sx={{
                  fontSize: { sm: "20px", md: "24px" },
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: "-0.6px",
                }}
              >
                Premium Hub
              </Box>

              <Box
                sx={{
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  color: "#fed7aa",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}
              >
                Brand Stores
              </Box>
            </Box>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
                fontSize: "18px",
                fontWeight: 900,
                letterSpacing: "-0.5px",
              }}
            >
              PH
            </Box>
          </motion.div>


          {/* Right Icons */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: "2px", sm: "8px" },
            }}
          >
            {/* Wishlist */}
            <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                sx={{
                  color: "#ffffff",
                  p: { xs: 0.55, sm: 1 },
                  backgroundColor: "rgba(255,255,255,0.12)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.22)",
                  },
                }}
                onClick={() => navigate("/wishlist")}
                aria-label="Wishlist"
              >
                <Favorite fontSize="medium" />
              </IconButton>
            </motion.div>

            {/* Orders / Cart */}
            <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                sx={{
                  color: "#ffffff",
                  p: { xs: 0.55, sm: 1 },
                  position: "relative",
                  backgroundColor: "rgba(255,255,255,0.12)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.22)",
                  },
                }}
                onClick={() => navigate("/orders")}
                aria-label="Orders"
              >
                <ShoppingCart fontSize="medium" />

                {cartItems?.length > 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      backgroundColor: "#ffffff",
                      color: "#ea580c",
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 900,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
                    }}
                  >
                    {cartItems.length}
                  </Box>
                )}
              </IconButton>
            </motion.div>

            {/* Profile */}
            <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                onClick={() => navigate("/profile")}
                aria-label="Profile"
                sx={{
                  p: { xs: 0.3, sm: 0.5 },
                }}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #fed7aa",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
                    }}
                  />
                ) : (
                  <AccountCircle
                    sx={{
                      color: "#ffffff",
                      fontSize: 36,
                    }}
                  />
                )}
              </IconButton>
            </motion.div>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Header;