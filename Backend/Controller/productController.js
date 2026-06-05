const ProductService = require("../services/product.service");

const ProductController = {
  uploadProducts: async (req, res) => {
    try {
      console.log("✅ Upload route reached");
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const result = await ProductService.uploadProductsFromCSV(req);

      return res.status(200).json({
        success: true,
        message: "Products uploaded successfully",
        data: result,
      });
    } catch (error) {
      console.error("❌ Upload controller error:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Product upload failed",
        errorName: error.name,
        errorCode: error.code,
        sqlMessage: error.sqlMessage,
      });
    }
  },

  getProducts: async (req, res) => {
    try {
      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.min(Number(req.query.limit) || 20, 100);
      const offset = (page - 1) * limit;

      const result = await ProductService.getProductsPaginated({
        page,
        limit,
        offset,
      });

      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error("❌ Fetch products error:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch products",
      });
    }
  },

  getProductsByCategory: async (req, res) => {
    try {
      const { category } = req.params;

      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.min(Number(req.query.limit) || 20, 100);
      const offset = (page - 1) * limit;

      const result = await ProductService.getProductsByCategoryPaginated({
        category,
        page,
        limit,
        offset,
      });

      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error("❌ Fetch category products error:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch category products",
      });
    }
  },

  getProductsByBrand: async (req, res) => {
    try {
      const { brandname } = req.params;

      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.min(Number(req.query.limit) || 20, 100);
      const offset = (page - 1) * limit;

      const result = await ProductService.getProductsByBrandPaginated({
        brandName: brandname,
        page,
        limit,
        offset,
      });

      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error("❌ Fetch brand products error:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch brand products",
      });
    }
  },
};

module.exports = ProductController;