const asyncHandler = require("express-async-handler");
const AdminItem = require("../model/adminItemModel");
const Vendor = require("../model/vendorModel");

const getAllVendors = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    res.status(400).json({ message: "User not authenticated" });
    throw new Error("User not authenticated");
  }
  const allvendors = await Vendor.find({}).sort("createdAt");
  res.status(200).json({ allvendors, count: allvendors.length });
});

module.exports = { getAllVendors };
