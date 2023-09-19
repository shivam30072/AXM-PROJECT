const express = require("express");
const router = express.Router();

const { getAllVendors } = require("../controllers/adminItemController");

router.route("/").get(getAllVendors);

module.exports = router;
