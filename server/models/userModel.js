const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    name: String,
    phone_number: String,
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password:String,
    orders:[{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
})

const User=mongoose.model('User', userSchema)
module.exports=User