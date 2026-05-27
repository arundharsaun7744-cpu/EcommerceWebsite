import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/amazon-logo-on-transparent-background-free-vector.jpg"
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Paper,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart,
  Favorite,
  AccountCircle,
  Close as CloseIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import {
  useAuth,
  useProducts,
  useCart,
  useWishlist,
} from "../hooks/useContexts";

const Header = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();
  const { products } = useProducts();
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();

  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchAnchor, setSearchAnchor] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const isAuthenticated = !!user; 

  // Build menu items as an array to avoid passing a Fragment to MUI Menu
  const menuItems = [];
  if (isAuthenticated) {
    menuItems.push(
      <MenuItem disabled key="username" className="font-semibold">
        {user?.name || "User"}
      </MenuItem>
    );
    menuItems.push(
      <MenuItem key="profile" onClick={() => handleNavigate("/profile")}>
        My Profile
      </MenuItem>
    );
    menuItems.push(
      <MenuItem key="orders" onClick={() => handleNavigate("/orders")}>
        My Orders
      </MenuItem>
    );
    menuItems.push(
      <MenuItem key="addresses" onClick={() => handleNavigate("/addresses")}>
        Addresses
      </MenuItem>
    );
    menuItems.push(
      <MenuItem key="logout" onClick={() => handleNavigate("/logout")}>
        Logout
      </MenuItem>
    );
  } else {
    menuItems.push(
      <MenuItem key="login" onClick={() => handleNavigate("/profile")}>
        profile
      </MenuItem>
    );
    menuItems.push(
      <MenuItem key="register" onClick={() => handleNavigate("/settings")}>
        settings
      </MenuItem>
    );
  }


  // Handle scroll to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide header when scrolling down
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
      // Filter products in real-time
      const filtered = (products || []).filter((product) => {
        const searchLower = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower)
        );
      }).slice(0, 5); // Show top 5 results
      
      setSearchResults(filtered);
      setSearchAnchor(e.currentTarget);
    } else {
      setSearchResults([]);
      setSearchAnchor(null);
    }
  };

  const handleSearchResultClick = (product) => {
    // Navigate to product detail or you can add a quick view
    setSearchQuery("");
    setSearchResults([]);
    setSearchAnchor(null);
  };

  const handleCloseSearch = () => {
    setSearchResults([]);
    setSearchAnchor(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: showHeader ? 0 : -100, opacity: showHeader ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="shadow-card-lg"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <AppBar
        position="sticky"
        bottom={0}
        
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
            style={{ display: "flex", alignItems: "center"  ,   width: 150}}
          >

              <img  className="text-xl font-extrabold sm:text-2xl md:text-3xl"
              style={{ letterSpacing: "1px" ,paddingTop: "8px"}}
              onClick={() => navigate("/")}  src={logo} alt="Logo" />

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
              onKeyPress={handleSearch}
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

            {/* Search Results Dropdown */}
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
                          ₹{product.price.toLocaleString()}
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
            }}
          >
            {/* Wishlist */}
            <motion.div
              whileHover={{ scale: 1.18, rotate: -8 }}
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

            {/* Cart */}
            <motion.div
              whileHover={{ scale: 1.18, rotate: 8 }}
              whileTap={{ scale: 0.95 }}
              className="transition-transform"
            >
              <IconButton
                sx={{ color: "#667eea", p: { xs: 0.5, sm: 1 }, position: "relative" }}
                onClick={() => navigate("/orders")}
                aria-label="Cart"
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

            {/* User Account */}
            <motion.div
              whileHover={{ scale: 1.18 }}
              whileTap={{ scale: 0.95 }}
              className="transition-transform"
            >
              <IconButton
                sx={{ color: "green", p: { xs: 0.5, sm: 1 } }}
                onClick={handleMenuOpen}
                aria-label="Account"
              >
                <AccountCircle fontSize="medium" />
              </IconButton>
            </motion.div>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  backgroundImage:
                    "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                  minWidth: { xs: 120, sm: 180 },
                  boxShadow: "0 2px 12px rgba(102,126,234,0.12)",
                  borderRadius: "12px",
                },
              }}
              transitionDuration={250}
            >
              {menuItems}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Header;
