const Product = require("../models/Product");
const { cloudinary } = require("../config/cloudinary");

// @desc    Create a new product
// @route   POST /api/products

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    // Advanced filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Search functionality
    if (req.query.search) {
      queryObj.$text = { $search: req.query.search };
    }

    let query = Product.find(queryObj);

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const products = await query;
    const total = await Product.countDocuments(queryObj);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pages: Math.ceil(total / limit),
      data: products,
    });
  } catch (err) {
    console.error("Get Products Error:", err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error("Get Product Error:", err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Update a product by ID
// @route   PUT /api/products/:id

// @desc    Delete a product by ID
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(product.image.public_id);

    // Delete the product from database
    await product.remove();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: {},
    });
  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Create a new product
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, price, description, moreDetails, category, stock, image } =
      req.body;

    // Validate required fields
    if (
      !name ||
      !price ||
      !description ||
      !image ||
      !image.public_id ||
      !image.url
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Name, price, description, and image with public_id and url are required",
      });
    }

    const newProduct = await Product.create({
      name,
      price: Number(price), // Ensure price is a number
      description,
      moreDetails,
      category,
      stock,
      image: {
        public_id: image.public_id,
        url: image.url,
      },
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (err) {
    console.error("Create Product Error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Server error",
    });
  }
};

// @desc    Update a product by ID
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, moreDetails, category, stock, image } =
      req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    const updateData = {
      name,
      price: Number(price),
      description,
      moreDetails,
      category,
      stock,
    };

    // If a new image was provided
    if (image && image.public_id && image.url) {
      // Delete the old image from Cloudinary
      await cloudinary.uploader.destroy(product.image.public_id);

      updateData.image = {
        public_id: image.public_id,
        url: image.url,
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    console.error("Update Product Error:", err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
