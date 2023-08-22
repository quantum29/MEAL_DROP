const restaurantDao = require('./restaurantDAO')



function saveRestaurant(restaurant, done) {
  restaurantDao.saveRestaurant(restaurant, done)
}

function getAllRestaurants(restaurant, done) {
  restaurantDao.getAllRestaurants(restaurant, done)

  done(undefined, data)
}


function getRestaurantByEmail(restaurant, email, done) {
  restaurantDao.getRestaurantByEmail(restaurant, email, done)
}

function getRestaurantById(restaurant, restaurantId, done) {
  restaurantDao.getRestaurantById(restaurant, restaurantId, done)
}

function updateRestaurant(restaurant, updatedData, email, done) {
  restaurantDao.updateRestaurant(restaurant, updatedData, email, done)
}


function deleteRestaurant(restaurant, email, done) {
  restaurantDao.deleteRestaurant(restaurant, email, done)
}

module.exports = {
  saveRestaurant,
  getAllRestaurants,
  getRestaurantByEmail,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
}
