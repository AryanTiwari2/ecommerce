const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
        required: true
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        required:true,
        validate: validator.default.isEmail,
      },
    password: String,
    image: String,
    userType: {
        type:String,
        enum:['user','admin','seller'],
        default:'user'
    },
    cart: [{
        productId:String,
        quantity:Number
    }],
    isActive:Number
});

const userModal = mongoose.model("userTable",userSchema);

module.exports={userModal};
