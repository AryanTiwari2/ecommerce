const express  =require('express');
const {userRoute} = require('./route/userRoute');
const app = express();


const PORT = 8080;

app.use('/user',userRoute);

app.listen(PORT,()=>{
    console.log("server at PORT : ",PORT);
});