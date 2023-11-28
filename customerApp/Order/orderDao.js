require('../dbconfig/dbfile')

async function saveOrder(order, done) {
  const data = await order.save((err, data) => {
    if (err) return done(err)

    return done(undefined, data)
  })
}

async function deleteOrder(order, orderId, done) {
  const data = await order.findByIdAndDelete(orderId, (err, result) => {
    if (err) return done(err)

    return done(undefined, result)
  })
}

async function getAllOrderByCustomerId(order, customerId, done) {
  const data = await order.find({ customerId })

  return done(undefined, data)
}

async function getOrderById(order, orderId, done) {
  const data = await order.findById(orderId)

  return done(undefined, data)
}

async function updateOrderById(order, orderId, orderData, done) {
  await order.findByIdAndUpdate(orderId, { ...orderData }, (err, data) => {
    if (err) return done(err)

    return done(undefined, data)
  })
}
module.exports = {
  saveOrder,
  deleteOrder,
  getAllOrderByCustomerId,
  getOrderById,
  updateOrderById,
}
