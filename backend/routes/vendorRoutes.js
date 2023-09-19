const express = require("express");
const router = express.Router();

const { signupUser, loginUser } = require("../controllers/vendorController");

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);

module.exports = router;
