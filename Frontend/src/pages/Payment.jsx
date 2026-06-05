import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  TextField,
  RadioGroup,
  Radio,
  Alert,
  Chip,
  Divider,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { formatPrice } from "../utils/formatters";
import {
  CreditCard,
  AccountBalanceWallet,
  QrCode2,
  Lock,
  VerifiedUser,
  ArrowBack,
  ErrorOutline,
  Smartphone,
  CheckCircle,
} from "@mui/icons-material";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const { product, qty = 1 } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentStep, setPaymentStep] = useState(1);

  const [cardData, setCardData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [upiId, setUpiId] = useState("");
  const [walletProvider, setWalletProvider] = useState("PhonePe");
  const [email, setEmail] = useState("");

  const orderId = useMemo(() => {
    return product?.id || `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  }, [product?.id]);

  const productPrice = Number(product?.price || 0);
  const taxAmount = productPrice * 0.18;
  const totalPriceCalculated = (productPrice + taxAmount) * qty;
  const totalDisplay = formatPrice(totalPriceCalculated);

  const cleanCardNumber = cardData.cardNumber.replace(/\s/g, "");

  const maskedCardNumber =
    cleanCardNumber.length > 0
      ? cardData.cardNumber.padEnd(19, "•")
      : "•••• •••• •••• ••••";

  const handleCardChange = (field, value) => {
    setPaymentError("");

    if (field === "cardNumber") {
      const cleanedValue = value.replace(/\D/g, "").slice(0, 16);
      const formattedValue = cleanedValue.replace(/(.{4})/g, "$1 ").trim();

      setCardData((prev) => ({
        ...prev,
        cardNumber: formattedValue,
      }));

      return;
    }

    if (field === "expiryDate") {
      let cleanedValue = value.replace(/\D/g, "").slice(0, 4);

      if (cleanedValue.length >= 3) {
        cleanedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
      }

      setCardData((prev) => ({
        ...prev,
        expiryDate: cleanedValue,
      }));

      return;
    }

    if (field === "cvv") {
      const cleanedValue = value.replace(/\D/g, "").slice(0, 4);

      setCardData((prev) => ({
        ...prev,
        cvv: cleanedValue,
      }));

      return;
    }

    setCardData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const isValidUpi = (value) => {
    return /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(value);
  };

  const isValidExpiryDate = (value) => {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return false;

    const [month, year] = value.split("/");
    const expiryMonth = Number(month);
    const expiryYear = Number(`20${year}`);

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    if (expiryYear < currentYear) return false;
    if (expiryYear === currentYear && expiryMonth < currentMonth) return false;

    return true;
  };

  const validatePayment = () => {
    if (!email.trim()) {
      return "Email required bro.";
    }

    if (!isValidEmail(email.trim())) {
      return "Valid email enter pannu bro. Example: arun@gmail.com";
    }

    if (paymentMethod === "card") {
      if (!cardData.cardholderName.trim()) {
        return "Cardholder name empty ah iruku bro.";
      }

      if (!/^\d{16}$/.test(cleanCardNumber)) {
        return "Card number 16 digits irukanum bro.";
      }

      if (!isValidExpiryDate(cardData.expiryDate)) {
        return "Expiry date valid illa bro. Format MM/YY use pannu.";
      }

      if (!/^\d{3,4}$/.test(cardData.cvv)) {
        return "CVV 3 or 4 digits irukanum bro.";
      }
    }

    if (paymentMethod === "upi") {
      if (!upiId.trim()) {
        return "UPI ID enter pannu bro.";
      }

      if (!isValidUpi(upiId.trim())) {
        return "Valid UPI ID enter pannu bro. Example: arun@oksbi";
      }
    }

    if (paymentMethod === "wallet") {
      if (!walletProvider.trim()) {
        return "Wallet provider select pannu bro.";
      }
    }

    return "";
  };

  const handlePayment = () => {
    setPaymentError("");

    const errorMessage = validatePayment();

    if (errorMessage) {
      setPaymentError(errorMessage);
      setPaymentStep(1);
      return;
    }

    setProcessing(true);
    setPaymentStep(2);

    setTimeout(() => {
      setPaymentStep(3);
    }, 1400);

    setTimeout(() => {
      setPaymentStep(4);
    }, 2800);

    setTimeout(() => {
      navigate("/order-confirmation", {
        state: {
          orderId,
          total: totalDisplay,
          product,
          qty,
          paymentMethod,
          email,
        },
      });

      setProcessing(false);
    }, 4300);
  };

  const paymentMethods = [
    {
      id: "card",
      label: "Card",
      subtitle: "Credit / Debit",
      icon: <CreditCard />,
      color: "#7c3aed",
    },
    {
      id: "upi",
      label: "UPI",
      subtitle: "Fast UPI Pay",
      icon: <QrCode2 />,
      color: "#059669",
    },
    {
      id: "wallet",
      label: "Wallet",
      subtitle: "Digital Wallet",
      icon: <AccountBalanceWallet />,
      color: "#ea580c",
    },
  ];

  if (!product) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #eef2ff 0%, #ffffff 45%, #fff7ed 100%)",
          pt: 14,
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
          >
            <Card
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 5,
                boxShadow: "0 20px 60px rgba(15,23,42,.12)",
              }}
            >
              <ErrorOutline color="error" sx={{ fontSize: 54, mb: 1 }} />

              <Typography variant="h6" color="error" fontWeight={900}>
                No active checkout session found, Bro!
              </Typography>

              <Button
                variant="contained"
                onClick={() => navigate("/")}
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  px: 4,
                  py: 1.2,
                  background: "linear-gradient(135deg,#667eea,#764ba2)",
                  fontWeight: 900,
                }}
              >
                Go to Shop
              </Button>
            </Card>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: { xs: 11, sm: 13 },
        pb: 6,
        background:
          "radial-gradient(circle at top left, rgba(16,185,129,.18), transparent 32%), radial-gradient(circle at top right, rgba(102,126,234,.18), transparent 35%), linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #ecfdf5 100%)",
        overflow: "hidden",
      }}
    >
      <AnimatePresence>
        {processing && (
          <CashTransactionOverlay
            totalDisplay={totalDisplay}
            paymentStep={paymentStep}
            paymentMethod={paymentMethod}
          />
        )}
      </AnimatePresence>

      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <Box
            sx={{
              mb: 3,
              display: "flex",
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box>
              <Chip
                icon={<Lock />}
                label="Secure Transaction"
                sx={{
                  mb: 1,
                  fontWeight: 900,
                  color: "#047857",
                  background: "#d1fae5",
                  borderRadius: 999,
                }}
              />

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 1000,
                  color: "#0f172a",
                  letterSpacing: "-0.04em",
                  fontSize: { xs: "1.8rem", sm: "2.4rem" },
                }}
              >
                Payment Transaction
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  fontWeight: 700,
                  mt: 0.5,
                  fontSize: { xs: 13, sm: 15 },
                }}
              >
                Animated demo checkout with real-time cash transfer style UI.
              </Typography>
            </Box>

            <Button
              onClick={() => navigate(-1)}
              startIcon={<ArrowBack />}
              sx={{
                borderRadius: 999,
                px: 2.5,
                py: 1,
                fontWeight: 900,
                color: "#334155",
                background: "#fff",
                boxShadow: "0 10px 30px rgba(15,23,42,.08)",
                "&:hover": { background: "#f8fafc" },
              }}
            >
              Back
            </Button>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1.15fr .85fr" },
              gap: { xs: 2.5, lg: 3 },
              alignItems: "start",
            }}
          >
            <Box>
              <PaymentStatusPanel
                processing={processing}
                paymentStep={paymentStep}
                paymentMethod={paymentMethod}
              />

              <Card
                sx={{
                  mt: 2.5,
                  borderRadius: 6,
                  p: { xs: 2, sm: 3 },
                  border: "1px solid rgba(226,232,240,.9)",
                  boxShadow: "0 24px 70px rgba(15,23,42,.10)",
                  background: "rgba(255,255,255,.86)",
                  backdropFilter: "blur(18px)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: 1000, color: "#0f172a" }}
                >
                  Choose Payment Method
                </Typography>

                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    setPaymentError("");
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(3, 1fr)",
                      },
                      gap: 1.5,
                    }}
                  >
                    {paymentMethods.map((method) => {
                      const selected = paymentMethod === method.id;

                      return (
                        <motion.div
                          key={method.id}
                          whileHover={{ y: -4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            onClick={() => {
                              setPaymentMethod(method.id);
                              setPaymentError("");
                            }}
                            sx={{
                              p: 2,
                              cursor: "pointer",
                              borderRadius: 4,
                              border: selected
                                ? `2px solid ${method.color}`
                                : "1px solid #e2e8f0",
                              background: selected
                                ? `linear-gradient(135deg, ${method.color}14, #ffffff)`
                                : "#ffffff",
                              boxShadow: selected
                                ? `0 18px 40px ${method.color}22`
                                : "0 10px 26px rgba(15,23,42,.06)",
                              transition: ".25s",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 42,
                                  height: 42,
                                  borderRadius: 3,
                                  display: "grid",
                                  placeItems: "center",
                                  color: selected ? "#fff" : method.color,
                                  background: selected
                                    ? method.color
                                    : `${method.color}14`,
                                }}
                              >
                                {method.icon}
                              </Box>

                              <Radio checked={selected} value={method.id} />
                            </Box>

                            <Typography
                              sx={{
                                mt: 1.4,
                                fontWeight: 1000,
                                color: "#0f172a",
                              }}
                            >
                              {method.label}
                            </Typography>

                            <Typography
                              sx={{
                                color: "#64748b",
                                fontWeight: 700,
                                fontSize: 12,
                              }}
                            >
                              {method.subtitle}
                            </Typography>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </Box>
                </RadioGroup>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={paymentMethod}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Box sx={{ mt: 3 }}>
                      {paymentMethod === "card" && (
                        <Box>
                          <LiveCardPreview
                            cardData={cardData}
                            maskedCardNumber={maskedCardNumber}
                          />

                          <Box
                            sx={{
                              display: "grid",
                              gap: 1.5,
                              mt: 2.5,
                            }}
                          >
                            <TextField
                              fullWidth
                              label="Cardholder Name"
                              value={cardData.cardholderName}
                              onChange={(e) =>
                                handleCardChange(
                                  "cardholderName",
                                  e.target.value
                                )
                              }
                              disabled={processing}
                            />

                            <TextField
                              fullWidth
                              label="Card Number"
                              placeholder="1234 5678 9012 3456"
                              value={cardData.cardNumber}
                              onChange={(e) =>
                                handleCardChange("cardNumber", e.target.value)
                              }
                              disabled={processing}
                              inputProps={{ maxLength: 19 }}
                            />

                            <Box
                              sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                  xs: "1fr",
                                  sm: "2fr 1fr",
                                },
                                gap: 1.5,
                              }}
                            >
                              <TextField
                                label="Expiry Date"
                                placeholder="MM/YY"
                                value={cardData.expiryDate}
                                onChange={(e) =>
                                  handleCardChange(
                                    "expiryDate",
                                    e.target.value
                                  )
                                }
                                disabled={processing}
                                inputProps={{ maxLength: 5 }}
                              />

                              <TextField
                                label="CVV"
                                type="password"
                                placeholder="123"
                                value={cardData.cvv}
                                onChange={(e) =>
                                  handleCardChange("cvv", e.target.value)
                                }
                                disabled={processing}
                                inputProps={{ maxLength: 4 }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      )}

                      {paymentMethod === "upi" && (
                        <Box>
                          <UpiScannerBox upiId={upiId} />

                          <TextField
                            fullWidth
                            label="UPI ID"
                            placeholder="username@bank"
                            value={upiId}
                            onChange={(e) => {
                              setUpiId(e.target.value);
                              setPaymentError("");
                            }}
                            disabled={processing}
                            sx={{ mt: 2.5 }}
                          />
                        </Box>
                      )}

                      {paymentMethod === "wallet" && (
                        <Box>
                          <WalletBox
                            walletProvider={walletProvider}
                            setWalletProvider={(value) => {
                              setWalletProvider(value);
                              setPaymentError("");
                            }}
                          />
                        </Box>
                      )}

                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setPaymentError("");
                        }}
                        helperText="Order confirmation will be sent here"
                        disabled={processing}
                        sx={{ mt: 2.5 }}
                      />

                      <AnimatePresence>
                        {paymentError && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                          >
                            <Alert
                              severity="error"
                              sx={{
                                mt: 2,
                                borderRadius: 3,
                                fontWeight: 800,
                                alignItems: "center",
                              }}
                            >
                              {paymentError}
                            </Alert>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.button
                        whileHover={{ scale: processing ? 1 : 1.015 }}
                        whileTap={{ scale: processing ? 1 : 0.985 }}
                        onClick={handlePayment}
                        disabled={processing}
                        style={{
                          width: "100%",
                          marginTop: "1.5rem",
                          padding: "15px",
                          background: processing
                            ? "#94a3b8"
                            : "linear-gradient(135deg, #10b981, #2563eb)",
                          color: "white",
                          border: "none",
                          borderRadius: "18px",
                          fontSize: "1rem",
                          fontWeight: 900,
                          cursor: processing ? "not-allowed" : "pointer",
                          boxShadow: processing
                            ? "none"
                            : "0 18px 38px rgba(16,185,129,.30)",
                        }}
                      >
                        {processing
                          ? "Processing Cash Transfer..."
                          : `Pay ${totalDisplay}`}
                      </motion.button>
                    </Box>
                  </motion.div>
                </AnimatePresence>
              </Card>
            </Box>

            <OrderSummaryCard
              product={product}
              qty={qty}
              productPrice={productPrice}
              taxAmount={taxAmount}
              totalDisplay={totalDisplay}
              orderId={orderId}
            />
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

const CashTransactionOverlay = ({ totalDisplay, paymentStep, paymentMethod }) => {
  const stepText =
    paymentStep === 2
      ? "Validating payment details..."
      : paymentStep === 3
      ? "Transferring cash securely..."
      : paymentStep === 4
      ? "Payment successful"
      : "Preparing transaction...";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background:
          "radial-gradient(circle at top, rgba(16,185,129,.35), transparent 35%), rgba(2,6,23,.82)",
        backdropFilter: "blur(12px)",
        display: "grid",
        placeItems: "center",
        padding: 16,
      }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 170, damping: 18 }}
        style={{
          width: "100%",
          maxWidth: 760,
          borderRadius: 32,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.16)",
          background:
            "linear-gradient(135deg, rgba(15,23,42,.96), rgba(6,78,59,.94))",
          boxShadow: "0 35px 100px rgba(0,0,0,.45)",
          color: "white",
        }}
      >
        <Box
          sx={{
            p: { xs: 2.2, sm: 3 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            borderBottom: "1px solid rgba(255,255,255,.12)",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 1000,
                letterSpacing: ".18em",
                color: "#86efac",
                textTransform: "uppercase",
              }}
            >
              Live Transaction
            </Typography>
            <Typography sx={{ fontWeight: 1000, fontSize: { xs: 20, sm: 28 } }}>
              Cash Transfer UI
            </Typography>
          </Box>

          <Chip
            label={paymentMethod.toUpperCase()}
            sx={{
              fontWeight: 1000,
              color: "#064e3b",
              background: "#a7f3d0",
              borderRadius: 999,
            }}
          />
        </Box>

        <Box sx={{ p: { xs: 2.2, sm: 3 } }}>
          <Box
            sx={{
              position: "relative",
              minHeight: { xs: 260, sm: 320 },
              borderRadius: 6,
              overflow: "hidden",
              background:
                "linear-gradient(135deg, #064e4e 0%, #052e2e 45%, #082f49 100%)",
              border: "1px solid rgba(255,255,255,.12)",
            }}
          >
            <motion.div
              animate={{ opacity: [0.18, 0.34, 0.18], scale: [1, 1.15, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{
                position: "absolute",
                left: "38%",
                top: "35%",
                width: 210,
                height: 210,
                borderRadius: "50%",
                background: "rgba(34,197,94,.25)",
                filter: "blur(32px)",
              }}
            />

            <PhoneDevice
              side="left"
              label="Sender"
              amount={totalDisplay}
              active={paymentStep >= 2}
            />

            <PhoneDevice
              side="right"
              label="Receiver"
              amount={totalDisplay}
              active={paymentStep >= 4}
            />

            <CashNote active={paymentStep >= 3} />

            <motion.div
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                color: "#bbf7d0",
                fontWeight: 1000,
                fontSize: 12,
                letterSpacing: ".16em",
                textTransform: "uppercase",
              }}
            >
              Secure Channel
            </motion.div>

            {paymentStep === 4 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 14 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(6,78,59,.18)",
                }}
              >
                <Box
                  sx={{
                    width: 92,
                    height: 92,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: "#22c55e",
                    boxShadow: "0 0 45px rgba(34,197,94,.8)",
                  }}
                >
                  <CheckCircle sx={{ fontSize: 58, color: "white" }} />
                </Box>
              </motion.div>
            )}
          </Box>

          <Box sx={{ mt: 2.5 }}>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 1000,
                fontSize: { xs: 18, sm: 22 },
              }}
            >
              {stepText}
            </Typography>

            <Typography
              sx={{
                textAlign: "center",
                color: "#cbd5e1",
                fontWeight: 700,
                fontSize: 13,
                mt: 0.5,
              }}
            >
              Please wait. Do not refresh or go back.
            </Typography>

            <Box
              sx={{
                mt: 2,
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 1,
              }}
            >
              {[1, 2, 3, 4].map((step) => (
                <Box
                  key={step}
                  sx={{
                    height: 8,
                    borderRadius: 999,
                    background:
                      paymentStep >= step
                        ? "linear-gradient(135deg,#22c55e,#38bdf8)"
                        : "rgba(255,255,255,.16)",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </motion.div>
    </motion.div>
  );
};

const PhoneDevice = ({ side, label, amount, active }) => {
  const isLeft = side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -80 : 80, y: isLeft ? 40 : -40 }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        rotate: isLeft ? -12 : 12,
      }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: isLeft ? "7%" : "auto",
        right: isLeft ? "auto" : "7%",
        bottom: isLeft ? "14%" : "auto",
        top: isLeft ? "auto" : "12%",
        width: "clamp(86px, 18vw, 140px)",
        height: "clamp(138px, 27vw, 220px)",
        borderRadius: 24,
        background: "#020617",
        border: "6px solid #111827",
        boxShadow: "0 22px 55px rgba(0,0,0,.45)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box
        sx={{
          width: "82%",
          height: "82%",
          borderRadius: 3,
          background: active
            ? "linear-gradient(135deg,#dcfce7,#ffffff)"
            : "linear-gradient(135deg,#f8fafc,#ffffff)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.8,
          textAlign: "center",
          p: 1,
        }}
      >
        <Smartphone sx={{ color: active ? "#16a34a" : "#64748b" }} />
        <Typography sx={{ color: "#0f172a", fontSize: 10, fontWeight: 1000 }}>
          {label}
        </Typography>
        <Typography sx={{ color: "#16a34a", fontSize: 12, fontWeight: 1000 }}>
          {amount}
        </Typography>
      </Box>
    </motion.div>
  );
};

