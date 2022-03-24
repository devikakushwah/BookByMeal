const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
   
   name:{
       type:String
   },
   email:String,
   password:String,
   mobile:String,
   status:{
      type:String,
      default:true
   },
   date:{
       type:Date
       ,default:Date.now
   }
});
module.exports = mongoose.model('customers', customerSchema);