const mongoose = require("mongoose");

const adminItem = new mongoose.Schema(
  {
    myVendors: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminItem", adminItem);
