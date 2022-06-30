var express = require("express");
var router = express.Router();
const { verifyUser, checkUserAuth } = require("../core/authentication");
const user = require("./users");
const foodEntry = require("./food.entry");
const Authorize = require("../core/authorization");

router.post("/refresh/token/:id", user.refreshToken);
router.post("/reset/threshold/:id", user.updateUserLimit);
router.post("/create/food/entry", checkUserAuth, foodEntry.createFood);
router.get("/user/entries", verifyUser, foodEntry.getFoodEntries);
router.get("/find/user/:id", user.findUser);

//admin route
router.get("/user/entries/:id", verifyUser, foodEntry.getFoodEntries);
router.put(
  "/update/user/entry/:id",
  verifyUser,
  Authorize.allowAdmin,
  foodEntry.updateFoodEntryInfo
);
router.get("/users", verifyUser, Authorize.allowAdmin, user.getUsers);
router.get("/get/stats", verifyUser, Authorize.allowAdmin, foodEntry.getStats);
router.post("/admin/validate", user.findAdmin);
router.delete(
  "/remove/user/entry/:id",
  verifyUser,
  Authorize.allowAdmin,
  foodEntry.removeFoodEntry
);
router.delete("/users/:id", verifyUser, Authorize.allowAdmin, user.removeUser);

// router.get("/user/create", user.createGuestUser);
// router.get("/get/food/:id", Authorize.allowAdmin, foodEntry.getFoodEntry);

module.exports = router;
