
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