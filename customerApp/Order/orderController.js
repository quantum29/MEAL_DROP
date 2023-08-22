const orderService = require('./orderService')

function saveOrder(order, done) {
  orderService.saveOrder(order, done)
}

function deleteOrder(order, done) {
  orderService.deleteOrder(order, done)
}

function getAllOrderByCustomerId(order, customerId, done) {
  orderService.getAllOrderByCustomerId(order, customerId, done)
}

function getOrderById(order, orderId, done) {
  orderService.getOrderById(order, orderId, done)
}

function updateOrderById(order, orderId, orderData, done) {
  orderService.updateOrderById(order, orderId, orderData, done)
}

module.exports = {
  saveOrder,
  deleteOrder,
  getAllOrderByCustomerId,
  getOrderById,
  updateOrderById,
}
