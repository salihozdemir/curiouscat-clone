const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./api/routes/user");
const questionRoutes = require("./api/routes/question");
const followRoutes = require("./api/routes/follow");
const notificationRoutes = require("./api/routes/notification");

mongoose.Promise = global.Promise;
// mongoose.connect(
//   "mongodb+srv://dbUser:" +
//     process.env.MONGO_ATLAS_PW +
//     "@question-cnqwq.gcp.mongodb.net/askPrivy?retryWrites=true&w=majority",
//   {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true
//   }
// ).catch((error) => { console.log(error);});
const url = 'mongodb://127.0.0.1:27017/askPrivy';
mongoose.connect(url, 
    { 
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    }
  ).catch((error) => { console.log(error);});


app.use(morgan("dev"));
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
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


app.use("/user", userRoutes);
app.use("/question", questionRoutes);
app.use("/follow", followRoutes);
app.use("/notification", notificationRoutes);

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
      myMessage : "Bir hata!"
    }
  });
});

module.exports = app;
