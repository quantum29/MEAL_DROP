const amqp = require('amqplib')
const config = require('../config')
const kitchenService = require('./kitchenServce')
const kitchen = require('./kitchenModel')
const productService = require('../product/productService')
const product = require('../product/productModel')



async function consumeMessages() {

    
  const connection = await amqp.connect(config.rabbitMQ.url)
  const channel = await connection.createChannel()

  async function publishMessage(routingKey, message) {
      const exchangeName = config.rabbitMQ.exchangeName
      await channel.assertExchange(exchangeName, 'direct')

      const logDetails = {
        logType: routingKey,
        message: message,
        dateTime: new Date(),
      }
      await channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(JSON.stringify(logDetails))
      )

      console.log(
        `The new ${routingKey} log is sent to exchange ${exchangeName}`
      )
  }

  await channel.assertExchange(config.rabbitMQ.exchangeName, 'direct')
  const q = await channel.assertQueue('kitchenQueue')
  await channel.bindQueue(q.queue, config.rabbitMQ.exchangeName,config.rabbitMQ.kitchenRoutingKey)

  channel.consume(q.queue, (msg) => {
    const data = JSON.parse(msg.content)
    console.log(data)

    const { orderId, productId, customerId, cost, address } = data.message

    productService.getProductById(product,productId,async (err,result)=>{
        if(err){
            const message = {orderId,status:"Cancelled"}
            producer.publishMessage('STATUS',message)
            return console.log("error retrieving product details")
        }

        restaurantId = result.restaurantId

        const newKitchen = new kitchen({
          orderId,
          productId,
          customerId,
          cost,
          address,
          restaurantId,
          status:"posted"
        })

    


        kitchenService.saveKitchen(newKitchen, (err1, result) => {
          if (err1) {
            const message = { orderId, status: 'NOT PLACED' }
            publishMessage('STATUS', message)
            return console.log({error: `error saving in kitchen `,err})
          }

          const message = { orderId, status: 'Recieved' }
          publishMessage('STATUS', message)

          console.log(result)
        })
    })
//*************************************** */
//****** WORK ON NOTIFYING THE USER IN CASE OF FAILURE ***//
    channel.ack(msg)
    console.log('message acknowledged from the kitchen queue')
  })
}

consumeMessages()
