const express = require("express");
const ConnectToMongo = require("./db");
ConnectToMongo();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4000;
app.use("/admin", require("./Routes/admin_Routes"));
app.use("/customer", require("./Routes/customer_Routes"));

//uploads
app.use("/uploads/customer", express.static("./Uploads/customer"));

app.use("/Uploads/admin", express.static("./Uploads/admin"));
app.use("/uploads/category", express.static("./Uploads/category"));
app.use("/uploads/product", express.static("./Uploads/product"));

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
