const express = require("express");
const userRoute = require("./routes/user.route");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auth = require("./routes/auth.route");
const protected = require("./routes/protected.route");
const notes = require("./routes/notes.route");
const test = require("./routes/test.route");
const rag = require("./routes/rag.route");
const initializePassport = require("./config/passport.config");
const passport = require("passport");
const session = require("express-session");
const helmet = require("helmet");

const app = express();
dotenv.config();
const version = "/api/v1";
const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

initializePassport(passport);

app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// Passport
app.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use(`${version}/users`, userRoute);
app.use(`${version}/auth`, auth);
app.use(`${version}/protected`, protected);
app.use(`${version}/notes`, notes);
app.use(`${version}/rag`, rag);
app.use(`${version}/test`, test);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server is running on port 8080");
});
