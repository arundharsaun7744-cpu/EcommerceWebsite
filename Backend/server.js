require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require('fs');
const path = require("path");

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("✅ 'uploads' folder dynamically created!");
}
const UserModel = require("./models/User.model");

const userRouter = require("./routes/userdata.route");
const authRouter = require("./routes/auth.route");

const app = express();

const port = process.env.PORT || 8000;

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

// CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
  });
});

// Routes
app.use("/api", userRouter);
app.use("/api/auth", authRouter);

// 404 handler - JSON return panna important
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Error handler - HTML varaama JSON varum
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start server after table init
const startServer = async () => {
  try {
    await UserModel.initializeTables();

    app.listen(port, () => {
      console.log(`🚀 Backend running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();