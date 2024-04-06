const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderId: {
        type: Number,
        unique: true,
        required: true
    },
    userId:Number,
    sellerId:Number,
    productId:Number,
    addressId:Number,
    orderStatus:Number,
    price:Number,
    quantity:Number,
    paymentType:String,
    paymentStatus:String,
});
const orderModel = mongoose.model('order',orderSchema);

module.exports={orderModel};