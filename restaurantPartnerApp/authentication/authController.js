const restaurantService = require('../restaurant/restaurantService')
const authService = require('./authService')
const restaurant = require('../restaurant/restaurantModel')

function registerRestaurant(restaurantData, done) {
  restaurantService.getRestaurantByEmail(
    restaurant,
    restaurantData.email,
    (err, restaurantFound) => {
      if (err) {
        return done(err)
      } else {
        if (restaurantFound.length != 0) {
          console.log(restaurantFound)
          return done('restaurant found with similar email')
        } else {
          return restaurantService.saveRestaurant(
            new restaurant({ ...restaurantData }),
            done
          )
        }
      }
    }
  )
}

function loginRestaurant({ email, password }, done) {
  restaurantService.getRestaurantByEmail(restaurant, email, (err, restaurantFound) => {
    if (err) {
      return done(err)
    } else {
      if (restaurantFound.length == 0)
        return done({ error: 'no restaurant with given email found' })
      const userVerified = authService.verifyRestaurant(
        { email, password },
        restaurantFound[0]
      )

      const _id = restaurantFound[0]._id

      if (userVerified) {
        const jwtToken = authService.createJWT(restaurantFound[0])
        return done(undefined, { jwtToken, id: _id })
      } else {
        return done({ error: 'Incorrect Credentials' })
      }
    }
  })
}

module.exports = {
  registerRestaurant,
  loginRestaurant,
}
