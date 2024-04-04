const productSchema = mongoose.Schema({
    sellerEmail:String,
    name : String,
    category :String,
    image : String,
    price : String,
    description : String
})
const ProductModel = mongoose.model("product",productSchema);