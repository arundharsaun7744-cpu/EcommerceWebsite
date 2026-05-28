const db = require("../db/mysql");

/* ===============================
   INSERT USER
*/
exports.InsertUser = async (data) => {
  try {
    console.log("Checking userdetails mapping for ID:", data.id);

    // 🔥 STEP 5: userdetails table-la indha dynamic ID munbae irukkaa nu check seigirom
    const existingDetails = await db("userdetails")
        .where({ id: data.id })
        .first();

    const profilePayload = {
      userImage: data.profileimg,
      userName: data.name,
      gender: data.gender,
      address: data.address,
      location: data.location,
      pincode: data.pincode,
    };

    if (existingDetails) {
      // ✅ User details dashboard-il munae irundhaal, pure UPDATE query run aagum
      await db("userdetails")
        .where({ id: data.id })
        .update(profilePayload);
      console.log("✅ 'userdetails' successfully updated for ID:", data.id);
    } else {
      // ✅ Sutthamaaga illai endral, login_users id mappingodu saerthu INSERT aagum
      await db("userdetails").insert({
        id: data.id,
        ...profilePayload
      });
      console.log("✅ New profile details row inserted safely for ID:", data.id);
    }

    return {
      id: data.id,
      ...profilePayload,
      createdAt: new Date(),
    };

  } catch (err) {
    console.error("❌ MySQL Upsert Error in userdetails:", err);
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