const express = require("express");
const multer = require("multer");
const path = require("path");
const ProductController = require("../Controller/productController");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];

  const allowedExtensions = [".xlsx", ".xls"];
  const fileExt = path.extname(file.originalname).toLowerCase();

  if (
    allowedMimeTypes.includes(file.mimetype) &&
    allowedExtensions.includes(fileExt)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only Excel files allowed. Upload .xlsx or .xls file."));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.post(
  "/upload-products",
  upload.single("excelFile"),
  ProductController.uploadProducts
);

router.get("/brand/:brandname", productController.getProductsByBrandName);

module.exports = router;