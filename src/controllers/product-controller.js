const productService = require("../services/product-service");

const productController = {};

productController.getCoffee = async (req, res, next) => {
  try {
    const coffee = await productService.getCoffee();

    res.json({ coffee });
  } catch (error) {
    next(error);
  }
};

productController.getTool = async (req, res, next) => {
  try {
    const tool = await productService.getTool();
    res.json({ tool });
  } catch (error) {
    next(error);
  }
};

productController.getNewProduct = async (req, res, next) => {
  try {
    const fetch = await productService.fetchNewProduct();
    res.status(200).json({ fetch });
  } catch (error) {
    next(error);
  }
};

productController.getPopularProduct = async (req, res, next) => {
  try {
    const fetch = await productService.fetchPopularProduct();
    
    res.status(200).json(fetch);
  } catch (error) {
    next(error)
  }
};

productController.getInfoProduct = async (req, res, next) => {
  try {
    const productId = +req.params.productId;
    const infoProductId = await productService.fetchInfoProduct(productId);
    
    res.status(200).json(infoProductId);
  } catch (error) {
    next(error);
  }
};

module.exports = productController;
