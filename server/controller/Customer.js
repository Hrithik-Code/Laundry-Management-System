const customerSchema = require("../Models/customer_schema");
const categorySchema = require("../Models/category_schema");
const productSchema = require("../Models/product_schema");
const OrderSchema = require("../Models/Order.js");
const ShippingSchema = require("../Models/Shipping.js");
const PaymentSchema = require("../Models/Payment.js");
const feedbackSchema = require("../Models/feedback_schema.js");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const SECRETE_KEY = "PRODUCTS";
const mongoose = require("mongoose");

const Register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const profile = req.file?.filename;
    let checkEmail = await customerSchema.findOne({ email: email });
    if (checkEmail) {
      console.log("Email already exists!");
      res.json({ message: "Email already exists!" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let newcustomer = await new customerSchema({
        name,
        phone,
        email,
        password: hashedPassword,
        profile,
      });
      let savedcustomer = await newcustomer.save();
      console.log("New customer registered successfully");
      res.json({
        success: true,
        message: "New customer registered successfully",
        customer: savedcustomer,
      });
    }
  } catch (err) {
    console.log("Error" + err);
    res.json({ error: err, message: "error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await customerSchema.findOne({ email: email });
    if (!user) {
      console.log("Email not found!");
      res.json({ message: "Email or Password Invalid!" });
    } else {
      let checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        console.log("Invalid Password!");
        res.json({ message: "Email or Password Invalid!" });
      } else {
        let userId = user.id;
        let token = await jsonwebtoken.sign(userId, SECRETE_KEY);
        console.log("Login successful!");
        res.json({
          message: "Login successful!",
          success: true,
          loggedInUser: user,
          authToken: token,
        });
      }
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

const viewcategory = async (req, res) => {
  try {
    let category = await categorySchema.find();
    console.log(category);
    res.json(category);
  } catch (error) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const viewproduct = async (req, res) => {
  try {
    let product = await productSchema.find().populate("category_id");
    // console.log(product);
    res.json(product);
  } catch (error) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

// Calculate the grand total based on the product prices and quantities
const InsertOrder = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      location,
      state,
      pincode,
      paymethod,
      trans_id,
      products,
      service_product,
      totalPrice,
    } = req.body;

    // Check if 'details' and 'formFields' are defined and have expected structure
    // if (!details || !formFields || !Array.isArray(formFields)) {
    //   return res.status(400).json({ error: "Invalid request format" });
    // }

    // // Prepare order details
    // const orderProducts = formFields.map((field) => ({
    //   product_id: field.productId,
    //   quantity: field.quantity,
    //   total: field.quantity * (field.productId.price || 0), // Assuming product price is sent from frontend
    // }));

    // Calculate grand total (sum of all products' totals)
    // const grandTotal = orderProducts.reduce(
    //   (total, item) => total + item.total,
    //   0
    // );

    // Save order
    const newOrder = new OrderSchema({
      OrderDetails: products,
      GrandTotal: totalPrice,
      service_product: service_product,
      User_id: req.data, // Assuming req.customer contains user ID from authentication
      status: "pending",
    });
    const savedOrder = await newOrder.save();
    console.log(savedOrder, 8888);

    // Save shipping information
    const newShipping = new ShippingSchema({
      Order_id: savedOrder._id,
      name: name || "",
      email: email || "",
      phone: phone || "",
      address: address || "",
      location: "Mangalore",
      state: "Karnataka",
      pinCode: pincode || "",
      status: "Pending",
    });
    const savedShipping = await newShipping.save();
    console.log(savedShipping);
    // Save payment information
    const newPayment = new PaymentSchema({
      payment_method: paymethod || "",
      Order_id: savedOrder._id,
      transaction_id: trans_id || "",
      status: "Pending",
    });
    const savedPayment = await newPayment.save();

    // Respond with success message and saved data
    res.json({ savedOrder, savedShipping, savedPayment, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserOrder = async (req, res) => {
  try {
    const order = await OrderSchema.find({ User_id: req.data }).populate(
      "OrderDetails.productId"
    );
    console.log(order, 88888);
    const shipping = await ShippingSchema.find().populate(["Order_id"]);
    const payment = await PaymentSchema.find().populate(["Order_id"]);
    // .populate("OrderDetails.product_id");
    console.log(shipping, 99);
    res.json({ order, shipping, payment, success: true });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: err.message });
  }
};

const Feedback = async (req, res) => {
  try {
    const { title, message } = req.body;
    console.log(message);
    const User_id = req.data;
    let newFeedback = await new feedbackSchema({
      title,
      feedback: message,
      User_id,
    });
    let savedFeedback = await newFeedback.save();
    console.log("New Feedback inserted successfully");
    res.json({
      success: true,
      message: "New Feedback inserted successfully",
      customer: savedFeedback,
    });
  } catch (err) {
    console.log("Error" + err);
    res.json({ error: err, message: "error" });
  }
};

module.exports = {
  Register,
  Login,
  viewproduct,
  viewcategory,
  InsertOrder,
  getUserOrder,
  Feedback,
};
