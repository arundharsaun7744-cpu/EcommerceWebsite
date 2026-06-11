const db = require("../db/mysql");

const normalizeBrand = (value = "") => {
  return String(value)
    .trim()
    .replace(/-/g, " ")
    .replace(/\s+/g, " ");
};

const getProductsService = {
  getProductsByBrand: async (brandname, page = 1, limit = 100) => {
    const requestedBrand = normalizeBrand(brandname);

    const currentPage = Math.max(Number(page) || 1, 1);
    const productLimit = Math.min(Math.max(Number(limit) || 100, 1), 100);
    const offset = (currentPage - 1) * productLimit;

    const baseQuery = db("products").where(function () {
      this.where("BrandName", requestedBrand).orWhere("category", requestedBrand);
    });

    const totalResult = await baseQuery.clone().count({ total: "*" }).first();
    const totalProducts = Number(totalResult?.total || 0);

    const products = await baseQuery
      .clone()
      .select(
        "id",
        "category",
        "BrandName",
        "productName",
        "price",
        "quantity",
        "sales",
        "offer"
      )
      .orderBy("id", "desc")
      .limit(productLimit)
      .offset(offset);

    const totalPages = Math.ceil(totalProducts / productLimit);

    return {
      products,
      pagination: {
        totalProducts,
        currentPage,
        limit: productLimit,
        totalPages,
        hasNextPage: currentPage < totalPages,
      },
    };
  },
};

module.exports = getProductsService;