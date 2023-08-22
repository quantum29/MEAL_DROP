require('../dbconfig/dbfile')



async function saveRestaurant(restaurant, done) {
  const data = await restaurant.save()

  done(undefined, data)
}

async function getAllRestaurants(restaurant, done) {
  const data = await restaurant.find()
  return done(undefined, data)
}

async function getRestaurantByEmail(restaurant, email, done) {
  const data = await restaurant.find({ email })
  return done(undefined, data)
}

async function getRestaurantById(restaurant, restaurantId, done) {
  const data = await restaurant.findById(restaurantId)
  return done(undefined, data)
}

async function updateRestaurant(restaurant, updatedData, email, done) {
  const data = await restaurant.updateOne(
    { email },
    { $set: { ...updatedData } }
  )

  console.log(data)
  if (data.modifiedCount === 1) {
    return done(undefined, 'successfully updated')
  } else return done('could not find the collection')
}


async function deleteRestaurant(restaurant, email, done) {
  const data = await restaurant.remove({ email })

  if (data.nRemoved === 1)
    return done(undefined, 'Succesfully deleted restaurant')
  else return done('could not find the restaurant')
}

module.exports = {
  saveRestaurant,
  getAllRestaurants,
  getRestaurantByEmail,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
}
