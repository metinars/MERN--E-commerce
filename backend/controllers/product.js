const Product = require('../models/product');
const ProductFilter = require('../utils/productFilter');
const cloudinary = require('cloudinary').v2;

const allProduct = async (req, res) => {
  const resultPerPage = 10;
  const productFilter = new ProductFilter(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await productFilter.query;

  res.status(200).json({
    products,
  });
};

const adminProducts = async (req, res) => {
  const products = await Product.find();

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
  let images = [];

  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let allImage = [];

  for (let index = 0; index < images.length; index++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: 'products',
    });

    allImage.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = allImage;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    product,
  });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  for (let index = 0; index < product.images.length; index++) {
    await cloudinary.uploader.destroy(product.images[index].public_id);
  }

  await product.remove();

  res.status(200).json({
    message: 'Ürün silindi',
  });
};

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  let images = [];

  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let index = 0; index < product.images.length; index++) {
      await cloudinary.uploader.destroy(product.images[index].public_id);
    }
  }

  let allImage = [];

  for (let index = 0; index < images.length; index++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: 'products',
    });

    allImage.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = allImage;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    product,
  });
};

const createReview = async (req, res, next) => {
  const { productId, comment, rating } = req.body;

  const review = {
    user: req.user._id,
    name: req.user._name,
    commnet,
    rating: Number(rating),
  };

  const product = await Product.findById(productId);

  product.reviews.push(review);

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.rating = awg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    message: 'Yorumun başarıyla eklendi..',
  });
};

module.exports = {
  allProduct,
  adminProducts,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
};
