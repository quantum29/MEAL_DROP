const customerService = require('../Customer/customerService')
const authService = require('./authService')
const customer = require('../Customer/customerModel')

function registerCustomer(customerData, done) {
  customerService.getCustomerByEmail(
    customer,
    customerData.email,
    (err, customerFound) => {
      if (err) {
        return done(err)
      } else {
        if (customerFound.length != 0) {
          console.log(customerFound)
          return done('customer found with similar email')
        } else {
          return customerService.saveCustomer(
            new customer({ ...customerData }),
            done
          )
        }
      }
    }
  )
}

function loginCustomer({ email, password }, done) {
  customerService.getCustomerByEmail(customer,email, (err, customerFound) => {
    if (err) {
      return done(err)
    } else {
      if (customerFound.length == 0)
        return done({ error: 'no customer with given email found' })
      const userVerified = authService.verifyCustomer(
        { email, password },
        customerFound[0]
      )

      const _id = customerFound[0]._id

      if (userVerified) {
        const jwtToken = authService.createJWT(customerFound[0])
        return done(undefined, {jwtToken, id: _id })
      } else {
        return done({ error: 'Incorrect Credentials' })
      }
    }
  })
}

module.exports = {
  registerCustomer,
  loginCustomer,
}
