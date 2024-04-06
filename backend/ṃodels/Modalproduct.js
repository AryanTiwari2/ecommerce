const productSchema = mongoose.Schema({
    productId:{
        type:String,
        required:[true,"please enter productId"]
    },
    sellerId:{
        type:String,
        required:[true,"please enter sellerId"]
    },
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    photo: {
      type: String,
      required: [true, "Please enter Photo"],
    },
    price: {
      type: Number,
      required: [true, "Please enter Price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter Stock"],
    },
    category: {
      type: String,
      required: [true, "Please enter Category"],
      trim: true,
    },
    description:String
});

const productModal = mongoose.model("product",productSchema);
module.exports={productModal}