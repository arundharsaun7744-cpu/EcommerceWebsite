import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Popover,
  Typography,
  Button,
} from "@mui/material";

import {
  ShoppingCart,
  Favorite,
  AccountCircle,
  AutoAwesome,
  Lock,
  WarningAmber,
  VerifiedUser,
  Login as LoginIcon,
  Person,
} from "@mui/icons-material";

import { motion, AnimatePresence } from "framer-motion";

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

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [profileData, setProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileAnchor, setProfileAnchor] = useState(null);

  useEffect(() => {
    const fetchProfileForHeader = async () => {
      const userId = localStorage.getItem("u_id");

      if (!userId) {
        setProfileData(null);
        setProfileLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/get-user?user_id=${userId}`
        );

        const data = await response.json();

        if (response.ok && data.success && data.user) {
          setProfileData(data.user);
        } else {
          setProfileData(null);
        }
      } catch (error) {
        console.error("Header profile fetch error:", error);
        setProfileData(null);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfileForHeader();

    const syncLoginState = () => {
      fetchProfileForHeader();
    };

    window.addEventListener("storage", syncLoginState);
    window.addEventListener("profile-updated", syncLoginState);

    return () => {
      window.removeEventListener("storage", syncLoginState);
      window.removeEventListener("profile-updated", syncLoginState);
    };
  }, []);

  const profileImage = getProfileImageUrl(profileData?.userImage);

  const isLoggedIn = useMemo(() => {
    const userId = localStorage.getItem("u_id");
    return Boolean(userId && profileData);
  }, [profileData]);

  const displayName =
    profileData?.userName || user?.userName || user?.name || "User";

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

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleProfileClick = (event) => {
    if (profileLoading) return;

    if (isLoggedIn) {
      navigate("/profile");
      return;
    }

    setProfileAnchor(event.currentTarget);
  };

  const handleProfilePopoverClose = () => {
    setProfileAnchor(null);
  };

  const handleLoginRedirect = () => {
    setProfileAnchor(null);
    navigate("/showlogin");
  };

  const profilePopoverOpen = Boolean(profileAnchor);

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
                  position: "relative",
                  backgroundColor: "rgba(255,255,255,0.12)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.22)",
                  },
                }}
                onClick={() => navigate("/wishlist")}
                aria-label="Wishlist"
              >
                <Favorite fontSize="medium" />

                {wishlist?.length > 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      backgroundColor: "#ffffff",
                      color: "#ec4899",
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
                    {wishlist.length}
                  </Box>
                )}
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

            {/* Advanced Profile Login Required */}
            <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                onClick={handleProfileClick}
                aria-label={isLoggedIn ? "Profile" : "Login required"}
                sx={{
                  p: { xs: 0.3, sm: 0.5 },
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: 40, sm: 44 },
                    height: { xs: 40, sm: 44 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                  }}
                >
                  {profileImage && isLoggedIn ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #86efac",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        background: isLoggedIn
                          ? "rgba(34,197,94,0.18)"
                          : "rgba(239,68,68,0.20)",
                        border: isLoggedIn
                          ? "2px solid #86efac"
                          : "2px solid #fecaca",
                        boxShadow: isLoggedIn
                          ? "0 0 18px rgba(34,197,94,0.35)"
                          : "0 0 18px rgba(239,68,68,0.38)",
                      }}
                    >
                      {isLoggedIn ? (
                        <AccountCircle sx={{ fontSize: 34 }} />
                      ) : (
                        <Person sx={{ fontSize: 25 }} />
                      )}
                    </Box>
                  )}

                  <AnimatePresence>
                    {!profileLoading && !isLoggedIn && (
                      <>
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: [1, 1.25, 1],
                            opacity: 1,
                          }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            duration: 1.1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{
                            position: "absolute",
                            inset: -4,
                            borderRadius: "50%",
                            border: "2px solid rgba(248,113,113,0.65)",
                            pointerEvents: "none",
                          }}
                        />

                        <Box
                          sx={{
                            position: "absolute",
                            top: -6,
                            right: -6,
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg,#ef4444,#f97316)",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid #ffffff",
                            boxShadow: "0 4px 12px rgba(239,68,68,0.45)",
                          }}
                        >
                          <Lock sx={{ fontSize: 11 }} />
                        </Box>

                        <Box
                          sx={{
                            position: "absolute",
                            display: { xs: "none", md: "block" },
                            bottom: -24,
                            right: -18,
                            whiteSpace: "nowrap",
                            borderRadius: "999px",
                            px: 1.2,
                            py: 0.45,
                            fontSize: 10,
                            fontWeight: 900,
                            color: "#7f1d1d",
                            backgroundColor: "#fee2e2",
                            boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
                          }}
                        >
                          Login Required
                        </Box>
                      </>
                    )}

                    {!profileLoading && isLoggedIn && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: -4,
                          right: -4,
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          backgroundColor: "#22c55e",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid #ffffff",
                          boxShadow: "0 4px 12px rgba(34,197,94,0.45)",
                        }}
                      >
                        <VerifiedUser sx={{ fontSize: 10 }} />
                      </Box>
                    )}
                  </AnimatePresence>
                </Box>
              </IconButton>
            </motion.div>
          </Box>
        </Toolbar>
      </AppBar>

      <Popover
        open={profilePopoverOpen}
        anchorEl={profileAnchor}
        onClose={handleProfilePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 330,
            borderRadius: 5,
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,247,237,0.98))",
            border: "1px solid rgba(251,146,60,0.22)",
            boxShadow: "0 24px 70px rgba(15,23,42,0.25)",
          },
        }}
      >
        <Box
          sx={{
            p: 2.5,
            color: "#ffffff",
            background:
              "linear-gradient(135deg, #111827, #7c2d12, #ea580c)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "20px",
                backgroundColor: "rgba(255,255,255,0.14)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <WarningAmber sx={{ fontSize: 30, color: "#fed7aa" }} />
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 1000, fontSize: 20 }}>
                Login Required
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 700, opacity: 0.8 }}>
                Profile access locked
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: 2.5 }}>
          <Box
            sx={{
              borderRadius: 4,
              backgroundColor: "#fff7ed",
              border: "1px solid #fed7aa",
              p: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 800,
                color: "#7c2d12",
                lineHeight: 1.6,
              }}
            >
              Bro, profile details, orders, wishlist sync and account settings
              use panna login pannunga.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1.2,
              mt: 2,
            }}
          >
            <Button
              onClick={handleProfilePopoverClose}
              variant="outlined"
              sx={{
                borderRadius: 3,
                py: 1.2,
                fontWeight: 900,
                color: "#334155",
                borderColor: "#e2e8f0",
              }}
            >
              Later
            </Button>

            <Button
              onClick={handleLoginRedirect}
              variant="contained"
              startIcon={<LoginIcon />}
              sx={{
                borderRadius: 3,
                py: 1.2,
                fontWeight: 1000,
                background: "linear-gradient(135deg,#f97316,#dc2626)",
                boxShadow: "0 12px 26px rgba(249,115,22,0.32)",
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Popover>
    </motion.div>
  );
};

export default Header;