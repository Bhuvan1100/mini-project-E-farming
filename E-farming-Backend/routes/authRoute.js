const express = require("express");
const router = express.Router();

const { handleSignUp, handleLogIn } = require("../controller/auth"); 

router.post("/signup", handleSignUp);
router.post("/login", handleLogIn);

module.exports = router;
