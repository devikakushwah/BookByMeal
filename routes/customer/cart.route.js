const express = require('express');
const auth = require('../../middleware/customer.auth');
const Cart = require('../../model/cart.model');
const {check,validationResult} = require('express-validator');
const cartController = require('../../controller/cart.controller');
const router = express.Router();

router.put('/add-cart',auth,async (request,response) => {

    
    console.log(request.body);
    // const {dishId} = request.body
    // const local = {dishId};
    var cart = await Cart.findOne({
        customer:request.customer.id
    });
     if(!cart)
      cart = new Cart({customer:request.customer.id});
      
      cart.dishItem.unshift(request.body.dishId);
      cart.save()
          .then(result => {
              console.log(result);
              return response.status(200).json(result);
          }).catch(err => {
              console.log(err);
              return response.status(500).json({ err: 'Server error' });
          });

});
router.delete('/delete-dish/:dish_id',auth,async(request,response)=>{
    try{
      const cart = await Cart.findOne({customer:request.customer.id});
      const removeIndex = cart.dishItem.map(item=> item.id
                
        ).indexOf(request.params.dish_id);
      cart.dishItem.splice(removeIndex,1);
      await cart.save();
      return response.status(202).json(cart);
  
    }catch(err){
        console.log(err);
      return response.status(402).json({msg:"Server error"});
  
    }
});
router.post('/removeByPid/:dishId',auth,(request, response) => {
    console.log(request.params);
    
   Cart.updateOne({ customer:request.customer.id},{$pullAll:{
       dishItem:[{ _id:request.params.dishId}]
   }})
          .then(result => {
              
              return response.status(200).json(result);
          }).catch(err => {
              console.log(err);
              return response.status(500).json({ err: err.array });
    });
})
router.get('/view-cart/:id',cartController.viewCart);
router.delete('/delete-cart/:id',cartController.deleteCart);
module.exports = router;