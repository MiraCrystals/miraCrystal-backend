const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const orderRoutes = require("./routes/orderRoutes") ; 
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON body

// Routes
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);

app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or use SMTP host
      auth: {
        user: 'miracrystals365@gmail.com',
        pass: process.env.PASS, // Use App Passwords if using Gmail
      },
    });

    const mailOptions = {
      from: email,
      to: 'your_email@gmail.com', // your receiving email
      subject: `Contact Form: ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending message', error: err.message });
  }
});

// DB + Server Start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });
module.exports = app;