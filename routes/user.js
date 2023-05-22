const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport')

router.post('/sign-up',userController.signUp);
router.post('/sign-in',userController.signIn);
//get user details
router.get('/getUserDetails',passport.authenticate('jwt',{session:false}),userController.getUserDetails)
module.exports=router;