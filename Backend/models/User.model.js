const db = require("../db/mysql");

const UserModel = {
  initializeTables: async () => {
    try {
      // login_users table
      const hasLoginTable = await db.schema.hasTable("login_users");

      if (!hasLoginTable) {
        await db.schema.createTable("login_users", (table) => {
          table.string("id", 255).primary();
          table.string("phonenumber", 20).nullable();
          table.string("email", 255).notNullable().unique();
          table.integer("is_profile_completed").defaultTo(0);
          table.timestamps(true, true);
        });

        console.log("✅ login_users table created successfully!");
      } else {
        console.log("ℹ️ login_users table already exists");
      }

      // userdetails table
      const hasDetailsTable = await db.schema.hasTable("userdetails");

      if (!hasDetailsTable) {
        await db.schema.createTable("userdetails", (table) => {
          table.string("id", 255).primary();
          table.string("userImage", 255).nullable();
          table.string("userName", 255).nullable();
          table.string("gender", 20).nullable();
          table.text("address").nullable();
          table.string("location", 255).nullable();
          table.string("pincode", 20).nullable();
          table.timestamps(true, true);
        });

        console.log("✅ userdetails table created successfully!");
      } else {
        console.log("ℹ️ userdetails table already exists");
      }
    } catch (err) {
      console.error("❌ Error creating tables:", err);
      throw err;
    }
  },
};

module.exports = UserModel;