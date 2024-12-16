const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  Register,
  Login,
  viewproduct,
  viewcategory,
  InsertOrder,
  getUserOrder,
  Feedback,
} = require("../controller/Customer");
const fetchCustomer = require("../middleware/Customer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/customer/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/Register", upload.single("profile"), Register);
router.post("/login", Login);
router.get("/viewAllProducts", viewproduct);
router.get("/viewAllCategories", viewcategory);
router.post("/feedback", fetchCustomer, Feedback);

router.post("/insertOrder", fetchCustomer, InsertOrder);
router.get("/getUserOrder", fetchCustomer, getUserOrder);

module.exports = router;
