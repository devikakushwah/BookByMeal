const express = require('express');
const Dish = require('../../model/dish.model');
const {check,validationResult} = require('express-validator');
const multer = require('multer');
const auth = require('../../middleware/admin.auth');
const router = express.Router();
var storage = multer.diskStorage(
    {
        destination: 'public/images',
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        }
    }
);
var upload = multer({ storage: storage });

router.post('/add-dish',auth,check('dish_name','dish_name is required').notEmpty(),
 check('dish_image','dish_image is required').not().isEmpty(),
 check('dish_price','dish_price is required').not().isEmpty(),
 check('description','description is required').not().isEmpty()
,upload.single('dish_image'),async (request,response) => {
    // const error = validationResult(request);
    // console.log(error);
    // if(!error.isEmpty())
    //   return response.status(400).json({msg : error.array()})
        console.log("result");
        Dish.create({
            dish_name:request.body.dish_name,
            dish_price:request.body.price,
            dish_image:'http://localhost:3000/images/'+ request.file.filename,
            description :request.body.description,
            stock_status:request.body.stock_status,
            categoryId:request.body.categoryId
        }).then(result=>{
          console.log(result);
          return response.status(200).json(result);
        }).catch(err=>{
            return response.status(500).json({msg:'data failed to save'});
        });
    
    
});
router.get('/view-dish',auth,(request,response)=>{
  Dish.find({}).populate('categories','name').then(result=>{
    console.log(result);
          return response.status(200).json(result);
        }).catch(err=>{
            return response.status(500).json({msg:'data failed to view'});
   });
});
module.exports = router;