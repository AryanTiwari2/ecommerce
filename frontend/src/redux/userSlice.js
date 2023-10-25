import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderList:[],
  type:"",
  userdetail:{},
  sellerdetail:{},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state.userdetail=action.payload;
    },
    logoutRedux: (state, action) => {
      state.userdetail={};
      state.sellerdetail={};
    },
    sellerRedux:(state,action)=>{
      state.sellerdetail=action.payload;
      state.orderList = action.payload.Orders;
    }
  },
});

export const { loginRedux ,logoutRedux,sellerRedux} = userSlice.actions;

export default userSlice.reducer;

