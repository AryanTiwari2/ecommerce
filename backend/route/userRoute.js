const express = require('express');
const {userLogin} = require('./../controller/userControl')
const userRoute = express.Router();

userRoute.post('/login',userLogin);

module.exports = {userRoute};