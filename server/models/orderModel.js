const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    description:String,
    sub_total:String,
    phone_number:String,
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

const Order=mongoose.model('Order', userSchema)
module.exports=Order