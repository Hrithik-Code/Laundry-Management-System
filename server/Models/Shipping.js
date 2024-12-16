const mongoose = require("mongoose");
const { Schema } = mongoose;
const ShippingSchema = new Schema({
  Order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
  },
});
module.exports = mongoose.model("shipping", ShippingSchema);
