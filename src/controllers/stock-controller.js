const productService = require("../services/product-service")

const stockController = {}

stockController.addProduct = async (req,res,next) =>{
    try {
        const data = req.input
        const product = await productService.addProduct(data)
        const product_type = await productService.addProductType(data.product_type,product.id)
        const image = await productService.addImage(data.image,product.id)
        res.status(201).json({msg:"create product success"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

stockController.deleteProduct = async (req,res,next) =>{
    try {
        const productId = +req.params.productId
        const isDelete = await productService.deleteProduct(productId)
        console.log(isDelete)
        res.json({msg:"delete successfully"})
    } catch (error) {
        next(error)
    }
}



module.exports = stockController