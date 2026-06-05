const db = require("../db/mysql");

const cleanText = (value = "") => {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");
};

const getProductsService = {
  getProductsByBrand: async (brandname) => {
    const requestedBrand = cleanText(brandname);

    console.log("Requested brand:", brandname);
    console.log("Clean requested brand:", requestedBrand);

    const products = await db("products").select("*");

    console.log("Total products:", products.length);

    if (products.length > 0) {
      console.log("First product sample:", products[0]);
    }

    const filteredProducts = products.filter((product) => {
      const possibleBrands = [
        product.brandname,
        product.BrandName,
        product.brandName,
        product.brand_name,
        product.brand,
        product.category,
      ];

      return possibleBrands.some((item) => cleanText(item) === requestedBrand);
    });

    console.log("Filtered products:", filteredProducts.length);

    return filteredProducts;
  },
};

module.exports = getProductsService;