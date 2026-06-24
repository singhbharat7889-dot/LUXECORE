import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Slice/ProductSlice";
import cartItemsReducer from "../Slice/CartSlice";

const ProductStore = configureStore({
  reducer: {
    product: productReducer,
    cartItems: cartItemsReducer,
  },
});

export default ProductStore;
