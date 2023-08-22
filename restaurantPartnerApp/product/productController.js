const productService = require("./productService")

function saveProduct(product, done) {
  productService.saveProduct(product, done)
}

function getAllProducts(product, done) {
  productService.getAllProducts(product, done)
}

function getProductByRestaurant(product, productId, done) {
  productService.getProductByRestaurant(product, productId, done)
}

function getProductById(product, productId, done) {
  productService.getProductById(product, productId, done)
}


function updateProduct(product, updatedData, productId, done) {
  productService.getProductById(product, productId, (err, data) => {
    if (err) {
      return res.status(400).send('error getting product', err)
    }
    if (!data) return done('no product exists with given id')

    else productService.updateproduct(product, updatedData, productId, done)
  })
}


function deleteProduct(product, productId, done) {
  productService.getProductById(product, productId, (err, data) => {
    if (err) {
      return res.status(400).send('error getting product', err)
    }
     if (!data) return done('no product exists with given id')
       productService.deleteproduct(product, productData.email, done)
  })
}


module.exports = {
  saveProduct,
  getAllProducts,
  getProductByRestaurant,
  getProductById,
  updateProduct,
  deleteProduct,
}