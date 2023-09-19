const express = require("express");
const router = express.Router();

const {
  createItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require("../controllers/vendorItemController");

router.route("/").post(createItem).get(getAllItems);
router.route("/:id").patch(updateItem).delete(deleteItem);

module.exports = router;
