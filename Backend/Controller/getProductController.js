const getProductsService = require("../services/getProducts.service");

const getProductController = {
  getProductsByBrand: async (req, res) => {
    try {
      const { brandname } = req.params;

      const products = await getProductsService.getProductsByBrand(brandname);

      return res.status(200).json({
        success: true,
        brandname,
        count: products.length,
        products,
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