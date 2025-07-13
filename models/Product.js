const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    moreDetails: { type: String },
    photo: { type: String, required: true }, // ✅ Image URL only
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
