const fs = require("fs");
const csv = require("fast-csv");
const ProductModel = require("../models/ProductsModel");

const ProductService = {
  uploadProductsFromExcel: async (req) => {
    const { category } = req.body;

    if (!category) throw new Error("Please select product category");
    if (!req.file) throw new Error("Please upload CSV file");

    const allowedCategories = ["electronics", "grocery", "fashion", "home_appliances", "toys"];
    
    return new Promise((resolve, reject) => {
      let batch = [];
      const BATCH_SIZE = 5000; 
      let totalInserted = 0;
      let isProcessing = false;

      const stream = fs.createReadStream(req.file.path)
        .pipe(csv.parse({ headers: true, trim: true }));

      stream.on("data", async (row) => {
        const finalCategory = category === "mixed" ? String(row.category).toLowerCase().trim() : category;

        if (allowedCategories.includes(finalCategory) && row.productName && row.BrandName) {
          batch.push({
            category: finalCategory,
            productName: row.productName,
            BrandName: row.BrandName,
            price: Number(row.price) || 0,
            quantity: Number(row.quantity) || 0,
            sales: Number(row.sales) || 0,
            offer: row.offer ? String(row.offer) : "0",
            rating: Number(row.rating) || 0,
            created_at: new Date(),
            updated_at: new Date()
          });
        }

        if (batch.length >= BATCH_SIZE) {
          stream.pause(); 
          isProcessing = true;
          try {
            await ProductModel.insertProducts(batch);
            totalInserted += batch.length;
            batch = []; 
            stream.resume(); 
            isProcessing = false;
          } catch (err) {
            stream.destroy(err);
          }
        }
      });

      stream.on("end", async () => {
        try {
          if (batch.length > 0) {
            await ProductModel.insertProducts(batch);
            totalInserted += batch.length;
          }
          
          if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
          
          console.log(`✅ total products count stored ${totalInserted}`);
          resolve({ totalProducts: totalInserted });
        } catch (err) {
          reject(err);
        }
      });

      stream.on("error", (err) => {
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        console.error("❌ Streaming Error:", err);
        reject(err);
      });
    });
  },

  getAllProducts: async () => {
    return await ProductModel.getAllProducts();
  },
  getProductsByCategory: async (category) => {
    return await ProductModel.getProductsByCategory(category);
  },
};

module.exports = ProductService;