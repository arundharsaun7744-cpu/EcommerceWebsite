const express = require("express");
const router = express.Router();

const getProductController = require("../Controller/getProductController");

router.get(
  "/products/brand/:brandname",
  getProductController.getProductsByBrand
);

module.exports = router;