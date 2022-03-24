const Order = require('../model/order.model');
const Cart = require('../model/cart.model');
exports.placeOrder = (request,response)=>{
    const{
       email,
       address,
       mobile
    } = request.body;
       console.log(request.body);
      Cart.findOne({_id: request.params.cid}).populate('dishItem').populate('dish').then(result=>{
         console.log(result);
         
         var sum=0;
         for (i = 0; i < result.dishItem.length; i++) {
            const dishPrice = result.dishItem[i].dish.dish_price;
            console.log("dish"+dishPrice);
            const qty = result.dishItem[i].qty;
            console.log("item"+qty);
             sum = sum + dishPrice * qty;
           }
           console.log("sum"+sum);
           const order = new Order({
            customerId: request.customer.id, email: request.body.email, address: request.body.address,
            mobile: request.body.mobile,total:sum
        });
        for (i = 0; i < result.dishItem.length; i++) {

         const dId = result.dishItem[i]._id;
         const dishName = result.dishItem[i].product_name;
         const dishPrice = result.dishItem[i].price;
        
         order.orderList.push({ dishId: dId, dish_name: dishName, dish_price: dishPrice});
     }

     order.save()
         .then(result => {

             return response.status(200).json(result);
         }).catch(err => {
             console.log(err);
             return response.status(500).json({ err: err.array });
         });

      }).catch(err=>{
         console.log(err);
         return response.status(500).json({ err: err.array });
      })
};


