const express = require('express');

const {
  allProduct,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/product');

const router = express.Router();

router.get('/products', allProduct);
router.get('/product/:id', detailProduct);
router.post('/product/new', createProduct);
router.delete('/product/:id', deleteProduct);
router.put('/product/:id', updateProduct);

module.exports = router;
