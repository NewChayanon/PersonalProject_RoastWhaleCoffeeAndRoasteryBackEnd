const express = require("express");
const productController = require("../controllers/product-controller");
const productRouter = express.Router();

productRouter.get("/coffee", productController.getCoffee);
productRouter.get("/tool", productController.getTool);
productRouter.get("/new", productController.getNewProduct);
productRouter.get("/popular", productController.getPopularProduct);
productRouter.get("/:productId", productController.getInfoProduct);

module.exports = productRouter;
