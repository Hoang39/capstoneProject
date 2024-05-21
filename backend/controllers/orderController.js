const Product = require("../models/productModel.js");
const Order = require("../models/orderModel.js");
const asyncHandler = require("express-async-handler");

class OrderController {
  //  [ POST - ROUTE: api/order]
  createOrder = asyncHandler(async (req, res) => {
    const { orderList, shippingAddress, paymentMethod, totalPrice } = req.body;

    const newOrder = await Order.create({
      user: req.user._id,
      orderList,
      shippingAddress,
      paymentMethod,
      paymentStatus: "pending",
      shippingPrice,
      totalPrice,
    });
    res.json(newOrder);
  });

  //  [ PATCH - ROUTE: api/order/:id]
  updateStatus = asyncHandler(async (req, res) => {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (order) {
      order.paymentStatus = orderStatus;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order does not exist!");
    }
  });
}

module.exports = new OrderController();
