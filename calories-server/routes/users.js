const db = require("../data-layer/user.db");
const jwt = require("jsonwebtoken");

const successMessage = require("../utilities/utility").successMessageWrapper;
const GetUserQuery = require("../data-layer/get.user.db");
const ROLES = require("../utilities/roles.constant");
const getToken = require("../core/authentication");
const foodEntry = require("./food.entry");

module.exports = {
  getUserByName(req, res, next) {
    return db
      .getUserByName(req.query.name)
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
        let token = jwt.sign(
          {
            _id: user?._id,
            userName: user?.name,
            role: user?.role,
          },
          "MY_SECRET_KEY",
          {}
        );
        if (token) {
          db.updateUserInfo(user?._id, { token }).then((user) => {
            (req.user = user), next();
          });
        }
      })
      .catch((err) => next(err));
  },

  getUsers(req, res, next) {
    const getUserQuery = new GetUserQuery(
      req.query?.limit || 10,
      Number(req.query.skip || 0)
    );
    return Promise.all([getUserQuery.getUsers(), getUserQuery.getUsersCount()])
      .then(([users, count]) => res.status(200).json({ users, count }))
      .catch((err) => next(err));
  },

  async removeUser(req, res, next) {
    try {
      let user = await db.deleteUser(req.params.id);
      if (user) {
        await foodEntry.deleteEntries(req.params.id);
        return res.status(200).json(successMessage);
      } else {
        next({ nF: "User" });
      }
    } catch (error) {
      next(err);
    }
  },

  findAdmin(req, res, next) {
    return db
      .findAdmin()
      .then((user) => {
        if (user && process.env.ADMIN_PASSWORD === req.body.password) {
          return res.status(200).json(user);
        }
        next({ name: "AdminNotValid" });
      })
      .catch((err) => next(err));
  },

  updateUserLimit(req, res, next) {
    return db
      .updateUserInfo(req.params.id, {
        threshold: parseInt(req.body.threshold),
      })
      .then((user) =>
        user ? res.status(200).json(user) : next({ nF: "User" })
      )
      .catch((err) => next(err));
  },

  refreshToken(req, res, next) {
    const userId = req.params.id;
    return db
      .getUserById(userId)
      .then((user) => {
        let token = jwt.sign(
          {
            _id: user?._id,
            userName: user?.name,
            role: user?.role,
          },
          "MY_SECRET_KEY",
          {}
        );
        if (token) {
          db.updateUserInfo(user?._id, { token }).then((user) =>
            res.status(201).json(user)
          );
        }
      })
      .catch((e) => next(e));
  },
};
