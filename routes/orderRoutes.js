// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const { placeCODOrder } = require("../controller/OrderController.js");
const Order = require("../models/Order.js");

router.post("/place-cod-order", placeCODOrder);
// Get all orders
router.get("/admin/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
});

// Update order status
router.put("/admin/orders/:id/status", async (req, res) => {
  const { status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update status", error: err.message });
  }
});

module.exports = router;
