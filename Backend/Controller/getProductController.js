const getProductsService = require("../services/getProducts.service");

const getProductController = {
  getProductsByBrand: async (req, res) => {
    try {
      const { brandname } = req.params;
      const { page = 1, limit = 100 } = req.query;

      const result = await getProductsService.getProductsByBrand(
        brandname,
        page,
        limit
      );

      return res.status(200).json({
        success: true,
        brandname,
        count: result.products.length,
        products: result.products,
        pagination: result.pagination,
      });
    } catch (error) {
      console.error("Get products by brand error:", error);

      return res.status(500).json({
        success: false,
        message: "Server error while fetching brand products",
        error: error.message,
        products: [],
      });
    }
  },
};

module.exports = getProductController;