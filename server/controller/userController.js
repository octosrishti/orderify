const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken = (user)=>{
    return jwt.sign({user}, process.env.JWT_SECRET, {
        expiresIn:"1d"
    })
}

const loginUser = async (req,res,next)=>{
    try {
        
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(user && await bcrypt.compare(password,user.password)){
            res.status(200).json({user:user,token:generateToken(user)});
        }else res.status(400).json({message:'Invalid Credentials'})

    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }

}


const signupUser = async (req,res,next)=>{
    try {

        const {email, name, password, phone_number} = req.body;
        console.log("uiser ",req.body)
        const user = await User.findOne({email:email});

        if(user)res.status(401).json({message: 'User already exists'})
        else{
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
    
    
            const newUser = await User.create({email:email, name:name, password:hash, phone_number:phone_number});

            const usr = await User.findOne({_id:newUser._id}).select("-password").populate("orders")
    
            res.status(200).json({user:usr,token:generateToken(newUser)})
        }

        
    } catch (error) {
        console.log(error)
        res.status(404).json({message:"Cannot sign up"})
    }

}

module.exports = {loginUser,signupUser}