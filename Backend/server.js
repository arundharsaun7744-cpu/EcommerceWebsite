require("dotenv").config();

const express = require("express");
const cors = require('cors');
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const XLSX = require("xlsx");
const ProductModel = require("./models/ProductsModel");

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ 'uploads' folder dynamically created!");
}

const UserModel = require("./models/User.model");
const userRouter = require("./routes/userdata.route");
const authRouter = require("./routes/auth.route");
const getProductsRoute = require("./routes/getProducts.route"); 

const app = express();
const port = process.env.PORT || 8000;

// =================================================================
// 🛡️ 1. CORS CONFIGURATION (100% WORKING & BUG-FREE)
// =================================================================
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

// =================================================================
// 📦 2. GLOBAL MIDDLEWARES
// =================================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static public & uploads folders
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =================================================================
// 🗂️ 3. MULTER & EXCEL UPLOAD CONFIGURATION (Moved Upwards)
// =================================================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname).toLowerCase();
  
  // 👈 .csv ஃபைலை மட்டும் அனுமதிக்கிறோம்
  if (file.mimetype === "text/csv" || fileExt === ".csv") {
    cb(null, true);
  } else {
    cb(new Error("1 கோடி டேட்டாவுக்கு CSV ஃபைல் மட்டும்தான் அனுமதிக்கப்படும் ப்ரோ! .csv ஃபைல் அப்லோடு பண்ணுங்க."));
  }
};

const upload = multer({ storage, fileFilter });
const ProductService = require("./services/product.service"); // உங்க பாத் படி இம்போர்ட் செய்யுங்க

// =================================================================
// 🛒 4. ALL API ROUTES 
// =================================================================
app.use("/api", getProductsRoute); 
app.use("/api", userRouter);
app.use("/api/auth", authRouter);

// Base test routes
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend is running" });
});

app.get("/product-upload", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "product-upload.html"));
});

// ✅ ஒரே ஒரு தெளிவான Excel upload API (ProductService மூலம் DB-யில் சேமிக்கும்)
app.post("/api/upload-products", upload.single("excelFile"), async (req, res) => {
  try {
    // நேராக உங்க சர்வீஸ் ஃபங்க்ஷனை கூப்பிட்டு டேட்டாவை பாஸ் பண்ணுங்க
    const finalData = await ProductService.uploadProductsFromExcel(req);

    return res.status(200).json({
      success: true,
      message: "Products uploaded and stored in DB successfully",
      totalProducts: finalData.length,
      data: finalData,
    });
  } catch (error) {
    console.error("❌ Excel upload error:", error.message);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    return res.status(400).json({ success: false, message: error.message || "Something went wrong" });
  }
});

// =================================================================
// 🚨 5. ERROR & 404 HANDLERS (ALWAYS AT THE VERY BOTTOM)
// =================================================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Server Initialization
const startServer = async () => {
  try {
    await UserModel.initializeTables();
    await ProductModel.initializeTable();

    app.listen(port, () => {
      console.log(`🚀 Backend running at http://localhost:${port}`);
      console.log(`📄 Product Upload Page: http://localhost:${port}/product-upload`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();