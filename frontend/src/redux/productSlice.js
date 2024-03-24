import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  adminProducts: [],
  product: {},
  loading: false,
};

export const getProducts = createAsyncThunk('products', async (params) => {
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

  const response = await fetch(url);
  return await response.json();
});

export const getProductAdmin = createAsyncThunk('admin', async (id) => {
  const token = localStorage.getItem('token');
  console.log(token);
  const response = await fetch(`http://localhost:4000/admin/products`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return await response.json();
});

export const addProductAdmin = createAsyncThunk('adminadd', async (data) => {
  const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'POST',
    headers: { authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    'http://localhost:4000/product/new',
    requestOptions
  );
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

    builder.addCase(getProductAdmin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.adminProducts = action.payload;
    });

    builder.addCase(addProductAdmin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProductAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.adminProducts = [...state.products, action.payload];
    });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
