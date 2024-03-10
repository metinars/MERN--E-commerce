import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: 0,
    loading: false,
  },
  reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = productSlice.actions;

export default productSlice.reducer;
