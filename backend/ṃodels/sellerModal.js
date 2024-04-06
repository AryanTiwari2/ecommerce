const mongoose = require('mongoose');

const sellerSchema = mongoose.Schema({
    sellerId: {
        type: Number,
        unique: true,
        required: true
    },
    sellerEmail: {
        type: String,
        unique: true
    },
    userId:Number,
    GST:String,
    addressId:Number,
    bank:String,
    Ifsc:String,
    PanImage:String,
    PanNumber:String,
    isActive:Number,
});
const sellerModel = mongoose.model('seller',sellerSchema);

module.exports={sellerModel};