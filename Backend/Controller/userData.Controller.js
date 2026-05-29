// Temporary storage (acts like DB)
const userdata_Service = require("../services/userdata.service");

let users = [];

console.log("helo");

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

    userdata_Service.InsertUser(userData);

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

exports.getAllUsers = async (req, res) => {
    try {
        const { user_id } = req.query; 

        if (!user_id) {
            return res.status(400).json({ 
                success: false, 
                message: "User ID (user_id) is required" 
            });
        }

        // Service call-ku indha user_id-ai pass seigiraom
        const user = await userdata_Service.getUserProfile(user_id);

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found in database" 
            });
        }

        // Data successfully sent to frontend
        res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};