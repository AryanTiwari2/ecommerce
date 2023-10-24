import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState={
    productList:[],
    cartItem:[]
};
export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setProductData:(state,action)=>{
            state.productList=[...action.payload]
        },
        initialiseCartItem:(state,action)=>{
            state.cartItem=action.payload;
        },
        addCartItem:(state,action)=>{
            const check = state.cartItem.some((e)=>e._id===action.payload._id);
            if(check)
            {
                toast("Item already exists in cart");
            }
            else{
                toast("Item added to cart");
                const total = action.payload.price;
                state.cartItem = [...state.cartItem,{...action.payload,qty:1,total:total}];
            }
        },
        deleteCartItem:(state,action)=>{
            const index = state.cartItem.findIndex((el)=>el._id===action.payload);
            state.cartItem.splice(index,1);
            toast("One Item deleted");
        },
        increaseQty:(state,action)=>{
            const index = state.cartItem.findIndex((el)=>el._id===action.payload);
            let qty = state.cartItem[index].qty;
            let total = state.cartItem[index].total;
            let price = state.cartItem[index].price;
            state.cartItem[index].qty=++qty;
            state.cartItem[index].total = parseInt(price) + parseInt(total);
        },
        decreaseQty:(state,action)=>{
            const index = state.cartItem.findIndex((el)=>el._id===action.payload);
            let qty = state.cartItem[index].qty;
            if(qty>1)
            {
                let total = state.cartItem[index].total;
                let price = state.cartItem[index].price;
                state.cartItem[index].qty=--qty;
                state.cartItem[index].total = parseInt(total) - parseInt(price);
            }
        },
        deleteAllcartItem:(state,action)=>{
            state.cartItem=[];
        }
    }
})
export const {setProductData,addCartItem,deleteCartItem,increaseQty,decreaseQty,initialiseCartItem,deleteAllcartItem} = productSlice.actions;
export default productSlice.reducer;