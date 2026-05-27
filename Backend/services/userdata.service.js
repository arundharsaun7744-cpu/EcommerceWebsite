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





exports.getUserProfile = async (u_id) => {
    // Database-la 'id' match aagura user details-ah matum edukurom
    const user = await db("userdetails")
        .where({ id: u_id })
        .first(); 

    return user;
};  