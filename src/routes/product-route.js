const express = require("express");
const productController = require("../controllers/product-controller");
const productRouter = express.Router();

productRouter.get("/coffees", productController.getCoffee);
productRouter.get("/tools", productController.getTool);
productRouter.get("/new-arrivals", productController.getNewProduct);
productRouter.get("/popular-products", productController.getPopularProduct);
productRouter.get("/:productId", productController.getInfoProduct);

module.exports = productRouter;
