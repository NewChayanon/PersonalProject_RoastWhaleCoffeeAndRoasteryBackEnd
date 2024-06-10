const productService = require("../services/product-service");

const stockController = {};

stockController.addProduct = async (req, res, next) => {
  try {
    const data = req.input;
    console.log(data);
    const product = await productService.addProduct(data);
    const image = await productService.addImage(data.image, product.id);
    res.status(201).json({ msg: "create product success" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

stockController.deleteProduct = async (req, res, next) => {
  try {
    const productId = +req.params.productId;
    const isDelete = await productService.deleteProduct(productId);
    console.log(isDelete);
    res.json({ msg: "delete successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = stockController;
