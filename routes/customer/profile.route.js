const express = require('express');
const Customer = require('../../model/customer.model');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/customer.auth');
const config = require('config');
const request = require('request');
const bcrypt = require('bcryptjs');
const Profile = require('../../model/customerProfile');
const { check, validationResult } = require('express-validator');
const profileController = require('../../controller/profile.controller');
const multer = require('multer');
var storage = multer.diskStorage(
    {
        destination: 'public/images',
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        }
    }
);
var upload = multer({ storage: storage });

const router = express.Router();

router.post('/add-profile',auth,upload.single('profilePic'),async (request, response) => {
    console.log(request.body);
    const {address ,description,location} = request.body;
    
    const profileInfo = {};
    profileInfo.customer = request.customer.id;
    if(request.file){
        const profilePic ="http://localhost:3000/images/"+request.file.filename;
        profileInfo.profilePic = profilePic;
    }
    if(address){
      profileInfo.address = address;
    }
    if(location){
        profileInfo.location = location;
    }
    if(description){
        profileInfo.description = description;
    }
      try{
        let profile = await  Profile.findOne({customer:request.customer.id});
        if(profile)
        {
          profile = await Profile.findOneAndUpdate({customer:request.customer.id}
            ,{$set:profileInfo},{new:true});
            console.log(profile);
          return response.status(200).json(profile);
        } 
        profile = new Profile(profileInfo);
        profile.save().then(result=>{
            console.log(result);
            return response.status(200).json(profile);

        }).catch(err=>{
          console.log("save"+err);
        })
     }catch(error){
         console.log(error);
      return response.status(500).json({error:error.array});
    }
});
router.get('/view-profile/:id',profileController.viewProfile);
router.delete('/delete-profile/:id',profileController.deleteProfile);

module.exports = router;