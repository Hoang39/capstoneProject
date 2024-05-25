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
router.post("/create", authMiddlewares.protect, orderController.createOrder);
router.post("/", authMiddlewares.protect, orderController.getOrder);

module.exports = router;
