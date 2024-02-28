const Product = require('../models/product');
const ProductFilter = require('../utils/productFilter');
const ProductFilter = require('../utils/productFilter');

const allProduct = async (req, res) => {
  const productFilter = await ProductFilter(
    Product.find(),
    req.query.search().fiter()
  );
  const products = await productFilter.query;

  res.status(200).json({
    products,
  });
};

const detailProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({
    product,
  });
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    product,
  });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  product.remove();

  res.status(200).json({
    message: 'Ürün silindi',
  });
};

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    product,
  });
};

module.exports = {
  allProduct,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
