const mongoose = require('mongoose');

const adminSchema = new Schema({
    adminId: {
        type: Number,
        unique: true,
        required: true
    },
    adminEmail: {
        type: String,
        unique: true
    },
    userId:Number,
    isActive:Number
});

const adminModel = mongoose.model("userTable",adminSchema);

module.exports={adminModel};