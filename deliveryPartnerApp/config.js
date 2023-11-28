const config = {
    PORT: process.env.PORT || "5000",
    AUTH_SECRET: process.env.AUTH_SECRET||"secret",
  rabbitMQ: {
    url: "amqp://localhost:5672",
    exchangeName: "mealDropExchange",
    kitchenRoutingKey: "KITCHEN",
  },
}


module.exports = config