const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config()
const app = express();
const MONGODB_URL = process.env.CONNECTION_URL
// const MONGODB_URL = 'mongodb://localhost/brightern322'
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Routes
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/",userRoutes);
app.use("/",orderRoutes)

app.get("/", (req, res) => {
  res.status(200).send("<h1>Server for Orderify</h1>");
});

mongoose
  .connect(MONGODB_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server up and running on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log("error ",err.message);
  });