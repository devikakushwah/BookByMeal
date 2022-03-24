const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  categoryId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'categories'
  },
  dish_name:{
      type:String,
      required:true
  },
  dish_image:{
      type:String,
      required:true
  },
  dish_price:{
      type:Number
  },
  stock_status:{
      type:String,
      
  },
  description:{
      type:String
  }
});
module.exports = mongoose.model('dishes',dishSchema);