const CashNote = ({ active }) => {
  return (
    <>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          initial={{
            x: "-190%",
            y: 80 - index * 16,
            rotate: -14,
            opacity: 0,
          }}
          animate={
            active
              ? {
                  x: ["-190%", "-55%", "25%", "145%"],
                  y: [80 - index * 16, 18 - index * 10, -18 + index * 8, -78],
                  rotate: [-14, 4, -8, 16],
                  opacity: [0, 1, 1, 0],
                }
              : {
                  x: "-190%",
                  y: 80 - index * 16,
                  rotate: -14,
                  opacity: 0,
                }
          }
          transition={{
            duration: 1.65,
            repeat: active ? Infinity : 0,
            repeatDelay: 0.2,
            delay: index * 0.22,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "clamp(76px, 13vw, 122px)",
            height: "clamp(42px, 7vw, 68px)",
            borderRadius: 12,
            background:
              "linear-gradient(135deg,#86efac,#22c55e 45%,#16a34a)",
            border: "3px solid rgba(220,252,231,.75)",
            boxShadow: "0 12px 30px rgba(34,197,94,.38)",
            display: "grid",
            placeItems: "center",
            color: "#064e3b",
            fontWeight: 1000,
            fontSize: "clamp(18px, 3vw, 30px)",
            zIndex: 8,
          }}
        >
          ₹
          <Box
            sx={{
              position: "absolute",
              inset: 7,
              border: "2px solid rgba(6,78,59,.35)",
              borderRadius: 2,
            }}
          />
        </motion.div>
      ))}
    </>
  );
};

