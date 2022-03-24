const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
 
  customerId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'customers'
  },
  address:{
      type:String
  },
  mobile:{
      type:String
  },
  total:{
    type:Number
  },
  orderList:[{
       dish:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"dishes"
      },
       
      quantity:{
          type:Number
      }

  }],
  date:{
      type:Date,
      default:Date.now
  }
});
module.exports = mongoose.model('orders',orderSchema);