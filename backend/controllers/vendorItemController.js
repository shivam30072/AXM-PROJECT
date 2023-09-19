const asyncHandler = require("express-async-handler");
const vendorItem = require("../model/vendorItem");
const Vendor = require("../model/vendorModel");

const createItem = asyncHandler(async (req, res) => {
  const { title, desc } = req.body;

  const userId = req.user.id;

  if (!userId) {
    res.status(400).json({ message: "User not authenticated" });
    throw new Error("User not authenticated");
  }

  if (!title) {
    res.status(400).json({ message: "Title not Provided" });
    throw new Error("Title not Provided");
  }

  const vendor = await Vendor.findOne({ _id: userId }).select("-password");

  const createdBy = vendor;

  const item = await vendorItem.create({ title, desc, createdBy });
  if (item) {
    return res.status(200).json(item);
  }
  res.status(400).json({ message: "Server Error" });
});

const getAllItems = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    res.status(400).json({ message: "User not authenticated" });
    throw new Error("User not authenticated");
  }
  const allItems = await vendorItem
    .find({ createdBy: userId })
    .sort("createdAt");
  res.status(200).json({ allItems, count: allItems.length });
});

const updateItem = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  const userId = req.user.id;
  const { title } = req.body;
  if (!userId) {
    res.status(400).json({ message: "User not authenticated" });
    throw new Error("User not authenticated");
  }

  if (!itemId) {
    res.status(400).json({ message: "Params not found error" });
    throw new Error("Params not found error");
  }

  if (!title) {
    res.status(400).json({ message: "Title not Provided" });
    throw new Error("Title not Provided");
  }

  const updatedItem = await vendorItem.findByIdAndUpdate(
    { _id: itemId, createdBy: userId },
    req.body,
    {
      new: true,
    }
  );
  if (updatedItem) {
    res.status(200).json(updatedItem);
  } else {
    res.status(404).json({ message: "Task does not exist" });
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  const userId = req.user.id;
  if (!itemId) {
    return res.status(400).json({ message: "Params not found error" });
  }
  if (!userId) {
    res.status(400).json({ message: "User not authenticated" });
    throw new Error("User not authenticated");
  }
  const deletedTask = await vendorItem.findByIdAndDelete({
    _id: itemId,
    createdBy: userId,
  });
  if (deletedTask) {
    return res.status(200).json({ message: "Task deleted successfully" });
  }
  res.status(404).json({ message: "Task does not exist" });
});

module.exports = { createItem, getAllItems, updateItem, deleteItem };
