const Order = require('../models/orderModel');

const addOrder = async (req, res) => {
    try {
        console.log(req.body)
        const newOrder = await Order.create({
            user_id: req.body.user_id,
            sub_total: req.body.sub_total,
            phone_number: req.body.phone_number,
            description:req.body.description
        })

        res.status(200).json(newOrder)

    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Cannot place Order"})
    }

}

const getSingleOrder = async (req,res)=>{
    try {

        const order = await Order.findById(req.params.id)
        res.status(200).json(order)
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Cannot get Order"})
    }
}

const getOrders = async (req,res)=>{
    try {
        const orders = await Order.find({user_id:req.id})

        res.status(200).json(orders)
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Cannot get Orders"})
    }

}

module.exports = {getOrders, getSingleOrder, addOrder}