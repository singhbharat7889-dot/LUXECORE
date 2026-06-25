
import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";

import axios from "axios";

export const fetchData =
  createAsyncThunk(

    "products/fetch",

    async () => {

      const res =
        await axios.get(
          "https://luxecore-api.onrender.com/api/products"
        );

      return res.data.products;
    }
  );

const initialState = {

  productItems: [],

  filteredProducts: [],

  quantities: {},

  status: "idle",

  error: null
};

const productSlice =
  createSlice({

    name: "product",

    initialState,

    reducers: {

      filterItems:
        (state, action) => {

          state.filteredProducts =
            state.productItems.filter(

              (item) =>
                item.category ===
                action.payload
            );
        },

      clearFilter:
        (state) => {

          state.filteredProducts = [];
        },

      increaseQty:
        (state, action) => {

          const id =
            action.payload;

          state.quantities[id] =

            (state.quantities[id] || 1) + 1;
        },

      decreaseQty:
        (state, action) => {

          const id =
            action.payload;

          state.quantities[id] =

            Math.max(

              (state.quantities[id] || 1) - 1,

              1
            );
        }
    },

    extraReducers:
      (builder) => {

        builder

          .addCase(
            fetchData.pending,

            (state) => {

              state.status =
                "loading";
            }
          )

          .addCase(
            fetchData.fulfilled,

            (state, action) => {

              state.status =
                "success";

              state.productItems =
                action.payload;

              state.filteredProducts = [];
            }
          )

          .addCase(
            fetchData.rejected,

            (state, action) => {

              state.status =
                "failed";

              state.error =
                action.error.message;
            }
          );
      }
  });

export const {

  filterItems,

  clearFilter,

  increaseQty,

  decreaseQty

} = productSlice.actions;

export default
  productSlice.reducer;

