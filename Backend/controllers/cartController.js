const Cart = require("../models/Cart");

// GET CART

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      userId: req.params.userId,
    }).populate("productId");

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD TO CART

exports.addToCart = async (req, res) => {

  try {
    const { userId, productId, quantity } = req.body;

    const existing = await Cart.findOne({
      userId,
      productId,
    });

    if (existing) {
      existing.quantity += quantity;

      await existing.save();

      return res.status(200).json({
        success: true,
        cartItem: existing,
      });
    }

    const cartItem = await Cart.create({
      userId,
      productId,
      quantity,
    });

   const populatedCartItem =
  await Cart.findById(cartItem._id)
    .populate("productId");

res.status(201).json({
  success: true,
  cartItem: populatedCartItem,
});


  } catch (error) {
    console.log("CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  // catch (error) {

  //   res.status(500).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }
};

// UPDATE QUANTITY

exports.updateCart = async (req, res) => {
  try {
    const cartItem =
  await Cart.findByIdAndUpdate(
    req.params.id,
    { quantity: req.body.quantity },
    { new: true }
  ).populate("productId");

    res.status(200).json({
      success: true,
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE ITEM

exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Item deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
