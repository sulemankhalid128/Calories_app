var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
const errorHandlersMiddleware = require("./core/errorHandler");
require("dotenv").config();

//Import the mongoose module
var mongoose = require("mongoose");

//Set up default mongoose connection
var mongoDB = "mongodb://127.0.0.1/calories_app";
// var mongoDB =
//   "mongodb+srv://sulemankhalid128:Suleman321@cluster0.jsrlo.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("db connected successfully"));

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
errorHandlersMiddleware(app);

module.exports = app;
