const customerDao = require('./customerDAO')

function saveCustomer(customer, done) {
  customerDao.saveCustomer(customer, done)
}


function getCustomerByEmail(customer, email, done) {
  customerDao.getCustomerByEmail(customer, email, done)
}

function getCustomerById(customer, customerId, done) {
  customerDao.getCustomerById(customer, customerId, done)
}

function updateCustomer(customer, updatedData, email, done) {
  customerDao.updateCustomer(customer, updatedData, email, done)
}


function deleteCustomer(customer, email, done) {
  customerDao.deleteCustomer(customer, email, done)
}


module.exports = {
  saveCustomer,
  getCustomerByEmail,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
}
