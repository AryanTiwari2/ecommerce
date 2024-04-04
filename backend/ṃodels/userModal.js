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
