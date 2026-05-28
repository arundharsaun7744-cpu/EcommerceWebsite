
const authService = require("../services/auth.service");

const isEmail = (value) => /\S+@\S+\.\S+/.test(value);
const isPhone = (value) => /^\+?[0-9\s-()]{7,20}$/.test(value.trim());

exports.userLogin = async (req, res) => {
    try {
        const input = req.body.emailOrPhone ? req.body.emailOrPhone.trim() : null;

        if (!input) {
            return res.status(400).json({ message: "Email or phone is required." });
        }

        let type, identifier;
        
        if (isEmail(input)) {
            type = "EMAIL";
            identifier = input;
        } else if (isPhone(input)) {
            type = "PHONE";
            identifier = input;
        } else {
            return res.status(400).json({ message: "Invalid email or phone format." });
        }
        
    
        const result = await authService.sendOtpService({
            identifier, 
            type,       
        });
        
        
        res.json({
            success: true,
            message: `OTP sent successfully to the ${type.toLowerCase()}.`,
            ...result
        });
        
    } catch (err) {
        
        console.error("userLogin error:", err); 
        res.status(400).json({ message: err.message || "Login failed." });
    }
};



exports.verifyOtp = async (req, res) => {
    try {
        // This endpoint expects { key, otp, phone?, email? }
        const result = await authService.verifyOtpService(req.body); 
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }   
};


exports.getAuthData = async (req, res) => {
  try {
    const { u_id } = req.query;

    if (!u_id) {
      return res.status(400).json({
        success: false,
        message: "User ID missing",
      });
    }

    const user = await authService.getUserProfile(u_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        email: user.email,
        phonenumber: user.phonenumber,
      },
    });
  } catch (err) {
    console.error("AuthData Error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};