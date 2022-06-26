const ROLES = require("../utilities/roles.constant");
const errorMessageWrapper = require("../utilities/utility").errorMessageWrapper;

function preventRegularUsers(req, res, next) {
  const role = req.decoded.role;
  if (role === ROLES.regular)
    return res.status(403).json(errorMessageWrapper("Not Authorized."));
  return next();
}

function allowAdmin(req, res, next) {
  const role = req.decoded.role;
  if (req.decoded._id === req.params.id || role === ROLES.admin) {
    return next();
  } else {
    return res.status(403).json(errorMessageWrapper("Not Authorized."));
  }
}

module.exports = {
  allowAdmin,
  preventRegularUsers,
};