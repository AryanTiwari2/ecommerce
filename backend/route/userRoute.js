const express = require('express');
const {userLogin, signUp} = require('./../controller/userControl')
const userRoute = express.Router();

userRoute.post('/login',userLogin);
userRoute.post('/signup',signUp);

module.exports = {userRoute};