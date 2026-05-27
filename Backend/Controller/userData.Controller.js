// Temporary storage (acts like DB)
const userdata_Service = require("../services/userdata.service");

let users = [];


exports.storeDatas = (req, res) => {
  try {
    const { id, name, gender, address, location, pincode } = req.body;




    if (!id || !name || !gender || !address || !location || !pincode)  {
      return res.status(400).json({
        success: false,
        message: "Check the forms and fill the non fillable input ",
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile image required",
      });
    }

    const profileimg = req.file.filename; 

    const userData = {
      id,
      name,
      gender,
      address,
      location,
      pincode,
      profileimg,
      createdAt: new Date(),
    };

    userdata_Service.createUser(userData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userData,
    });

  } catch (error) {
    console.error("❌ Store Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ===============================
    GET ALL USERS (OPTIONAL)
================================ */

exports.getAllUsers = async (req, res) => {
    try {
        const { u_id } = req.query; 


        if (!u_id) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Service call panni data-va edukurom
        const user = await userdata_Service.getUserProfile(u_id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Data-va return panrom
        res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
