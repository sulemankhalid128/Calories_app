const mongoose = require("mongoose");
const errorMessageWrapper = require("../utilities/utility").errorMessageWrapper;

module.exports = (app) => {
  app.use(function (err, req, res, next) {
    console.log(err);
    if (err.nF) {
      return res
        .status(404)
        .json(errorMessageWrapper(`${err.nF} is not found in our system`));
    } else if (err.name === "NoUserFound")
      return res
        .status(404)
        .json(errorMessageWrapper(`This user does not exist in our system`));
    else if (err.name === "AdminNotValid") {
      return res
        .status(401)
        .json(errorMessageWrapper(`Password for admin not valid!`));
    } else return next(err);
  });

  app.use(function (err, req, res, next) {
    if ((err.name = "CastError")) {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(422)
          .json(errorMessageWrapper(`Please send proper '${err.path}'`));
      } else
        return res
          .status(500)
          .json(errorMessageWrapper("Internal Server Error"));
    } else return next(err);
  });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    err.message = "No route was found";
    return next(err);
  });

  // error handler
  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);

    return res.json(errorMessageWrapper(err.message));
  });
};
