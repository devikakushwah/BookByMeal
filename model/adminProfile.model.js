const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
 admin:{
     type:mongoose.Schema.Types.ObjectId
 },
  name:{
      type:String
  },
  profilePic:{
      type:String
  },
  contact:{
      type:String
  },
  address:{
      type:String
  },
  description:{
      type:String
  }
});
module.exports = mongoose.model('adminProfiles',profileSchema);