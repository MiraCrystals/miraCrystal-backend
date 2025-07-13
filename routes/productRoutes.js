const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getProductById,
} = require('../controller/productController');

// POST   /api/product/create
router.post('/create', createProduct);

// GET    /api/product/getAllProducts
router.get('/getAllProducts', getProducts);
router.put('/update/:id', updateProduct); // ✅ new route
router.get('/:id', getProductById);

// DELETE /api/product/delete/:id
router.delete('/delete/:id', deleteProduct); 

module.exports = router;
