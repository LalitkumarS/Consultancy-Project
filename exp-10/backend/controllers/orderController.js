const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { productName, description, totalPrice, quantity, userDetails, cartItems } = req.body;

    if (!userDetails || !userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.address) {
      return res.status(400).json({ message: 'User details are required' });
    }

    if ((!cartItems || cartItems.length === 0) && (!productName || !description || !quantity)) {
      return res.status(400).json({ message: 'Please provide product details or cart items' });
    }

    const newOrder = new Order({
      productName,
      description,
      totalPrice,
      quantity,
      userDetails,
      cartItems: cartItems || [],
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: newOrder._id,
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOrder };
