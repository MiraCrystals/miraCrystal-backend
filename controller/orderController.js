// controllers/orderController.js
const Order = require("../models/Order");

exports.placeCODOrder = async (req, res) => {
  const { name, phone, address, cartItems } = req.body;

  try {
    const total = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );

    // Save to DB
    const order = new Order({
      name,
      phone,
      address,
      cartItems,
      total,
      status: "Placed",
    });
    await order.save();

    res.status(200).json({
      message: "Order placed successfully!",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({
      message: "Order failed",
      error: error.message,
    });
  }
};
