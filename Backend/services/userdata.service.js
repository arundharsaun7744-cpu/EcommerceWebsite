const db = require("../db/mysql");

/* ===============================
   INSERT USER
*/
exports.InsertUser = async (data) => {
  try {
    console.log("Checking userdetails entry for ID:", data.id);

    // 🔥 FIX 2: Check if this user ID already exists in userdetails
    const existingDetails = await db("userdetails").where({ id: data.id }).first();

    const profilePayload = {
      userImage: data.profileimg,
      userName: data.name,
      gender: data.gender,
      address: data.address,
      location: data.location,
      pincode: data.pincode,
    };

    if (existingDetails) {
      // Data table-il irundhal absolute variables-ai mattum UPDATE seigirom
      await db("userdetails").where({ id: data.id }).update(profilePayload);
      console.log("✅ 'userdetails' successfully updated for existing ID:", data.id);
    } else {
      // Data illai endral, custom login identity reference primary key-odu saerthu INSERT seigirom
      await db("userdetails").insert({
        id: data.id,
        ...profilePayload
      });
      console.log("✅ New 'userdetails' profile row inserted successfully!");
    }

    return {
      id: data.id,
      ...profilePayload,
      createdAt: new Date(),
    };

  } catch (err) {
    console.error("❌ MySQL Insert/Update Error in userdetails:", err);
    throw err;
  }
};


/* =================================
   GET USER PROFILE (COMBINED DATA)
================================= */
exports.getUserProfile = async (u_id) => {
    try {
        // 1. First userdetails edukirom
        const details = await db("userdetails").where({ id: u_id }).first();
        
        // 2. Next login_users credentials edukirom
        const loginInfo = await db("login_users").where({ id: u_id }).first();

        if (!details && !loginInfo) return null;

        // 3. Rendu objects-aiyum single single row structured format-il merge seigiraom
        return {
            ...loginInfo,
            ...details
        };
    } catch (err) {
        console.error("❌ MySQL Fetch Error:", err);
        throw err;
    }
};