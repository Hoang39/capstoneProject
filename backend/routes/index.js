const productRouter = require("./productRoutes");

function routes(app) {
  app.use("/api/product", productRouter);
}

module.exports = routes;
