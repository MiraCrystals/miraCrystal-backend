// controllers/contactController.js
const Contact = require('../models/Contact');

// POST submit contact form
exports.submitContact = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: "Thank you for contacting us!" });
  } catch (err) {
    res.status(400).json({ message: "Submission failed", error: err });
  }
};

// GET all contact submissions (optional - for admin use)
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contacts", error: err });
  }
};
