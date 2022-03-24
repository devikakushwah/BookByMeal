const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin/admin.route');
const customerRouter = require('./routes/customer/customer.route');
const cProfileRouter = require('./routes/customer/profile.route');
const aProfileRouter = require('./routes/admin/adminProfile.route');
const categoryRouter = require('./routes/admin/category.route');
const dishRouter = require('./routes/admin/dish.route');
const cartRouter = require('./routes/customer/cart.route');
const orderRouter = require('./routes/customer/order.route');
const app = express();
mongoose.connect("mongodb+srv://devikakushwah:Radhakrishna%4029@newcluster.7o13k.mongodb.net/bookBymeal")
app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
 app.use('/order',orderRouter);
 app.use('/cart',cartRouter);
app.use('/dish',dishRouter);
app.use('/category',categoryRouter);
app.use('/admin/profile',aProfileRouter);
app.use('/customer/profile',cProfileRouter);
app.use('/customer',customerRouter);
app.use('/admin',adminRouter);
app.listen(3000,(request,response)=>{
    console.log('server running');
});