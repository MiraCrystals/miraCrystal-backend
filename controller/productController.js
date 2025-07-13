const Product = require('../models/Product');

// @desc    Create a new product
// @route   POST /api/product/create
const createProduct = async (req, res) => {
  try {
    const { name, price, description, moreDetails, photo } = req.body;

    if (!name || !price || !description || !photo) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const newProduct = await Product.create({
      name,
      price,
      description,
      moreDetails,
      photo,
    });

    res.status(201).json({ message: 'Product created', product: newProduct });
  } catch (err) {
    console.error('Create Product Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get all products
// @route   GET /api/product/getAllProducts
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.error('Get Products Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete a product by ID
// @route   DELETE /api/product/delete/:id
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted', product: deleted });
  } catch (err) {
    console.error('Delete Product Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ @desc    Update a product by ID
// ✅ @route   PUT /api/product/update/:id
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, moreDetails, photo } = req.body;

    const updated = await Product.findByIdAndUpdate(
      id,
      { name, price, description, moreDetails, photo },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated', product: updated });
  } catch (err) {
    console.error('Update Product Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}; 


const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    console.error('Get Product Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct, // ✅ include this
  getProductById,
};
