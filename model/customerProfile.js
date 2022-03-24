const mongoose = require('mongoose');
const cProfileSchema = new mongoose.Schema({
 customer:{
     type:mongoose.Schema.Types.ObjectId,
     ref : 'customers',
 },
 address:{
     type:String
 },
 profilePic:{
     type:String
 },
 location:{
     type:String
 },
 description:{
     type:String
 }
});
module.exports = mongoose.model('cprofiles',cProfileSchema)