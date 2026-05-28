const db = require("../db/mysql"); // Ungaladhu knex connection path-ai inge tharungigal

const UserModel = {
    // 🔥 AUTOMATIC TABLE CREATION FUNCTION (SCREENSHOT COLUMNS MATCHED)
    initializeTables: async () => {
        try {
            // 1. Create 'login_users' Table if it doesn't exist
            const hasLoginTable = await db.schema.hasTable("login_users");
            if (!hasLoginTable) {
                await db.schema.createTable("login_users", (table) => {
                    table.string("id", 255).primary(); // UUID primary key as per screenshot
                    table.string("phonenumber", 20).nullable();
                    table.string("email", 255).notNullable();
                    table.integer("is_profile_completed").defaultTo(0);
                    table.timestamps(true, true); // created_at & updated_at (datetime)
                });
                console.log("✅ 'login_users' table created successfully!");
            }

            // 2. Create 'userdetails' Table if it doesn't exist
            const hasDetailsTable = await db.schema.hasTable("userdetails");
            if (!hasDetailsTable) {
                await db.schema.createTable("userdetails", (table) => {
                    table.string("id", 255).primary(); // Maps with login_users UUID
                    table.string("userImage", 255).nullable();
                    table.string("userName", 255).nullable();
                    table.string("gender", 20).nullable();
                    table.text("address").nullable();
                    table.string("location", 255).nullable();
                    table.string("pincode", 20).nullable();
                    table.timestamps(true, true); // created_at & updated_at
                });
                console.log("✅ 'userdetails' table created successfully!");
            }
        } catch (err) {
            console.error("❌ Error creating tables from schema model:", err);
        }
    }
};

// Server run aagumpodhu automatic-ah table creation logic trigger aagum
UserModel.initializeTables();

module.exports = UserModel;