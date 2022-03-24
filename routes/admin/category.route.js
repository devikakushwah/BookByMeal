const express= require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const config = require('config');
const request = require('request');
const bcrypt = require('bcryptjs');
const Category = require('../../model/category.model');

const auth = require('../../middleware/admin.auth');
const { check, validationResult } = require('express-validator');
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
router.post('/add-category',auth,
check('name','name is required').notEmpty(),
upload.single('image'),async (request,response)=>{
const error = validationResult(request);
//  if(!error.isEmpty()){
//     console.log(error);
//     return response.status(400).json({msg:"validation error"});
// }
try{
    console.log(request.body);
    console.log(request.file);
    
 const result=     await Category.create({name:request.body.name,
      image:'http://localhost:3000/images/'+ request.file.filename})
      console.log(result);
//  }).then(result=>{
//    console.log(result);
//    return response.status(200).json(result);
//  }).catch(err=>{
//     return response.status(400).json({msg:" not saved"});
//  })
return response.status(200).json(result);
}
catch(err){
    console.log(err);
    return response.status(500).json({msg:"server error"});
}
});

router.post('/update/:id',auth,upload.single('image'),(request,response)=>{
    Category.updateOne({_id:request.params.id},{$set:{
        name:request.body.name,
        image:'http://localhost:3000/images/'+ request.file.filename

    }}).then(result=>{
         console.log(result);
         if(result.modifiedCount){
             return response.status(200).json({msg:'successfully updated'});
         }
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({msg:'failed to  updated'});
    });
});
router.delete('/delete/:id',auth,(request,response)=>{
  Category.deleteOne({_id:request.params.id}).then(result=>{
    console.log(result);
    return response.status(200).json({msg:'successfully deleted'});
  }).catch(err=>{
    console.log(err);
    return response.status(500).json({msg:'failed to  updated'});
  })
});
module.exports = router;
