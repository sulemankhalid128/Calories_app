var express = require("express");
var router = express.Router();
const { verifyUser, checkUserAuth } = require("../core/authentication");
const user = require("./users");
const foodEntry = require("./food.entry");
const Authorize = require("../core/authorization");

// router.get("/users/", verifyUser, Authorize.preventRegularUsers, user.getUsers);

// router.put(
//   "/users/:id/info",
//   verifyUser,
//   validateUser.validateUpdateUser,
//   Authorize.allowAdmin,
//   user.updateUserInfo
// );

// router.get("/users/:id", verifyUser, Authorize.allowAdmin, user.getUser);

router.get("/get/food/:id", Authorize.allowAdmin, foodEntry.getFoodEntry);
router.post("/create/food/entry", checkUserAuth, foodEntry.createFood);
router.get("/user/entries", verifyUser, foodEntry.getFoodEntries);

//admin route
router.get("/user/entries/:id", verifyUser, foodEntry.getFoodEntries);
router.put("/update/user/entry/:id", foodEntry.updateFoodEntryInfo);
router.get("/users", user.getUsers);
router.delete("/remove/user/entry/:id", foodEntry.removeFoodEntry);
router.delete(
  "/users/:id",
  //   verifyUser,
  //   Authorize.preventRegularUsers,
  user.removeUser
);
router.get("/user/create", user.createGuestUser);

module.exports = router;
