const express = require("express");
const stockController = require("../controllers/stock-controller");
const { authenticate } = require("../middlewares/authenticate");
const { addProductValidator, updateOrderValidator, editValidator, addProductImageValidator } = require("../middlewares/validator");
const { isAdmin } = require("../middlewares/isAdmin");
const upload = require("../middlewares/upload");
const stockRouter = express.Router();

// add product image
stockRouter.post("/products/images", upload.single("productImage"), addProductImageValidator, stockController.addProductImage);

// add product - Validation /Authentication
stockRouter.post("/products", addProductValidator, stockController.addProduct);

// delete product - Authentication (soft delete)
stockRouter.patch("/products/:productId/remove", stockController.deleteProduct);

// update status order - Validation /Authentication
stockRouter.patch("/orders/:orderId", updateOrderValidator, stockController.updateStatusOrder);

// start server
stockRouter.post("/server/generate", stockController.generateServer);

// fetch all order
stockRouter.get("/orders", stockController.getAllOrder);

// edit product
stockRouter.patch("/products", editValidator, stockController.editCoffeeProduct);

module.exports = stockRouter;
