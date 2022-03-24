const express = require('express');
const Order = require('../../model/order.model');
const Cart = require('../../model/cart.model');
const Dish = require('../../model/dish.model');
const orderController = require('../../controller/order.controller');
const auth = require('../../middleware/customer.auth')
const router = express.Router();
router.get('/order-view',auth,(request,response) => {
   
    Order.findOne({customer:request.customer.id}).populate("orderList.dish").then(result => {
                console.log(result);

                return response.status(200).json(result);
            }).catch(err=>{
                console.log(err);
                return response.status(500).json({err:err.array});
            });
})
router.post('/add-order',auth,async (request, response) => {
       const{address,mobile,total,dishId,qty}=request.body;
       const customerId = request.customer.id; 
      const orderItem = {address,mobile,total,customerId};
        console.log(request.body);
        console.log(orderItem);
        var order = await Order.findOne({
            customer:request.customer.id
        });
         if(!order)
         order = new Order(orderItem);
        for(i=0;i<request.body.orderList.length;i++){
            var dish2  =  request.body.orderList[i].dishId;
            var qty2 = request.body.orderList[i].qty;
            order.orderList.push({dish:dish2,quantity:qty2});
        }
         console.log(request.body.orderList[0].dishId);
      
          order.save()
              .then(result => {
                  console.log(result);
                  return response.status(200).json(result);
              }).catch(err => {
                  console.log(err);
                  return response.status(500).json({ err: 'Server error' });
              });
});

module.exports = router;