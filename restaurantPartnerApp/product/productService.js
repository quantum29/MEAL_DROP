const productDao = require('./productDAO')

function saveProduct(product, done) {
  productDao.saveProduct(product, done)
}

function getAllProducts(product, done) {
  productDao.getAllProducts(product, done)
}

function getProductByRestaurant(product, productId, done) {
  productDao.getProductByRestaurant(product, productId, done)
}

function getProductById(product, productId, done) {
  productDao.getProductById(product, productId, done)
}

function updateProduct(product, updatedData, productId, done) {
  productDao.updateProduct(product, updatedData, productId, done)
}


function deleteProduct(product, productId, done) {
  productDao.deleteProduct(product, productId, done)
}

module.exports = {
  saveProduct,
  getAllProducts,
  getProductByRestaurant,
  getProductById,
  updateProduct,
  deleteProduct,
}