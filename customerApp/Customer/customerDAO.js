require('../dbconfig/dbfile')

async function saveCustomer(customer, done) {
  const data = await customer.save()

  done(undefined, data)
}

async function getCustomerByEmail(customer, email, done) {
  const data = await customer.find({email})
  return done(undefined, data)
}

async function getCustomerById(customer, customerId, done) {
    const data = await customer.findById(customerId)
    return done(undefined, data)
}

async function updateCustomer(customer,updatedData,email, done) {
  const data = await customer.updateOne({email}, {$set : { ...updatedData}} )

  console.log(data);
  if(data.modifiedCount === 1){
    return done(undefined,"successfully updated")
  }else
  return done("could not find the collection");
}


async function deleteCustomer(customer,email,done){
  const data = await customer.remove({ email })

  if(data.nRemoved === 1) return done(undefined,"Succesfully deleted customer")
  else return done("could not find the customer")
}

module.exports = {
  saveCustomer,
  getCustomerByEmail,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
}
