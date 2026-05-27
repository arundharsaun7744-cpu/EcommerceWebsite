const db = require("../db/mysql");

/* ===============================
   INSERT USER
================================ */
exports.createUser = async (data) => {
  try {
    const [id] = await db("userdetails").insert({
      id : data.id,
      userImage: data.profileimg,
      userName: data.name,
      gender: data.gender,
      address: data.address,
      location: data.location,
      pincode: data.pincode,
    });

    return {
      id,
      userImage: data.profileimg,
      userName: data.name,
      gender: data.gender,
      address: data.address,
      location: data.location,
      pincode: data.pincode,
      createdAt: new Date(),
    };
  } catch (err) {
    console.error("❌ MySQL Insert Error:", err);
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