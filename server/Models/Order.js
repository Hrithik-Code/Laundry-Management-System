const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetailsSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product", // Assuming "Product" is the model name for products
    required: true,
  },
  service_product: {
    type: String, // Changed to Number for total price calculation
    required: false,
  },
  total: {
    type: Number, // Changed to Number for total price calculation
    required: true,
  },
  quantity: {
    type: Number, // Changed to Number for quantity
    required: true,
  },
});

const OrderSchema = new Schema({
  OrderDetails: [OrderDetailsSchema],
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer", // Assuming "Customer" is the model name for customers
    required: true,
  },
  status: {
    type: String,
    default: "pending", // Default status
  },
  GrandTotal: {
    type: Number, // Changed to Number for total price calculation
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
