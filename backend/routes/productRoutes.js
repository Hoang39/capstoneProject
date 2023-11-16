const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/cate", productController.getAllCates);

router.get("/", productController.getAllProducts);

router.get("/phone", productController.getProductPhone);
router.get("/laptop", productController.getProductLaptop);
router.get("/tablet", productController.getProductTablet);
router.get("/monitor", productController.getProductMonitor);
router.get("/tivi", productController.getProductTivi);
router.get("/watch", productController.getProductWatch);
router.get("/speakHead", productController.getProductSpeakerHead);
router.get("/oldProduct", productController.getProductOldProduct);
router.get("/service", productController.getProductService);
router.get("/accessory", productController.getProductAccessory);

router.get("/:slug", productController.getProductBySlug);

module.exports = router;
