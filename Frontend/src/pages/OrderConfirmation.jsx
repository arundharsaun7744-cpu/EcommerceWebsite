import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, DollarSign, ShoppingBag } from "lucide-react";
import { formatPrice } from "../utils/formatters";

import phonePeSound from "../assets/PhonePe Sound  phonePe payment sound - RijeshTeachz.mp3";

// --- Confetti Component ---
const Confetti = () => {
  const colors = ["#f9a8d4", "#818cf8", "#6ee7b7", "#fcd34d", "#a5f3fc"];

  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            y: -10,
            scale: 0.5,
            x: Math.random() * 800 - 400,
            rotate: Math.random() * 360,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [null, 800],
            x: [null, Math.random() * 200 - 100],
            rotate: [null, Math.random() * 720],
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            delay: Math.random() * 0.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transformOrigin: "center center",
          }}
        />
      ))}
    </div>
  );
};

// --- Main Component ---
export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Data initially passed via navigation state (lost on refresh)
  const {
    orderId: initialOrderId,
    total: initialTotal,
    product: initialProduct,
    paymentMethod: initialPaymentMethod = "card",
  } = location.state || {};
  
  // State to hold the order details that will be displayed
  const [displayOrder, setDisplayOrder] = useState({
    orderId: initialOrderId,
    total: initialTotal,
    product: initialProduct,
    paymentMethod: initialPaymentMethod,
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [animateCash, setAnimateCash] = useState(false);
  const audioRef = useRef(null);

  const accentColor = "text-sky-500";
  const accentBg = "bg-sky-500";
  const accentBorder = "border-sky-500";

  const currentOrder = displayOrder.orderId && displayOrder.total && displayOrder.product
  // Use a derived state/variable for the current order to be saved/used
    ? { 
        orderId: displayOrder.orderId, 
        total: displayOrder.total, 
        product: displayOrder.product, 
        paymentMethod: displayOrder.paymentMethod,
        date: new Date().toISOString()
      }
    : null;


  useEffect(() => {
    // 1. DATA RECOVERY LOGIC (Runs if initialOrderId is missing, i.e., refresh)
    if (!initialOrderId) {
        try {
            const storedOrders = JSON.parse(localStorage.getItem("orderedProducts")) || [];
            if (storedOrders.length > 0) {
                // Recover the latest successful order from storage
                const latestOrder = storedOrders[storedOrders.length - 1];
                
                setDisplayOrder({
                    orderId: latestOrder.orderId,
                    total: latestOrder.total,
                    product: latestOrder.product,
                    paymentMethod: latestOrder.paymentMethod || 'card',
                });
            } else {
                 // No orders found in storage, redirect to home page
                 navigate("/");
                 return;
            }
        } catch (error) {
            console.error("Error loading order from local storage:", error);
            navigate("/");
            return;
        }
    }
    
    // 2. SIDE EFFECTS (Audio and Animations)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    if (displayOrder.paymentMethod === "phonepe") {
      setShowConfetti(true);
    }
    if (displayOrder.paymentMethod === "cash") {
      setAnimateCash(true);
    }

    // 3. LOCAL STORAGE SAVING LOGIC (Only runs if a valid order was passed in state)
    if (currentOrder && initialOrderId) {
      try {
        const storedOrders = JSON.parse(localStorage.getItem("orderedProducts")) || [];
        
        // Prevent storing duplicates on re-render
        const isDuplicate = storedOrders.some(order => order.orderId === currentOrder.orderId);

        if (!isDuplicate) {
          const updatedOrders = [...storedOrders, currentOrder];
          localStorage.setItem("orderedProducts", JSON.stringify(updatedOrders));
          console.log(`Successfully stored new order: ${currentOrder.orderId}`);
        }
      } catch (error) {
        console.error("Error saving order to local storage:", error);
      }
    }

    return () => setShowConfetti(false);
  // Dependencies must include initial state for the recovery logic
  }, [initialOrderId, initialTotal, initialProduct, initialPaymentMethod, navigate]); 

  
  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  // Main container animation variant for a smooth entrance
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  // Item animation variant for smooth staggered display
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Check if we have any data to display before rendering the main content
  if (!displayOrder.orderId) {
    // Render a loading state or nothing while the useEffect attempts recovery
    return <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">Loading Order...</div>;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen pt-20 pb-8 overflow-hidden font-sans text-gray-800 bg-white dark:bg-gray-900 dark:text-gray-100"
    >
      <audio ref={audioRef} src={phonePeSound} preload="auto" />

      <AnimatePresence>{showConfetti && <Confetti />}</AnimatePresence>

      <div className="max-w-3xl p-6 mx-auto text-center">
        {/* Success Icon Animation */}
        <motion.div
          variants={itemVariants}
          style={{ marginBottom: "1.5rem" }}
          className="inline-block"
        >
          <CheckCircle
            className={`w-24 h-24 ${accentColor}`}
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Success Text */}
        <motion.h1
          variants={itemVariants}
          className={`text-4xl md:text-5xl font-extrabold mb-3 ${accentColor}`}
        >
          Order Confirmed!
        </motion.h1>

        {/* Amount Paid (Uses displayOrder state) */}
        <motion.p
          variants={itemVariants}
          className="mb-8 text-2xl font-semibold text-gray-700 dark:text-gray-300"
        >
          Amount Paid:{" "}
          <span className="text-3xl font-extrabold">₹{formatPrice(displayOrder.total)}</span>
        </motion.p>

        <hr className="w-3/4 mx-auto my-8 border-gray-200 dark:border-gray-700" />

        {/* --- Trending Cash Animation --- */}
        <AnimatePresence>
          {animateCash && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4 }}
              className="max-w-sm p-4 mx-auto mb-8 overflow-hidden border border-green-300 shadow-2xl bg-green-50 dark:bg-green-900/50 rounded-xl dark:border-green-700"
            >
              <h2 className="flex items-center justify-center mb-4 text-3xl font-extrabold text-green-600 dark:text-green-400">
                <DollarSign className="w-8 h-8 mr-2" /> Cash Received!
              </h2>

              <div className="relative flex justify-center h-20 overflow-visible">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 0, rotateY: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0], // Visible during the arc
                      y: [0, -60, 0], // The parabolic arc
                      rotateY: [0, 360 * 2, 360 * 3], // Multiple coin flips
                    }}
                    transition={{
                      delay: i * 0.1,
                      duration: 1.2,
                      ease: [0.42, 0, 0.58, 1], // Custom cubic-bezier for a parabolic feel
                      repeat: 0,
                    }}
                    className="absolute inline-block mx-2 text-4xl font-bold text-yellow-500"
                    style={{ x: i * 12 - 24, top: 20 }} // Position them near the center
                  >
                    ₹
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* --- End Trending Cash Animation --- */}

        {/* Order ID Card (Uses displayOrder state) */}
        <motion.div
          variants={itemVariants}
          className={`p-4 mt-6 rounded-lg bg-sky-50 dark:bg-sky-900/50 border-2 ${accentBorder} max-w-sm mx-auto shadow-xl`}
        >
          <p className="font-mono text-lg font-bold text-gray-900 dark:text-gray-50">
            Order ID: {displayOrder.orderId}
          </p>
        </motion.div>

        {/* Items List (Uses displayOrder state) */}
        {displayOrder.product?.length > 0 && (
          <div className="max-w-xl mx-auto mt-8 text-left">
            <h3 className="flex items-center mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">
              <ShoppingBag className="w-5 h-5 mr-2 text-sky-500" /> Items
              Ordered:
            </h3>
            <ul className="space-y-3">
              {displayOrder.product.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.1 * index + 0.5,
                    type: "spring",
                    stiffness: 150,
                  }}
                  className="flex items-center justify-between p-4 transition duration-300 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800 hover:shadow-lg"
                >
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Qty: {item.qty} × ₹{item.price}
                    </p>
                  </div>
                  <p className="text-xl font-bold text-sky-600 dark:text-sky-400">
                    ₹{formatPrice(item.qty * item.price)}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons with 3D Parallax Hover */}
        <div
          className="flex flex-wrap justify-center gap-4 mt-10"
          style={{ perspective: "1000px" }}
        >
          <motion.button
            // --- Trending 3D Hover Effect ---
            whileHover={{
              scale: 1.05,
              rotateX: 10,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
            }}
            whileTap={{ scale: 0.98, rotateX: 0 }}
            onClick={() => handleNavigate("/")}
            className={`px-8 py-3 ${accentBg} text-white font-semibold rounded-full shadow-lg transition duration-300 transform focus:outline-none`}
            style={{ transformStyle: "preserve-3d" }}
          >
            Continue Shopping
          </motion.button>

          <motion.button
            // --- Trending 3D Hover Effect ---
            whileHover={{
              scale: 1.05,
              rotateY: 10,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
            }}
            whileTap={{ scale: 0.98, rotateY: 0 }}
            onClick={() => handleNavigate("/orders")}
            className={`px-8 py-3 bg-white dark:bg-gray-800 text-sky-600 dark:text-sky-400 border-2 ${accentBorder} font-semibold rounded-full shadow-lg transition duration-300 hover:shadow-xl dark:hover:bg-gray-700 focus:outline-none`}
            style={{ transformStyle: "preserve-3d" }}
          >
            View Orders
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}