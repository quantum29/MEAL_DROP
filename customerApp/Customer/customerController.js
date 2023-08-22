const customerService = require("./customerService")

function saveCustomer(customer, done) {
  customerService.saveCustomer(customer, done)
}

function getCustomerByEmail(customer, customerEmail, done) {
  customerService.getCustomerByEmail(customer, customerEmail, done)
}

function getCustomerById(customer, customerId, done) {
  customerService.getCustomerById(customer, customerId, done)
}


function updateCustomer(customer, updatedData, customerId, done) {
    
    customerService.getCustomerById(customer, customerId, (err, data) => {
      if (err) {
        return res.status(400).send('error getting customer', err)
      }
      if (!data) return done('no customer with given email id')
      else customerService.updateCustomer(customer, updatedData, data.email, done)
    })
    
    
}


function deleteCustomer(customer, customerId, done) {
  let customerData = undefined
  customerService.getCustomerById(customer, customerId,(err,data)=>{
    if (err) {
      return res.status(400).send('error getting customer', err)
    }
    customerData = data
  })
  if (!customerData) return done('no customer with given email id')
  customerService.deleteCustomer(customer, customerData.email, done)
}

module.exports = {
  saveCustomer,
  getCustomerByEmail,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
}
