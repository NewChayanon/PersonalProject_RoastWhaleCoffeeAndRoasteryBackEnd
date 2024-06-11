const categoryService = require("../services/category-service");
const productAndSizeService = require("../services/product-and-size-service");
const productService = require("../services/product-service");
const sizeService = require("../services/size-service");

const stockController = {};

stockController.addProduct = async (req, res, next) => {
  try {
    const data = req.input;
    const categoryId = await categoryService.searchCategory(data.category)
    delete data.category
    data.categoryId = categoryId.id
    const product = await productService.addProduct(data);
    const size = await sizeService.addProduct(data.size)
    const productAndSize = await productAndSizeService.addProduct(size.id, product.id, data)
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
