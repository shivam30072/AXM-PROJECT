const mongoose = require("mongoose");

const vendorItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      // required: [true, "Title is required"],
    },
    desc: {
      type: String,
      trim: true,
      max: 50,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorItem", vendorItemSchema);
