const express = require("express")
const router = express.Router();
const authenticateToken = require("../middleware/middleware.js")
const upload = require("../multer.js")

const { handleUserUpdate, handleImageUpload } = require("../controller/user.js")

router.put("/update", handleUserUpdate);
router.post("/upload", authenticateToken, upload.single("image"),  handleImageUpload);

module.exports = router;