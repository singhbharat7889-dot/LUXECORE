import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const API = "https://luxecore-api.onrender.com/api/cart";

// FETCH CART

export const fetchCartData = createAsyncThunk(
  "cart/fetch",

  async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return [];

    const res = await axios.get(`${API}/${user._id}`);

    return res.data.cart;
  },
);
// ADD TO CART

export const addToCart = createAsyncThunk("cart/add", async (item) => {
  const user = JSON.parse(localStorage.getItem("user"));

 const res = await axios.post(API, {
  userId: user._id,
  productId: item._id,
  quantity: item.quantity,
});

  return res.data.cartItem;
});

// DELETE ITEM

export const deleteItemFromApi = createAsyncThunk(
  "cart/delete",

  async (id) => {
    await axios.delete(`${API}/${id}`);

    return id;
  },
);

// UPDATE QUANTITY

export const updateCartQty = createAsyncThunk(
  "cart/updateQty",

  async ({ id, quantity }) => {
    const res = await axios.put(`${API}/${id}`, {
      quantity,
    });

    return res.data.cartItem;
  },
);

// INITIAL STATE

const initialState = {
  cart: [],

  status: "idle",

  error: null,
};

// SLICE

const cartSlice = createSlice({
  name: "cartItems",

  initialState,

  reducers: {
    clearCart: (state) => {
      state.cart = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH CART

      .addCase(
        fetchCartData.pending,

        (state) => {
          state.status = "loading";
        },
      )

      .addCase(
        fetchCartData.fulfilled,

        (state, action) => {
          state.status = "success";

          state.cart = action.payload;
        },
      )

      .addCase(
        fetchCartData.rejected,

        (state, action) => {
          state.status = "failed";

          state.error = action.error.message;
        },
      )

      // ADD TO CART

      .addCase(
        addToCart.fulfilled,

        (state, action) => {
          const item = action.payload;

          const existing = state.cart.find((i) => i._id === item._id);

          if (existing) {
            existing.quantity = item.quantity;
          } else {
            state.cart.push(item);
          }
        },
      )

      // DELETE ITEM

      .addCase(
        deleteItemFromApi.fulfilled,

        (state, action) => {
          state.cart = state.cart.filter((i) => i._id !== action.payload);
        },
      )

      // UPDATE QUANTITY

      .addCase(
        updateCartQty.fulfilled,

        (state, action) => {
          const updated = action.payload;

          const index = state.cart.findIndex((i) => i._id === updated._id);

          if (index !== -1) {
            state.cart[index] = updated;
          }
        },
      );
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
