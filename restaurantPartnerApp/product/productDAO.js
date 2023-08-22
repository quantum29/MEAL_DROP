require('../dbconfig/dbfile')

async function saveProduct(product, done) {
  const data = await product.save()

  done(undefined, data)
}

async function getAllProducts(product, done) {
  // const data = await product.find()
  // return done(undefined, data)

  await product.find((err,result) =>{
    if(err) return done(err);

    return done(undefined,result)
  })
}

async function getProductByRestaurant(product, restaurantId, done) {
  // const data = await product.find({ restaurantId })
  // return done(undefined, data)

  await product.find({ restaurantId },(err,result) =>{
    if(err) return done(err);

    return done(undefined,result)
  })
}

async function getProductById(product, productId, done) {
  
  // const data = await product.findById(productId)
  // return done(undefined, data)
  await product.findById(productId, (err, result) => {
    if (err) return done(err)
    return done(undefined, result)
  })
}

async function updateProduct(product, updatedData, productId, done) {
  
  await product.findByIdAndUpdate(productId, { ...updatedData } , (err,result)=>{
    if (err) return  done(err)
    
    return done(undefined,result)
  })

  // const data = await product.updateOne(
  //   { _id:productId },
  //   { $set: { ...updatedData } }
  // )

  // console.log(data)
  // if (data.modifiedCount === 1) {
  //   return done(undefined, 'successfully updated')
  // } else return done('could not find the collection')
}


async function deleteProduct(product, productId, done) {
  // const data = await product.remove({ email })

  // if (data.nRemoved === 1)
  //   return done(undefined, 'Succesfully deleted product')
  // else return done('could not find the product')

  await product.findByIdAndDelete(productId, (err, result) => {
    if (err) return done(err)

    return done(undefined, result)
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
