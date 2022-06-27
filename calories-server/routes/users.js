const db = require("../data-layer/user.db");
const jwt = require("jsonwebtoken");

const successMessage = require("../utilities/utility").successMessageWrapper;
const GetUserQuery = require("../data-layer/get.user.db");
const ROLES = require("../utilities/roles.constant");
const { getToken } = require("../core/authentication");

module.exports = {
  getUser(req, res, next) {
    return db
      .getUserById(req.params.id)
      .then((user) =>
        user ? res.status(200).json(user) : next({ nF: "User" })
      )
      .catch((err) => next(err));
  },

  createGuestUser(req, res, next) {
    let userName = req.body?.userName;
    let role = req.body?.role;
    return db
      .createUser(userName, role)
      .then((user) => {
        // token ? res.status(200).json(user) : next({ nF: "User" })
        console.log("user", user?._id, "name", user?.name, "role", user?.role);

        let token = jwt.sign(
          {
            _id: user?._id,
            userName: user?.name,
            role: user?.role,
          },
          "MY_SECRET_KEY",
          {
            expiresIn: 60 * 60 * 24 * 7,
          }
        );
        if (token) {
          db.updateUserInfo(user?._id, { token }).then((user) => {
            console.log("updateUser", user?._id, "token:::::::", user?.token);
            (req.user = user), next();
          });
        }
      })
      .catch((err) => next(err));
  },

  getUsers(req, res, next) {
    const getUserQuery = new GetUserQuery(
      req.params?.limit || 10,
      Number(req.query.skip || 0),
      req.query.searchFilter
    );
    return Promise.all([getUserQuery.getUsers(), getUserQuery.getUsersCount()])
      .then(([users, count]) => res.status(200).json({ users, count }))
      .catch((err) => next(err));
  },

  removeUser(req, res, next) {
    return db
      .deleteUser(req.params.id)
      .then((user) =>
        user ? res.status(200).json(successMessage) : next({ nF: "User" })
      )
      .catch((err) => next(err));
  },

  updateUserInfo(req, res, next) {
    return db
      .updateUserInfo(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      })
      .then((user) =>
        user ? res.status(200).json(user) : next({ nF: "User" })
      )
      .catch((err) => next(err));
  },

  generateToken(req, res, next) {
    const user = req.body;
    let token = getToken(user._id, user.role);
    return db
      .updateUserInfo(user._id, { token })
      .then((user) => {
        return res.status(201).json({
          token: token,
        });
      })
      .catch((e) => next(e));
  },
};
