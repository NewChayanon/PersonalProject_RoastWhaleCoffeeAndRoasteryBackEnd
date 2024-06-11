const productService = require("../services/product-service")

const productController = {}

productController.getCoffee = async (req,res,next) => {
    try {
        const coffee = await productService.getCoffee()
        console.log(coffee)
        // const searchCoffeeId = await productService.searchCoffeeId(coffee.name)
        res.json({coffee})
    } catch (error) {
        next(error)
    }
}

productController.fetchNewProduct = async (req,res,next) =>{
    try {
        const fetch = await productService.fetchNewProduct()
        console.log(fetch)
        res.status(200).json({fetch})
    } catch (error) {
        next(error)
    }
}

productController.fetchPopularProduct = async (req,res,next) =>{
    try {
        const fetch = await productService.fetchPopularProduct()
        console.log(fetch)
        res.status(200).json(fetch)
    } catch (error) {
        console.log(error)
    }
}

productController.fetchInfoProduct = async (req,res,next) => {
    try {
        const productId = +req.params.productId
        const infoProductId = await productService.fetchInfoProduct(productId)
        console.log(infoProductId)
        res.status(200).json(infoProductId)
    } catch (error) {
        next(error)
    }
}

module.exports = productController