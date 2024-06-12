const categoryService = require("../services/category-service");
const orderService = require("../services/order-service");
const productAndSizeService = require("../services/product-and-size-service");
const productService = require("../services/product-service");
const sizeService = require("../services/size-service");

const stockController = {};

const editSize = (coffee, sizeId) => {
  const size = coffee.map((el) => el.size);
  const newSizeId = [];
  for (let element of size) {
    const positionSizeId = sizeId.find((el) => el.size == element);
    newSizeId.push(positionSizeId.id);
  }
  for (let i in coffee) {
    delete coffee[i].size;
    coffee[i]["size_id"] = newSizeId[i];
  }
  return coffee;
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
      const prepareInfoCoffee = await productAndSizeService.prepareInfoCoffee(
        coffee,
        sizeIdCoffee,
        product.id
      );
      const productAndSize = await productAndSizeService.addProduct(
        prepareInfoCoffee
      );
    }
    if (category === "tool") {
      const sizeIdTool = await sizeService.searchSizeTool(tool);
      const prepareInfoTool = await productAndSizeService.prepareInfoTool(
        tool,
        sizeIdTool.id,
        product.id
      );
      const productAndSize = await productAndSizeService.addProduct(
        prepareInfoTool
      );
    }
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

module.exports = stockController;
