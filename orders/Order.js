const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: { type: String },
  productId: { type: String },
 
  userAddress: { type: String, max: 40 },
  cartId: { type: String },
  
  requestedDate: { type: Date, default: Date.now() },
  deliveredDate: { type: Date },
  status: {
    type: String,
    default: "PLACED",
  },
});
