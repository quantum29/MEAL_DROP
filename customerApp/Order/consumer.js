const amqp = require('amqplib')
const config = require('../config')
const orderController = require('./orderController')
const order = require('./orderModel')

async function consumeMessages() {
  const connection = await amqp.connect(config.rabbitMQ.url)
  const channel = await connection.createChannel()

  await channel.assertExchange(config.rabbitMQ.exchangeName, 'direct')

  const q = await channel.assertQueue('statusQueue')

  await channel.bindQueue(q.queue, config.rabbitMQ.exchangeName, 'STATUS')

  channel.consume(q.queue, (msg) => {
    const data = JSON.parse(msg.content)
    console.log(data)

    const { orderId, status } = data.message

    orderController.updateOrderById(
      order,
      orderId,
      { status },
      (err, result) => {
        if (err) {
          console.log({
            error: `error updating order status for id ${orderId}`,
            err,
          })
        }

        console.log(result)
      }
    )
    channel.ack(msg)
    console.log('message acknowledged from the queue')
  })
}

consumeMessages()
