const jwt = require("jsonwebtoken");
const user = require("../routes/users");
const ROLES = require("../utilities/roles.constant");

const errorMessageWrapper = require("../utilities/utility").errorMessageWrapper;

function getToken(_id, userName, role) {
  return jwt.sign(
    {
      _id: _id,
      userName,
      role: role,
    },
    "MY_SECRET_KEY",
    {
      expiresIn: 60 * 60 * 24 * 7,
    }
  );
}

function verifyUser(req, res, next) {
  if (
    req.headers.authorization !== "null" &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "MY_SECRET_KEY", function (err, decoded) {
      if (err) {
        return res
          .status(401)
          .json({ msg: "Failed to authenticate.", code: 3 });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res
      .status(401)
      .json(errorMessageWrapper({ msg: "No token provided.", code: 4 }));
  }
}

function checkUserAuth(req, res, next) {
  if (req.headers.authorization && req.headers.authorization !== "null") {
    verifyUser(req, res, next);
  } else {
    let random = Math.floor(1000 + Math.random() * 9000);
    req.body.userName = `Guest${random}`;
    req.body.role = ROLES.regular;
    user.createGuestUser(req, res, next);
  }
}

module.exports = { getToken, verifyUser, checkUserAuth };
