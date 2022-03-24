const Cart = require('../model/cart.model');

exports.viewCart = (request, response) => {
    Cart.findOne({_id: request.params.id}).populate("dishItem").then(result => {
        console.log(result);
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({err:err.array});
    });
   
}
exports.deleteCart = (request, response) => {
    Cart.deleteOne({_id: request.params.id}).then(result => {
        console.log(result);
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({err:err.array});
    });
}
