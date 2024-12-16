const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  Order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order", // Assuming "Order" is the model name for orders
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  transaction_id: {
    type: String, // Changed to String for transaction ID
    required: false,
  },
  status: {
    type: String,
    default: "Pending", // Default status
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
