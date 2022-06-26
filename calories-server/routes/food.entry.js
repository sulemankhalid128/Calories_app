const db = require("../data-layer/foodEntry.db");
const successMessage = require("../utilities/utility").successMessageWrapper;
const GetFoodEntryQuery = require("../data-layer/get.food.entries");
const ROLES = require("../utilities/roles.constant");
const { getToken } = require("../core/authentication");

module.exports = {
  getFoodEntry(req, res, next) {
    return db
      .getFoodEntryById(req.params.id)
      .then((entry) =>
        entry ? res.status(200).json(entry) : next({ nF: "Food Entry" })
      )
      .catch((err) => next(err));
  },

  getFoodEntries(req, res, next) {
    const getFoodEntries = new GetFoodEntryQuery(
      req.query.limit || 10,
      Number(req.query.skip || 0),
      req.query.searchFilter,
      req.params?.id
    );
    return Promise.all([
      getFoodEntries.getFoodEntries(),
      getFoodEntries.getFoodEntriesCount(),
    ])
      .then(([foodEntries, count]) =>
        res.status(200).json({ foodEntries, count })
      )
      .catch((err) => next(err));
  },

  removeFoodEntry(req, res, next) {
    return db
      .deleteFoodEntry(req.params.id)
      .then((food) =>
        food ? res.status(200).json(successMessage) : next({ nF: "Food Entry" })
      )
      .catch((err) => next(err));
  },

  updateFoodEntryInfo(req, res, next) {
    return db
      .updateFoodEntryInfo(req.params.id, {
        foodName: req.body.foodName,
        price: req.body.price,
        calorie: req.body.calorie,
        foodDate: req.body.foodDate,
      })
      .then((entry) =>
        entry ? res.status(200).json(entry) : next({ nF: "Food Entry" })
      )
      .catch((err) => next(err));
  },

  createFood(req, res, next) {
    return db
      .createFoodEntry({
        foodName: req.body.foodName,
        price: req.body.price,
        calorie: req.body.calorie,
        foodDate: req.body.foodDate,
        userId: req.body.userId,
      })
      .then((entry) =>
        entry ? res.status(200).json(entry) : next({ nF: "Food Entry" })
      )
      .catch((err) => next(err));
  },
};
