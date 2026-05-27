const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");
const controller = require("../Controller/userData.Controller");

// ✅ STORE USER + IMAGE (WITH MULTER)
router.post(
  "/userdata",
  upload.single("profileimg"),
  controller.storeDatas
);

// ✅ GET USER
router.get("/get-user", controller.getAllUsers);

module.exports = router;
