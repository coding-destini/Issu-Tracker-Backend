const User = require('../models/user');
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
// A higher saltRounds value results in a more secure hash but requires more computational resources and time to generate
const saltRounds = 10; 


// Sign Up Action 
module.exports.signUp=async(req,res)=>{
    try {
        
        // console.log("req.body",req.body);
        // 1: get the data
        const { name,email, password, confirmPassword } = req.body;
        // 2: check if password and confirm password are same or not
        if (password != confirmPassword) {
            return res.status(400).json({ message: 'Password and confirm password are not same' });
        }
        // 3: check if email is already in use or not
        const Existinguser = await User.findOne({ email});
        if(Existinguser){
            return res.status(400).json({ message: 'Email is already in use' });
        }
        // 4: encrypt the password
        const hashpassword = await bcrypt.hashSync(password,saltRounds);
        // 4:create user
        const user = await User.create({
            name:name,
            email:email,
            password:hashpassword
        })
        // 5: return success message
        return res.status(200).json({
            message:'User Sign Up Successfully',
            data:{
                name,
                email
            }
        })
    } catch (error) {
        //catching error
        return res.status(500).json({
            message:'Server Error , while creating the User',
            data:{
                err
            }
        })
    }
}

// Sign In Action 
module.exports.signIn = async(req,res)=>{
try {
    //1: fetch email and password from req.body
    const { email, password } = req.body;
    //2: fetch user data from db using email
    const user = await User.findOne({email :email});
    //3: check weather user exist or not
    if(!user){
        return res.status(400).json({
            message:'User not found',
            data:{}
        })
    }
    //4: check weather password is correct or not
    const isPasswordMatch = await bcrypt.compareSync(password,user.password); // 1st para is the entered password and 2nd is the password in db
    //4.1: if not match -> name/email is incorrect
    if(isPasswordMatch){
        return res.status(400).json({
            message:'email or Password is incorrect',
            data:{}
        })
    }
    const token = jwt.sign({email:user.email},"secret",{expiresIn:"1h"});
    
    //4.2: if match -> return success message 
    return res.status(200).json({
        message:'User Sign In Successfully',
        data:token
    })
} catch (error) {
    return res.status(500).json({
        message:'Server Error , while sign in the User',
        data:{
            error        }
    }) 
}
}

//user details
module.exports.getUserDetails = async(req,res)=>{
    try {
        //destructure user from req.user
        const {_id:userId} = req.user;
        const user = await User.find(userId).populate({
            path:"projects",
            select:"name"
        })
        if(!user){
            return res.status(400).json({
                message:'User not found',
            })
        }
        return res.status(200).json({
            message:'User Details',
            data:user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:'Error in getting user details',
        })   
    }
}

