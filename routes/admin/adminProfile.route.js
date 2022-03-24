const express = require('express');
const AProfile = require('../../model/adminProfile.model');
const auth = require('../../middleware/admin.auth');
const router = express.Router();
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
router.post('/add-profile',auth,upload.single('profilePic'),async (request, response) => {
    console.log(request.body);
    const {name,contact,address ,description} = request.body;
    
    const profileInfo = {};
    profileInfo.admin = request.admin.id;
    if(request.file){
        const profilePic ="http://localhost:3000/images/"+request.file.filename;
        profileInfo.profilePic = profilePic;
    }
    if(address){
      profileInfo.address = address;
    }
    if(contact){
        profileInfo.contact = contact;
    }
    if(description){
        profileInfo.description = description;
    }
    if(name){
      profileInfo.name = name;
    }
      try{
        let profile = await  AProfile.findOne({admin:request.admin.id});
        if(profile)
        {
          profile = await AProfile.findOneAndUpdate({admin:request.admin.id}
            ,{$set:profileInfo},{new:true});
            console.log(profile);
          return response.status(200).json(profile);
        } 
        profile = new AProfile(profileInfo);
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
})

module.exports = router;