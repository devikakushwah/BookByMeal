const express = require('express');
const Customer = require('../../model/customer.model');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const customerController = require('../../controller/customer.controller');
require('dotenv').config();
const router = express.Router();

router.post('/signup', check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email address').isEmail(),
  check('password', 'please enter a password with 6 or more characters').isLength({ min: 6 }),
  check('mobile', 'mobile enter 10 number').isLength({ min: 10 }).isNumeric(),
  async (request, response) => {
    const error = validationResult(request);
    if (!error.isEmpty())
      return response.status(400).json({ msg: "isEmpty" })
    const { name, email, password, mobile } = request.body;
    try {
      let customer = await Customer.findOne({ email });
      if (customer) {
        return response.status(400).json({ msg: "already exists" })
      }
      customer = new Customer({ name, email, mobile, password });
      const salt = await bcrypt.genSalt(10);
      customer.password = await bcrypt.hash(password, salt);
      customer.save().then(result => {
        console.log(result);
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
          }
        });

        var mailOptions = {
          from: '"PetPuja 😋"<devikakushwah29@gmail.com>',
          to: result.email,
          subject: 'Registration successful',
          text: 'Registration',
          html: '<b>Welcome !' + result.name + ' to become member of <h3>BOOKMYMEAL</h3></b>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            return response.status(200).json({ msg: 'Welcome' + '' + result.name });

          }
        });

      }).catch(err => {
        return response.status(500).json({ msg: 'not sacved' });

      });
    } catch (err) {
      return response.status(500).json({ msg: 'error find' });
    }
  })
router.post(
  '/login',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: "validation error" });
    }

    const { email, password } = req.body;

    try {
      let customer = await Customer.findOne({ email });

      if (!customer) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        customer: {
          id: customer.id
        }
      };
      console.log(payload);
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.post('/forget-password',customerController.forgetPassword);
module.exports = router;