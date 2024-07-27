import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList : [],
    cartItem : [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            console.log(action);
            state.productList = [...action.payload]
        },

        addCartItem : (state, action) => {
            const check = state.cartItem.some(el => el._id === action.payload._id);
            console.log(check);
            
            if(check){
                alert("Item already in cart");
            }
            else {
                alert("item added successfully");
                //console.log(action);
                const total = action.payload.price;
                state.cartItem = [...state.cartItem, { ...action.payload, qty: 1, total: total }]
            }
        },

        deleteCartItem : (state, action) => {
            //console.log(action.payload);
            const index = state.cartItem.findIndex((el) => el._id === action.payload);
            alert(`${state.cartItem[index].name} is being deleted`);
            //console.log(index);
            state.cartItem.splice(index, 1);
        },

        increaseQty : (state, action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload);
            let qty = state.cartItem[index].qty;
            const qtyInc = ++qty
            state.cartItem[index].qty = qtyInc;

            const price = state.cartItem[index].price;
            const total = price * qtyInc;

            state.cartItem[index].total = total;
        },

        decreaseQty : (state, action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload);
            let qty = state.cartItem[index].qty;
            if(qty > 1){
                const qtyDec = --qty;
                state.cartItem[index].qty = qtyDec;

                const price = state.cartItem[index].price;
                const total = price * qtyDec;

                state.cartItem[index].total = total;
            }
        },

        clearCart : (state) => {
            state.cartItem = [];
        }
    }
})

export const {setDataProduct, addCartItem, deleteCartItem, increaseQty, decreaseQty, clearCart} = productSlice.actions;
export default productSlice.reducer;