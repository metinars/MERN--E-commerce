import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  product: {},
  loading: false,
};

export const getProducts = createAsyncThunk('products', async (params) => {
  console.log(params);

  let url = 'http://localhost:4000/products';

  if (params.keyword) {
    url = `http://localhost:4000/products?keyword=${params.keyword}${
      '&rating[gte]=' + params.rating || 0
    }${
      (params.price && '&price[gte]=' + params.price.min) ||
      0 + '&price[lte]=' + params.price.max ||
      30000
    }${params.category && '&category=' + params.category}`;
  } else if (params.rating || params.price) {
    url = `http://localhost:4000/products?rating[gte]=${
      params.rating || 0
    }&price[gte]=${params.price.min || 0}&price[lte]=${
      params.price.max || 30000
    }${params.category && '&category=' + params.category}`;
  }

  console.log(params.keyword);
  console.log(url);
  const response = await fetch(url);
  return await response.json();
});

export const getProductDetail = createAsyncThunk('product', async (id) => {
  const response = await fetch(`http://localhost:4000/product/${id}`);
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

    builder.addCase(getProductDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
