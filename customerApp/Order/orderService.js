const orderDao = require('./orderDao')

function saveOrder(order,done){
    orderDao.saveOrder(order,done)
}

function deleteOrder(order, done) {
  orderDao.deleteOrder(order, done)
}

function getAllOrderByCustomerId(order, customerId, done) {
  orderDao.getAllOrderByCustomerId(order, customerId, done)
}

function getOrderById(order,orderId,done){
    orderDao.getOrderById(order,orderId,done);
}

function updateOrderById(order, orderId, orderData, done){
    orderDao.updateOrderById(order, orderId, orderData, done)
}

module.exports = {
  saveOrder,
  deleteOrder,
  getAllOrderByCustomerId,
  getOrderById,
  updateOrderById,
}


