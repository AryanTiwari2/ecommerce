const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
        shippingInfo: {
          address: {
            type: String,
            required: true,
          },
          city: {
            type: String,
            required: true,
          },
          state: {
            type: String,
            required: true,
          },
          country: {
            type: String,
            required: true,
          },
          pinCode: {
            type: Number,
            required: true,
          },
        },
    
        userId: {
          type: Number,
          required: true,
        },
        sellerId: {
            type: Number,
            required: true,
        },
        orderId: {
            type: String,
            required: true,
        },
        quantity:{
            type:number,
            required:true,
            default:1
        },
        subtotal: {
          type: Number,
          required: true,
        },
        tax: {
          type: Number,
          required: true,
        },
        shippingCharges: {
          type: Number,
          required: true,
          default:0
        },
        discount: {
          type: Number,
          required: true,
          default:0
        },
        total: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ["Processing", "Shipped", "Delivered"],
          default: "Processing",
        },
});
const orderModel = mongoose.model('order',orderSchema);

module.exports={orderModel};

