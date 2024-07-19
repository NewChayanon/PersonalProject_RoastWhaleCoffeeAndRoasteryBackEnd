const { all } = require("../routes/stock-route");
const categoryService = require("../services/category-service");
const orderService = require("../services/order-service");
const productAndSizeService = require("../services/product-and-size-service");
const productService = require("../services/product-service");
const sizeService = require("../services/size-service");
const uploadService = require("../services/upload-service");

const stockController = {};

stockController.addProductImage = async (req, res, next) => {
  try {
    const productImage = req.file.path;
    const productId = +req.body.productId;

    const urlCloudinary = await uploadService.upload(productImage);

    const image = await productService.addImage(urlCloudinary, productId);

    res.status(201).json(image);
  } catch (error) {
    next(error);
  }
};

stockController.addProduct = async (req, res, next) => {
  try {
    const data = req.input;
    const { category, coffee, tool } = req.input;

    const categoryId = await categoryService.searchCategory(category);
    data.categoryId = categoryId.id;
    const product = await productService.addProduct(data);

    if (category === "coffee") {
      const sizeIdCoffee = await sizeService.searchSizeCoffee(coffee);
      const prepareInfoCoffee = await productAndSizeService.prepareInfoCoffee(coffee, sizeIdCoffee, product.id);
      const productAndSize = await productAndSizeService.addProduct(prepareInfoCoffee);
    }
    if (category === "tool") {
      const sizeIdTool = await sizeService.searchSizeTool(tool);
      const prepareInfoTool = await productAndSizeService.prepareInfoTool(tool, sizeIdTool.id, product.id);

      const productAndSize = await productAndSizeService.addProduct(prepareInfoTool);
    }

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

stockController.deleteProduct = async (req, res, next) => {
  try {
    const productId = +req.params.productId;
    const isDelete = await productService.deleteProduct(productId);

    res.json({ msg: "delete successfully" });
  } catch (error) {
    next(error);
  }
};

stockController.updateStatusOrder = async (req, res, next) => {
  try {
    const orderId = +req.params.orderId;
    const { status } = req.order;
    const updated = await orderService.updateStatusOrder(orderId, status);
    res.status(200).json({ updated });
  } catch (error) {
    next(error);
  }
};

stockController.generateServer = async (req, res, next) => {
  try {
    const { category, size } = req.body;
    await categoryService.generateServer(category);
    await sizeService.generateServer(size);
    res.status(200).json({ msg: "generate successfully" });
  } catch (error) {
    next(error);
  }
};

stockController.getAllOrder = async (req, res, next) => {
  try {
    const allOrder = await orderService.fetchAllOrder();
    res.json(allOrder);
  } catch (error) {
    next(error);
  }
};

stockController.editCoffeeProduct = async (req, res, next) => {
  try {
    const { id, name, description, details, category } = req.body;
    const coffee = req.body.coffee;
    const tool = req.body.tool;
    
    const editCoffeeProductTableProduct = await productService.updateProductById(id, name, description, details);

    if (category == "coffee") {
      const editCoffeeProductTableProductAndSize = await productAndSizeService.editProductCoffee(coffee);
    } else {
      const editToolProductTableProductAndSize = await productAndSizeService.editProductTool(tool);
    }
    res.json({ msg: "edit success" });
  } catch (error) {
    next(error);
  }
};

module.exports = stockController;
