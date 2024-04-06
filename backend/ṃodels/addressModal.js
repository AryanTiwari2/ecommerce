const mongoose = require('mongoose');

const addressModal = mongoose.Schema({
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
    userId:Number,
    addressType:{
        type:String,
        enum:['pickUp','delivery'],
        required:true
    },
    isActive:Number
});

const addressModel = mongoose.model('address',addressSchema);

module.exports = {addressModal};