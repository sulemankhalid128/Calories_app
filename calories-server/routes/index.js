var express = require("express");
var router = express.Router();
const { verifyUser } = require("../core/authentication");
const user = require("./users");
const foodEntry = require("./food.entry");
const Authorize = require("../core/authorization");
const validateUser = require("./user.validate");

router.get("/users/", verifyUser, Authorize.preventRegularUsers, user.getUsers);
router.post("/user/create", user.createUser);

// router.put(
//   "/users/:id/info",
//   verifyUser,
//   validateUser.validateUpdateUser,
//   Authorize.allowAdmin,
//   user.updateUserInfo
// );

// router.delete(
//   "/users/:id",
//   verifyUser,
//   Authorize.preventRegularUsers,
//   user.removeUser
// );

// router.get("/users/:id", verifyUser, Authorize.allowAdmin, user.getUser);

router.get("/get/food/:id", Authorize.allowAdmin, foodEntry.getFoodEntry);
router.post("/create/food/entry", foodEntry.createFood);
router.get("/user/entries/:id", foodEntry.getFoodEntries);

//admin route
router.put("/update/user/entry/:id", foodEntry.updateFoodEntryInfo);

module.exports = router;
