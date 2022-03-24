const nodemailer = require('nodemailer');
require('dotenv').config();
const Customer = require('../model/customer.model');
exports.forgetPassword = (request, response) => {
    Customer.findOne({email:request.body.email}).then(result => {
          console.log(result);
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
          });
          function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
        var rString = randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
          var mailOptions = {
            from: '"PetPuja 😋"<devikakushwah29@gmail.com>',
            to: result.email,
            subject: 'Forget Password',
            text: 'login password forget',
            html: '<b>!' + result.name + ' Your OPT is '+ rString+'  for verification <a href="htt//">Click here</a><h3>BOOKMYMEAL</h3></b>'
          };
    
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            //  return response.status(200).json({ msg: 'Welcome' + '' + result.name });
            function myFunc(arg) {
                return response.status(200).json({msg:"your otp has expired"});
                console.log(`arg was => ${arg}`);
              }
              
              setTimeout(myFunc, 15000, 'funky');
            }
         });
         
    }).catch(err => {
         console.log(err);
         return response.status(200).json({ msg:"Server error"});
    });
    
}