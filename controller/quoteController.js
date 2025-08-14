// controllers/quoteController.js
const Quote = require("../models/Quote");
//
// GET all quotes
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching quotes", error: err });
  }
};

// POST create a new quote
exports.createQuote = async (req, res) => {
  const { chakra, sanskrit, message, color, image } = req.body;
  try {
    const newQuote = new Quote({ chakra, sanskrit, message, color, image });
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(400).json({ message: "Error creating quote", error: err });
  }
};
