const User = require('../models/user');
const { notify } = require('../routes');

module.exports.signUp=async(req,res)=>{
    try {
        
        console.log("req.body",req.body);
        // 1: get the data
        const { name,email, password, confirmPassword } = req.body;
        // 2: check if password and confirm password are same or not
        if (password != confirmPassword) {
            return res.status(400).json({ message: 'Password and confirm password are not same' });
        }
        // 3: check if email is already in use or not
        const Existinguser = await User.findOne({ email : email });
        if(Existinguser){
            return res.status(400).json({ message: 'Email is already in use' });
        }
        // 4:create user
        const user = await User.create({
            name:name,
            email:email,
            password:password
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
