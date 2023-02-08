const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT')

const {getOrders, getSingleOrder, addOrder} = require('../controller/orderController');

router.use(verifyJWT)

router.get('/order/:id', getSingleOrder);
router.get('/orders', getOrders);
router.post('/order', addOrder)

module.exports = router;