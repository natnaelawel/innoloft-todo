import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Product } from "../../helpers/types";

export type productsState = {
  products: Array<Product>;
  isLoading: boolean;
  error: boolean;
};

// initial value
const initialState: productsState = {
  products: [],
  isLoading: false,
  error: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      state.products.push(payload);
      state.isLoading = false;
    },
    addProducts: (state, { payload }) => {
      state.products = payload;
      state.isLoading = false;
    },
    //
    updateProduct: (state, { payload }) => {
      state.products =
        state.products &&
        state.products.map((product: Product) => {
          if (product.id === payload.id) {
            return payload;
          }
          return product;
        });
    },
  },
});

export const { addProduct, addProducts, updateProduct } = productsSlice.actions;

export const productsSelector = (state: RootState) => state.products;

export default productsSlice.reducer;
