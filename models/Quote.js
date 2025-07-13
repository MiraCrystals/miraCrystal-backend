// models/Quote.js
const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    chakra: {
      type: String,
      required: true,
    },
    sanskrit: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    color: {
      type: String, // Optional field for chakra color
    },
    image: {
      type: String, // Optional field for chakra image/icon
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quote', quoteSchema);
