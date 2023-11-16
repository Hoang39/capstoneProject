const Product = require("../models/productModel");
const Cate = require("../models/cateModel");
const asyncHandler = require("express-async-handler");

class ProductController {
  // [ GET : ROUTE: api/product ]
  getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  });

  // [ GET : ROUTE: api/product/:slug ]
  getProductBySlug = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product does not exist!");
    }
  });

  // [ GET : ROUTE: api/product/phone ]
  getProductPhone = asyncHandler(async (req, res) => {
    const products = await Product.find({
      $or: [
        { cate: { $elemMatch: { slug: "dien-thoai-di-dong" } } },
        { cate: { $elemMatch: { slug: "uu-dai-hot-dien-thoai" } } },
        { cate: { $elemMatch: { slug: "dich-vu-dien-thoai" } } },
        { cate: { $elemMatch: { slug: "dien-thoai-gap" } } },
      ],
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/laptop ]
  getProductLaptop = asyncHandler(async (req, res) => {
    const products = await Product.find({
      $or: [
        { cate: { $elemMatch: { slug: "laptop" } } },
        { cate: { $elemMatch: { slug: "uu-dai-hot-laptop" } } },
      ],
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/tablet ]
  getProductTablet = asyncHandler(async (req, res) => {
    const products = await Product.find({
      $or: [
        { cate: { $elemMatch: { slug: "tablet" } } },
        { cate: { $elemMatch: { slug: "uu-dai-hot-tablet" } } },
      ],
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/monitor ]
  getProductMonitor = asyncHandler(async (req, res) => {
    const products = await Product.find({
      cate: { $elemMatch: { slug: "man-hinh" } },
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/tivi ]
  getProductTivi = asyncHandler(async (req, res) => {
    const products = await Product.find({
      cate: { $elemMatch: { slug: "smart-tv" } },
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/watch ]
  getProductWatch = asyncHandler(async (req, res) => {
    const products = await Product.find({
      cate: { $elemMatch: { slug: "dong-ho" } },
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/speakHead ]
  getProductSpeakerHead = asyncHandler(async (req, res) => {
    const products = await Product.find({
      cate: { $elemMatch: { slug: "loa-tai-nghe" } },
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/oldProduct ]
  getProductOldProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({
      cate: { $elemMatch: { slug: "kho-san-pham-cu" } },
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/service ]
  getProductService = asyncHandler(async (req, res) => {
    const products = await Product.find({
      cate: { $elemMatch: { slug: "dich-vu-sua-chua" } },
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/accessory ]
  getProductAccessory = asyncHandler(async (req, res) => {
    const products = await Product.find({
      $or: [
        { cate: { $elemMatch: { slug: "phu-kien" } } },
        { cate: { $elemMatch: { slug: "phu-kien-loa-tai-nghe" } } },
        { cate: { $elemMatch: { slug: "smart-home" } } },
        { cate: { $elemMatch: { slug: "do-choi-cong-nghe" } } },
        { cate: { $elemMatch: { slug: "dich-vu" } } },
      ],
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/cate ]
  getAllCates = asyncHandler(async (req, res) => {
    const cates = await Cate.find({});
    res.json(cates);
  });
}

module.exports = new ProductController();
