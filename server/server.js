const express = require("express");
const userRoute = require("./routes/user.route");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auth = require("./routes/auth.route");
const protected = require("./routes/protected.route");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use("/users", userRoute);
app.use("/auth", auth);
app.use("/protected", protected);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
