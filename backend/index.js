const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {config} = require("./config/config");


const app = express();
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:true}))
app.use(cors());

const PORT =  8000;




// console.log(config.MONGO_CONNECTION);
mongoose.connect(config.MONGO_CONNECTION)
.then(()=>{
    console.log('mongoDB connected')
})
.catch(()=>{
    console.log("not connected with mongo")
})
const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    confirmPassword:String,
    image : String,
    type:String,
    cart:[
        {
            sellerEmail:String,
            name : String,
            category :String,
            image : String,
            price : String,
            description : String ,
            qty:String,
            total:String,
        }
    ]
});
const UserModel = mongoose.model("userTable",userSchema);





app.get("/",(req,res)=>{
    res.send("server is running");
})
app.post("/signup",async (req,res)=>{
    const data = req.body;
    data.type="user";
    const {email} = data;
    const check = await UserModel.findOne({email:email});
    if(check)
    {
        res.send({mes:"Exists"});
    }
    else{
        await UserModel.insertMany([data]);
        res.send({mes:"NotExists"}).status(201);
    }
})
app.get("/getUser/:email",async(req,res)=>{
    const {email} = req.params;
    // console.log(email);
    const check = await UserModel.findOne({ email: email });
    if (check) {
        const datasend = {
            firstName: check.firstName,
            lastName: check.lastName,
            email: check.email,
            image: check.image,
            type: check.type,
            cart:check.cart
        };
        res.send({mes:"yes",data:datasend});
    }
    else{
        res.send({mes:"no"});
    }

});
app.post("/login", async (req, res) => {
    const data = req.body;
    const { email } = data;
    const check = await UserModel.findOne({ email: email });
    if (check && check.password === data.password) {
        // User is authenticated, create a JWT token
        const datasend = {
            firstName: check.firstName,
            lastName: check.lastName,
            email: check.email,
            image: check.image,
            type: check.type,
            cart:check.cart
        };
        const datatoken = {
            firtName:check.firstName,
            email:check.email,
        };
        
        // console.log(datasend);

        // Secret key for signing the token, replace 'your-secret-key' with a strong secret key
        const secretKey = "sdfsdg55724dvx53354v32f";

        // Set the expiration time for the token (e.g., 1 hour)
        const expirationTime = 10;

        // Create the JWT token
        // const useremail = datasend.email;
        const token = jwt.sign(datatoken, secretKey, { expiresIn: expirationTime });
        // Send the token in the response
        res.send({ mes: "LoggedIn", data: datasend ,token: token});
    } else {
        res.send({ mes: "NotLoggedIn" });
    }
});



// seller model
const sellerSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    image : String,
    type:String,
    GST:String,
    address:String,
    PIN:{
        type:String,
        require:true
    },
    store:String,
    bank:String,
    Ifsc:String,
    PanImage:String,
    PanNumber:String,
})
const sellerModel = mongoose.model('seller',sellerSchema);


app.get("/getSellerData/:email",async (req,res)=>{
    const {email} = req.params;
    const check = await sellerModel.findOne({email:email});
    if(check)
    {
        const dataSend = check;
        res.send({mes:"sellerdetail",data:dataSend});
    }
    else{
        res.send({mes:"shut up"});
    }
})

app.post("/setOrder",async(req,res)=>{
    const data = req.body;
    const email = data.sellerEmail;
    const {_id,name,image,amount,date,UserEmail,paymentStatus}=data;
    const dataSend = {_id,name,image,amount,date,UserEmail,paymentStatus};
    const check = sellerModel.findOneAndUpdate({email:email},{$push:{Orders:dataSend}});
    if(check)
    {
        res.send({mes:"yes"});
    }
    else{
        res.send("no");
    }
})
app.post("/becomeseller", async (req, res) => {
    try {
        const data = req.body;
        data.type = "seller";

        // Destructuring the 'email' property directly from req.body
        const { email } = data;


        // Using findOne with await, assuming sellerModel is a Mongoose model
        const check = await sellerModel.findOne({ email:email });
        const ch = await UserModel.findOneAndUpdate({email:email},{$set:{type:"seller"}});

        if (check) {
            return res.send({ mes: "SellerExist" });
        } else {
            // Using create instead of insertMany for a single document
            await sellerModel.create(data);
            return res.send({ mes: "became a seller", data });
        }
    } catch (error) {
        console.error("Error in /becomeseller:", error);
        res.status(500).send({ mes: "Internal Server Error" });
    }
});




// product

const productSchema = mongoose.Schema({
    sellerEmail:String,
    name : String,
    category :String,
    image : String,
    price : String,
    description : String
})
const ProductModel = mongoose.model("product",productSchema);
app.post("/uploadProduct",async (req,res)=>{
    const data = req.body;
    const check = await ProductModel.insertMany([data]);
    // console.log(check)
    if(check)
    {
        const {_id,sellerEmail,name,description,price,category,image} = check[0];
        const newData = {_id,name,description,price,category,image};
        const seller = await sellerModel.findOneAndUpdate({email:sellerEmail},
            { $push: { Uploads: newData }});
        if(seller)
        {
            res.send({mes:"Added"});
        }
        else{
            res.send("Notadded")
        }
    }
    else{
        res.send("Notadded")
    }
})


app.get("/product",async(req,res)=>{
    const data = await ProductModel.find({});
    res.send(JSON.stringify(data));
})


/// cart
app.post("/addtocart",async(req,res)=>{
    const {email,productCartItem} = req.body;
    // console.log(productCartItem);
    const check = await UserModel.findOneAndUpdate({email:email},{$set:{cart:productCartItem}});
    if(check)
    {
        res.send({mes:"saved"});
    }
    else{
        res.send({mes:"notsaved"});
    }
});

app.listen(PORT,(req,res)=>{
    console.log("hi");
})
