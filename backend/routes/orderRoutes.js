const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.patch(
  "/:id",
  authMiddlewares.protect,
  authMiddlewares.isAdmin,
  orderController.updateStatus
);
router.post("/", authMiddlewares.protect, orderController.createOrder);

module.exports = router;
