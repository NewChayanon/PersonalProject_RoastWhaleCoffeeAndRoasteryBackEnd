const productService = require("../services/product-service")

const productController = {}

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

module.exports = productController