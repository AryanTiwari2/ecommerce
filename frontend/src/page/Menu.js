import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import AllProduct from '../component/AllProduct';
import { addCartItem } from '../redux/productSlice';
import { toast } from 'react-hot-toast';

const Menu = () => {
const {filterby} = useParams();
const ProductData = useSelector((state)=>state.product.productList);
const productDisplay = ProductData.filter((el)=>el._id===filterby)[0];
const dispatch = useDispatch();
const userData = useSelector((state)=>state.user.userdetail);

const handleAddCartProduct = ()=>{
  if(!userData.email)
    {
      toast("Login to add items");
      return;
    }
  dispatch(addCartItem(productDisplay));
}
const handleBuy = async()=>{
  if(!userData.email)
  {
    toast("Login to add items");
    return;
  }
  var today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const data = {sellerEmail:productDisplay.sellerEmail,_id:productDisplay._id,name:productDisplay.name,image:productDisplay.image,amount:productDisplay.price,date,UserEmail:userData.email,paymentStatus:"Pending"}
  const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}setOrder`,{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const response = await fetchData.json();
  if(response.mes==="yes")
  {
    toast("successfully ordered");
  }
  else{
    toast("failed your order");
  }
}
  return (
    <>
    {productDisplay ? <div className="p-2 md:p-4">
    <div className="w-full max-w-4xl m-auto md:flex bg-white">
      <div className="max-w-sm  overflow-hidden w-full p-5">
        <img
          src={productDisplay.image}
          className="hover:scale-105 transition-all h-full"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
          {productDisplay.name}
        </h3>
        <p className=" text-slate-500  font-medium text-2xl">{productDisplay.category}</p>
        <p className=" font-bold md:text-2xl">
          <span className="text-red-500 ">₹</span>
          <span>{productDisplay.price}</span>
        </p>
        <div className="flex gap-3">
        <button className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]" onClick={handleBuy}>Buy</button>
        <button className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
        onClick={handleAddCartProduct}>Add Cart</button>
        </div>
        <div>
          <p className="text-slate-600 font-medium">Description : </p>
          <p>{productDisplay.description}</p>
        </div>
      </div>
    </div>

    <AllProduct heading={"Related Product"}/>
  </div>
  :
  <div style={{fontSize:"45px", fontFamily:"cursive"}}>Loading....</div>
  }
  </>
  )
};

export default Menu;
