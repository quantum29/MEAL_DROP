const orderController = require('./orderController')
const order = require('./orderModel')

const express = require('express')
const axios = require('axios')
const router = express.Router()
const Producer = require('./producer')

const producer = new Producer()
// const amqp = require('amqplib')
const config = require('../config')

router.get('/:id',async (req,res)=>{
    try{
        const orderId = req.params.id;

         orderController.getOrderById(order,orderId,async (err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send({error:"error getting customer orders", err});
            }

            const {productId ,customerId,cost,address} = result;

            const product = await axios.get(`http://localhost:4000/mealDrop/product/${productId}`);

            if(product.err){
                console.log(err)
                return res.status(500).send({ error: 'error while getting your ordered product', err })
            }

            return res.status(200).send({...product,cost,address})

        })
    }catch(err){
        console.log(err);
        return res.status(500).send({error:"unexpected error try again later", err});
    }
})


router.get('/custId/:id',async (req,res)=>{
    try{
        const customerId = req.params.id;

        orderController.getAllOrderByCustomerId(order,customerId,(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send({error:"error getting customer orders", err});
            }

            return res.status(200).send(result);
        })
    }catch(err){
        console.log(err);
        return res.status(500).send({error:"unexpected error try again later", err});
    }
})

router.post('/create',async (req,res)=>{
   try{ 
        const {productId, customerId, cost, address} = req.body;

        if(!(productId && customerId && cost && address)){
            res.status(400).send({ error: "details missing for placing order"  })
        }

        const newOrder = new order({productId, customerId, cost, address ,status :"order sent to kitchen"})

        orderController.saveOrder(newOrder,async  (err, result) => {
          if (err) {
            console.log(err)
            return res
              .status(400)
              .send({ error: 'error getting customer orders', err })
          }
          const {_id } = result  
          const message = { orderId : _id ,productId, customerId, cost, address} 
          await producer.publishMessage(config.rabbitMQ.kitchenRoutingKey , message)

          return res.status(200).send({msg:"new order has been created",result})
        })


    }catch(err){
        console.log(err);
        return res.status(500).send({error:"unexpected error try again later!!"})
    }
})


module.exports = router


//consumer need not to be protected route 

// //step 1 : Connect to the rabbitmq server
// //step 2 : Create a new channel
// //step 3 : Create the exchange
// //step 4 : Create the queue
// //step 5 : Bind the queue to the exchange
// //step 6 : Consume messages from the queue

// async function consumeMessages() {
//   const connection = await amqp.connect(config.rabbitMQ.url)
//   const channel = await connection.createChannel()

//   await channel.assertExchange(config.rabbitMQ.exchangeName, 'direct')

//   const q = await channel.assertQueue('statusQueue')

//   await channel.bindQueue(q.queue, config.rabbitMQ.exchangeName, 'STATUS')

//   channel.consume(q.queue, (msg) => {
//     const data = JSON.parse(msg.content)
//     console.log(data)

//     const {orderId , status} = data
    
//     orderController.updateOrderById(order,orderId,{status},(err,result)=>{
//         if(err){
//             console.log({error: `error updating order status for id ${orderId}` ,err})
//         }

//         console.log(result)
//     })
//     channel.ack(msg)
//     console.log("message acknowledged from the queue")
//   })
// }

// consumeMessages()






