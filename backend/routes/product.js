const express = require('express');

const {
  allProduct,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
  adminProducts,
} = require('../controllers/product');
const { authenticationMid, roleChecked } = require('../middleware/auth');

const router = express.Router();

router.get('/products', allProduct);
router.get(
  '/admin/products',
  authenticationMid,
  roleChecked('admin'),
  adminProducts
);
router.get('/product/:id', detailProduct);
router.post(
  '/product/new',
  authenticationMid,
  roleChecked('admin'),
  createProduct
);
router.post('/product/newReview', authenticationMid, createReview);
router.delete(
  '/product/:id',
  authenticationMid,
  roleChecked('admin'),
  deleteProduct
);
router.put(
  '/product/:id',
  authenticationMid,
  roleChecked('admin'),
  updateProduct
);

module.exports = router;
