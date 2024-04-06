const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
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
        validate: validator.default.isEmail,  //nothing but validating email
      },
    password: String,
    image: String,
    userType: {
        tpye:String,
        enum:['user','admin','seller'],
        default:'user'
    },
    cart: [{
        productId:String,
        quantity:Number
    }],
    isActive:Number
});

const userModel = mongoose.model("userTable",userSchema);

module.exports={userModel};