const PaymentStatusPanel = ({ processing, paymentStep, paymentMethod }) => {
  const steps = [
    { id: 1, label: "Details", text: "Enter payment information" },
    { id: 2, label: "Validate", text: "Validating payment request" },
    { id: 3, label: "Transfer", text: "Cash moving securely" },
    { id: 4, label: "Success", text: "Redirecting to confirmation" },
  ];

  return (
    <Card
      sx={{
        borderRadius: 6,
        p: { xs: 2, sm: 2.5 },
        border: "1px solid rgba(226,232,240,.9)",
        boxShadow: "0 24px 70px rgba(15,23,42,.08)",
        background: "rgba(255,255,255,.86)",
        backdropFilter: "blur(18px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 1000, color: "#0f172a" }}>
            Transaction Flow
          </Typography>
          <Typography sx={{ color: "#64748b", fontSize: 13, fontWeight: 700 }}>
            Method: {paymentMethod.toUpperCase()} · Demo secure checkout
          </Typography>
        </Box>

        <Chip
          icon={processing ? <Lock /> : <VerifiedUser />}
          label={processing ? "Processing" : "Protected"}
          sx={{
            fontWeight: 900,
            borderRadius: 999,
            color: processing ? "#b45309" : "#047857",
            background: processing ? "#fef3c7" : "#d1fae5",
          }}
        />
      </Box>

      <Box
        sx={{
          mt: 2.4,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: { xs: 0.8, sm: 1.4 },
        }}
      >
        {steps.map((step) => {
          const active = paymentStep >= step.id;
          const current = paymentStep === step.id;

          return (
            <Box key={step.id} sx={{ minWidth: 0 }}>
              <motion.div
                animate={
                  current && processing
                    ? { scale: [1, 1.04, 1] }
                    : { scale: 1 }
                }
                transition={{ repeat: current && processing ? Infinity : 0 }}
              >
                <Box
                  sx={{
                    height: 7,
                    borderRadius: 999,
                    background: active
                      ? "linear-gradient(135deg,#10b981,#2563eb)"
                      : "#e2e8f0",
                    mb: 1,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: { xs: 9, sm: 11 },
                    fontWeight: 1000,
                    color: active ? "#059669" : "#94a3b8",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {step.label}
                </Typography>

                <Typography
                  sx={{
                    display: { xs: "none", sm: "block" },
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#94a3b8",
                  }}
                >
                  {step.text}
                </Typography>
              </motion.div>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};

const LiveCardPreview = ({ cardData, maskedCardNumber }) => {
  return (
    <motion.div
      initial={{ rotateX: 10, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          minHeight: 185,
          borderRadius: 5,
          p: 2.5,
          color: "white",
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,.28), transparent 20%), linear-gradient(135deg,#111827,#059669 55%,#2563eb)",
          boxShadow: "0 24px 60px rgba(5,150,105,.30)",
        }}
      >
        <motion.div
          animate={{ x: ["-40%", "120%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            width: "45%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent)",
            transform: "skewX(-18deg)",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 1000, letterSpacing: ".08em" }}>
              AURAPAY
            </Typography>
            <CreditCard />
          </Box>

          <Box
            sx={{
              mt: 4,
              height: 38,
              width: 54,
              borderRadius: 2,
              background: "linear-gradient(135deg,#fde68a,#f59e0b)",
              boxShadow: "inset 0 0 0 2px rgba(255,255,255,.25)",
            }}
          />

          <Typography
            sx={{
              mt: 2.5,
              fontWeight: 1000,
              fontSize: { xs: 18, sm: 22 },
              letterSpacing: ".08em",
            }}
          >
            {maskedCardNumber}
          </Typography>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 10, opacity: 0.75, fontWeight: 900 }}>
                CARD HOLDER
              </Typography>
              <Typography sx={{ fontWeight: 1000, fontSize: 13 }} noWrap>
                {cardData.cardholderName || "YOUR NAME"}
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 10, opacity: 0.75, fontWeight: 900 }}>
                EXPIRES
              </Typography>
              <Typography sx={{ fontWeight: 1000, fontSize: 13 }}>
                {cardData.expiryDate || "MM/YY"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

const UpiScannerBox = ({ upiId }) => {
  return (
    <Box
      sx={{
        borderRadius: 5,
        p: 2.5,
        background: "linear-gradient(135deg,#ecfdf5,#ffffff)",
        border: "1px solid #bbf7d0",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          width: 140,
          height: 140,
          borderRadius: 4,
          background:
            "repeating-linear-gradient(45deg,#111827 0 8px,#fff 8px 16px)",
          display: "grid",
          placeItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ y: [-70, 70, -70] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 3,
            background: "#22c55e",
            boxShadow: "0 0 18px #22c55e",
          }}
        />

        <Box
          sx={{
            width: 58,
            height: 58,
            borderRadius: 3,
            background: "white",
            display: "grid",
            placeItems: "center",
            color: "#059669",
          }}
        >
          <QrCode2 sx={{ fontSize: 38 }} />
        </Box>
      </Box>

      <Typography sx={{ mt: 1.5, fontWeight: 1000, color: "#065f46" }}>
        UPI Secure Scan
      </Typography>
      <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#047857" }}>
        {upiId || "Enter UPI ID below"}
      </Typography>
    </Box>
  );
};

const WalletBox = ({ walletProvider, setWalletProvider }) => {
  const wallets = ["PhonePe", "Google Pay", "Paytm", "Amazon Pay"];

  return (
    <Box
      sx={{
        borderRadius: 5,
        p: 2.5,
        background: "linear-gradient(135deg,#fff7ed,#ffffff)",
        border: "1px solid #fed7aa",
      }}
    >
      <Typography sx={{ fontWeight: 1000, color: "#9a3412", mb: 1.5 }}>
        Select Wallet Provider
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
          gap: 1,
        }}
      >
        {wallets.map((wallet) => {
          const active = walletProvider === wallet;

          return (
            <motion.button
              key={wallet}
              whileTap={{ scale: 0.96 }}
              onClick={() => setWalletProvider(wallet)}
              style={{
                border: active ? "2px solid #f97316" : "1px solid #fed7aa",
                background: active ? "#ffedd5" : "#fff",
                color: "#9a3412",
                borderRadius: 14,
                padding: "12px 8px",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              {wallet}
            </motion.button>
          );
        })}
      </Box>
    </Box>
  );
};

const OrderSummaryCard = ({
  product,
  qty,
  productPrice,
  taxAmount,
  totalDisplay,
  orderId,
}) => {
  return (
    <Card
      sx={{
        p: { xs: 2, sm: 3 },
        position: { lg: "sticky" },
        top: 110,
        borderRadius: 6,
        border: "1px solid rgba(226,232,240,.9)",
        boxShadow: "0 24px 70px rgba(15,23,42,.10)",
        background: "rgba(255,255,255,.88)",
        backdropFilter: "blur(18px)",
      }}
    >
      <Box
        sx={{
          borderRadius: 5,
          p: 2,
          color: "white",
          background: "linear-gradient(135deg,#064e3b,#0f172a)",
          mb: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            right: -28,
            top: -28,
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: "rgba(255,255,255,.08)",
          }}
        />

        <Typography sx={{ fontSize: 12, fontWeight: 900, opacity: 0.75 }}>
          ORDER ID
        </Typography>
        <Typography sx={{ fontWeight: 1000, fontSize: 18 }}>
          #{orderId}
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 1000 }}>
        📦 Order Summary
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          alignItems: "center",
          p: 1.5,
          borderRadius: 4,
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          mb: 2,
        }}
      >
        <Box
          sx={{
            width: 58,
            height: 58,
            borderRadius: 3,
            background: "#fff",
            display: "grid",
            placeItems: "center",
            overflow: "hidden",
            border: "1px solid #e2e8f0",
            flexShrink: 0,
          }}
        >
          {product?.image ? (
            <img
              src={product.image}
              alt={product?.name || product?.productName}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: 6,
              }}
            />
          ) : (
            <CreditCard sx={{ color: "#10b981" }} />
          )}
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 1000, fontSize: 13 }} noWrap>
            {product?.name || product?.productName}
          </Typography>
          <Typography sx={{ color: "#64748b", fontWeight: 700, fontSize: 12 }}>
            Qty: {qty}
          </Typography>
        </Box>
      </Box>

      <PriceRow label="Subtotal" value={formatPrice(productPrice * qty)} />
      <PriceRow label="Tax 18%" value={formatPrice(taxAmount * qty)} />
      <PriceRow label="Platform Fee" value="FREE" green />

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderRadius: 4,
          background: "linear-gradient(135deg,#ecfdf5,#eff6ff)",
        }}
      >
        <Typography sx={{ fontWeight: 1000 }}>Total Payable</Typography>
        <Typography sx={{ fontWeight: 1000, color: "#059669", fontSize: 22 }}>
          {totalDisplay}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 2,
          p: 2,
          backgroundColor: "#f0fdf4",
          borderRadius: 4,
          textAlign: "center",
          border: "1px solid #bbf7d0",
        }}
      >
        <VerifiedUser sx={{ color: "#16a34a", mb: 0.5 }} />
        <Typography
          variant="caption"
          sx={{ fontWeight: 900, display: "block", color: "#166534" }}
        >
          256-bit Secure Demo Payment
        </Typography>
      </Box>
    </Card>
  );
};

const PriceRow = ({ label, value, green }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 1.2,
      }}
    >
      <Typography sx={{ color: "#64748b", fontWeight: 700, fontSize: 14 }}>
        {label}
      </Typography>

      <Typography
        sx={{
          color: green ? "#16a34a" : "#0f172a",
          fontWeight: 900,
          fontSize: 14,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};