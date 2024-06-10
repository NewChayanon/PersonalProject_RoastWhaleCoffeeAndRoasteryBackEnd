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

module.exports = productController