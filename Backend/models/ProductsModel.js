const db = require("../db/mysql");

const ProductModel = {
  initializeTable: async () => {
    try {
      const hasProductTable = await db.schema.hasTable("products");

      if (!hasProductTable) {
        await db.schema.createTable("products", (table) => {
          table.increments("id").primary();

          table.string("category", 100).notNullable();
          table.string("BrandName", 100).notNullable();

          table.string("productName", 255).notNullable();

          table.decimal("price", 10, 2).notNullable();

          table.integer("quantity").notNullable();

          table.integer("sales").notNullable();

          table.string("offer", 50).nullable();

          table.decimal("rating", 2, 1).nullable();

          table.timestamps(true, true);
        });

        console.log("✅ products table created successfully!");
      } else {
        console.log("ℹ️ products table already exists");
      }
    } catch (error) {
      console.error("❌ Error creating products table:", error);
      throw error;
    }
  },
 
  insertProducts: async (products) => {
  try {
    // 1 லட்சம் டேட்டாவை 2000, 2000 பிரித்து (Chuncks) MySQL-க்குள் கமிட் செய்யும். 
    // இதனால் சர்வர் டைம்-அவுட் ஆகவே ஆகாது!
    return await db.batchInsert("products", products, 2000); 
  } catch (error) {
    console.error("❌ Error inserting products:", error);
    throw error;
  }
},

  getAllProducts: async () => {
    try {
      return await db("products").select("*").orderBy("id", "desc");
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      throw error;
    }
  },

  getProductsByCategory: async (category) => {
    try {
      return await db("products")
        .where({ category })
        .select("*")
        .orderBy("id", "desc");
    } catch (error) {
      console.error("❌ Error fetching products by category:", error);
      throw error;
    }
  },
};

module.exports = ProductModel;