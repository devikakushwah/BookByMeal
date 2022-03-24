const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
        customer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'customers'
        },
        dishItem: [
                {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'dishes'

                },
               
                       
                
      
        ]
});
module.exports = mongoose.model('carts', cartSchema);