
const express = require('express');
const router = express.Router();
const app = express()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

router.post('/createuser',[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 }),
],async (req, res)=>{
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).then(user => res.json(user))
         .catch(err=>{
           /*  res.json({
                error: 'This email already exists' */

                user =  User.findOne({
                    email: req.body.email
                });
                
                if(user){
                    return res.status(400).json("Email Exists");
                }
                
          /*   })  */
        })
    
    //res.send(req.body)



})
module.exports = router