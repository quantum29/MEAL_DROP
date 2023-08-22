const restaurantService = require("./restaurantService")

function saveRestaurant(restaurant, done) {
  restaurantService.saveRestaurant(restaurant, done)
}

function getRestaurantByEmail(restaurant, restaurantEmail, done) {
  restaurantService.getRestaurantByEmail(restaurant, restaurantEmail, done)
}

function getRestaurantById(restaurant, restaurantId, done) {
  restaurantService.getRestaurantById(restaurant, restaurantId, done)
}


function updateRestaurant(restaurant, updatedData, restaurantId, done) {
  restaurantService.getRestaurantById(restaurant, restaurantId, (err, data) => {
    if (err) {
      return done(err)
      // return res.status(400).send('error getting restaurant', err) done(err)
    }
    if (!data) return done('no restaurant with given email id')
    else restaurantService.updateRestaurant(restaurant, updatedData, data.email, done)
  })
}


function deleteRestaurant(restaurant, restaurantId, done) {
  let restaurantData = undefined
  restaurantService.getRestaurantById(restaurant, restaurantId, (err, data) => {
    if (err) {
      return res.status(400).send('error getting Restaurant', err)
    }
    restaurantData = data
  })
  if (!restaurantData) return done('no Restaurant with given email id')
  restaurantService.deleteRestaurant(restaurant, restaurantData.email, done)
}


module.exports = {
  saveRestaurant,
  getRestaurantByEmail,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
}

