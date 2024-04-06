const express  =require('express');
const {userRoute} = require('./route/userRoute');
const mongoose=require("mongoose");
const {config} = require("./config/config")
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.MONGO_CONNECTION)
.then(()=>{
    console.log('mongoDB connected')
})
.catch(()=>{
    console.log("not connected with mongo")
})

const PORT = 8080;

app.use('/user',userRoute);

app.listen(PORT,()=>{
    console.log("server at PORT : ",PORT);
});