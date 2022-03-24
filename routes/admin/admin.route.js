const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Admin = require('../../model/admin.model');
const AdminProfile = require('../../model/adminProfile.model');
const router = express.Router();
    router.post('/signup', 
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'please enter a password with 6 or more characters').isLength({ min: 6 }),
    async (request, response) => {
        const error = validationResult(request);
        if (!error.isEmpty())
            return response.status(400).json({ msg: "isEmpty" });
            console.log(request.body);
        const { email, password } = request.body;
        try {
            let admin = await Admin.findOne({ email });
            if (admin) {
                return response.status(400).json({ msg: "already exists" })
            }
            admin = new Admin({ email, password });
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(password, salt);
            admin.save().then(result => {
                console.log(result);
                return response.status(200).json({msg:'saved'});
            }).catch(err => {
                console.log(err);
                return response.status(500).json({ msg: 'not saved' });

            });
        } catch (err) {
            console.log(err);
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
          console.log(req.body);
          const { email, password } = req.body;
             
          try {
            let admin = await Admin.findOne({ email });
           console.log(admin);
            if (!admin) {
              return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
      
            const isMatch = await bcrypt.compare(password, admin.password);
      
            if (!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
            
            const payload = {
                admin: {
                  id: admin.id
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
      

module.exports = router;