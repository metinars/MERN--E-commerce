import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
};

export const getProducts = createAsyncThunk('products', async () => {
  const response = await fetch('http://localhost:4000/products');
  return await response.json();
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = productSlice.actions;

export default productSlice.reducer;
