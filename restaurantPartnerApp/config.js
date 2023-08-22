const config = {
  PORT: process.env.PORT || '4000',
  AUTH_SECRET: process.env.AUTH_SECRET || 'secret',
  rabbitMQ: {
    url: 'amqp://localhost:5672',
    exchangeName: 'mealDropExchange',
    kitchenRoutingKey: 'KITCHEN',
    pickUpRoutingKey: 'PICKUP',
    statusRoutingKey: 'STATUS'
  },
}

module.exports = config