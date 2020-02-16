const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./api/routes/user");
const questionRoutes = require("./api/routes/question");
const followRoutes = require("./api/routes/follow");
const notificationRoutes = require("./api/routes/notification");
const adminRoutes = require("./api/routes/admin");

require("dotenv").config();

mongoose.Promise = global.Promise;
const url = 'mongodb://127.0.0.1:27017/askPrivy';
mongoose.connect(url, 
    { 
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    }
  ).catch((error) => { console.log(error);});


app.use(morgan("dev"));
app.use('/uploads' ,express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://askprivy.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


app.use("/api/user", userRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      myMessage : "an error!"
    }
  });
});

module.exports = app;
