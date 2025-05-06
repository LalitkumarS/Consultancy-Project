// In your orderRoutes.js
const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/orderController");
const Order = require("../models/Order");

// POST route to create a new order
router.post("/orders", createOrder);

// GET route to fetch only "Placed" orders
router.get("/order-history", async (req, res) => {
  try {
    // Fetch orders where status is "Placed"
    const orders = await Order.find({ status: "Placed" });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});

// PUT route to mark an order as completed
router.put("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.status = "Completed"; // Update the status to "Completed"
    await order.save();

    res.status(200).json({ message: "Order marked as completed.", order });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status." });
  }
});

// GET route to fetch all orders
router.get("/orders", async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});

module.exports = router;
