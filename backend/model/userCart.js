const mongoose = require("mongoose");

const userCart = new mongoose.Schema(
  {
    myVendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserCart", userCart);
