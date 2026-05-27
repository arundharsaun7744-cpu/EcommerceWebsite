const express = require("express");
const router = express.Router();


const authController = require("../Controller/auth.controller");

router.post("/userlogin", authController.userLogin);
router.post("/verify-otp", authController.verifyOtp);

router.get("/authdata", authController.getAuthData);

module.exports = router;
