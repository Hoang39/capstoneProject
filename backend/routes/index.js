const productRouter = require("./productRoutes");
const userRouter = require("./userRoutes");
const cartRouter = require("./cartRoutes");
const orderRouter = require("./orderRoutes");
const messageRouter = require("./messageRoutes");

function routes(app) {
  app.use("/api/product", productRouter);
  app.use("/api/user", userRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/message", messageRouter);
}

module.exports = routes;
