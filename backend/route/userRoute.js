const express = require('express');
const { userLogin, signUp, userInfo } = require('./../controller/userControl')
const userRoute = express.Router();

userRoute.post('/login', userLogin);
userRoute.post('/signup', signUp);
userRoute.get('/details', userInfo);

module.exports = { userRoute };