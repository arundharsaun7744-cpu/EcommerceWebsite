import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/amazon-logo-on-transparent-background-free-vector.jpg";

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
          `${API_BASE_URL}/get-user?user_id=${userId}`,
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
      className="shadow-card-lg"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#ffffff",
          color: "#111111",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
        className="backdrop-blur-md"
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: { xs: "0 0.5rem", sm: "0 1rem", md: "0 2rem" },
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer"
            style={{
              display: "flex",
              alignItems: "center",
              width: 150,
            }}
            onClick={() => navigate("/")}
          >
            <img
              className="text-xl font-extrabold sm:text-2xl md:text-3xl"
              style={{
                letterSpacing: "1px",
                paddingTop: "8px",
              }}
              src={logo}
              alt="Logo"
            />
          </motion.div>

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.95)",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(102,126,234,0.08)",
              padding: { xs: "2px 8px", sm: "4px 12px" },
              width: { xs: "60%", sm: "40%", md: "35%" },
              border: "2px solid #e2e8f0",
              minWidth: "120px",
              maxWidth: "500px",
              position: "relative",
            }}
            className="transition-all duration-300"
          >
            <SearchIcon sx={{ color: "#667eea", marginRight: "8px" }} />

            <InputBase
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearch}
              sx={{
                width: "100%",
                fontSize: { xs: "13px", sm: "14px", md: "15px" },
                "& input:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
              className="focus:outline-none"
            />

            <Popover
              open={Boolean(searchAnchor) && searchResults.length > 0}
              anchorEl={searchAnchor}
              onClose={handleCloseSearch}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              PaperProps={{
                sx: {
                  width: searchAnchor?.offsetWidth || 300,
                  marginTop: "8px",
                  boxShadow: "0 4px 16px rgba(102,126,234,0.15)",
                  borderRadius: "12px",
                  maxHeight: "400px",
                  overflowY: "auto",
                },
              }}
            >
              <Box sx={{ p: 1 }}>
                {searchResults.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ backgroundColor: "#f5f5f5" }}
                  >
                    <Box
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        handleCloseSearch();
                        setSearchQuery("");
                      }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 1.5,
                        cursor: "pointer",
                        borderRadius: "8px",
                        transition: "all 0.2s",
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "6px",
                          backgroundColor: "#f0f0f0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </Box>

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box
                          sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#111",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {product.name}
                        </Box>

                        <Box
                          sx={{
                            fontSize: "12px",
                            color: "#666",
                            fontWeight: 700,
                            marginTop: "4px",
                          }}
                        >
                          ₹{product.price?.toLocaleString()}
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Popover>
          </Box>

          {/* Right Icons */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: "2px", sm: "6px" },
            }}
          >
            {/* Wishlist */}
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              className="transition-transform"
            >
              <IconButton
                sx={{ color: "red", p: { xs: 0.5, sm: 1 } }}
                onClick={() => navigate("/wishlist")}
                aria-label="Wishlist"
              >
                <Favorite fontSize="medium" />
              </IconButton>
            </motion.div>

            {/* Orders / Cart */}
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              className="transition-transform"
            >
              <IconButton
                sx={{
                  color: "#667eea",
                  p: { xs: 0.5, sm: 1 },
                  position: "relative",
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
                      backgroundColor: "#FF9900",
                      color: "white",
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {cartItems.length}
                  </Box>
                )}
              </IconButton>
            </motion.div>

            {/* ✅ Profile image only - no dropdown */}
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              className="transition-transform"
            >
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
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #16a34a",
                    }}
                  />
                ) : (
                  <AccountCircle
                    sx={{
                      color: "green",
                      fontSize: 34,
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
