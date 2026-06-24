const Order =require("../models/Order")
const Cart = require("../models/Cart")

exports.placeOrder = async (req, res) => {
    try{
        const { userId } = req.body

        const cartItems = await Cart.find({
            userId,
        }).populate("productId")

const totalAmount = cartItems.reduce(
      (acc, item) =>
        acc +
        item.productId.price * item.quantity,
      0
    );

    const order = await Order.create({
  userId,

  orderNumber:
    "#" +
    Math.random()
      .toString(16)
      .slice(2, 8)
      .toUpperCase(),

  items: cartItems.map((item) => ({
    productId: item.productId._id,
    quantity: item.quantity,
  })),

  totalAmount,
});

    await Cart.deleteMany({
      userId,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .populate("items.productId");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "username email")
      .populate("items.productId");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.updateOrderStatus =
  async (req, res) => {
    try {
      const { orderId } =
        req.params;

      const { status } =
        req.body;

      const order =
        await Order.findByIdAndUpdate(
          orderId,
          { status },
          { new: true }
        );

      res.status(200).json(
        order
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };