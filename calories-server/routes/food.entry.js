const db = require("../data-layer/foodEntry.db");
const userDb = require("../data-layer/user.db");
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
      JSON.parse(req.query.searchFilter),
      req?.decoded?._id
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

  async createFood(req, res, next) {
    try {
      let userId = req.user?._id || req?.decoded?._id;
      let thresholdWarning = "";
      let priceWarning = "";
      let entry = await db.createFoodEntry({
        foodName: req.body.foodName,
        price: req.body.price,
        calorie: req.body.calorie,
        foodDate: req.body.foodDate,
        userId,
      });

      let foodEntryToday = await db.findTodayEntries(userId, req.body.foodDate);
      let monthlyPrice = await db.findMonthPriceLimit(
        userId,
        req.body.foodDate
      );
      let sum = foodEntryToday?.reduce((a, b) => {
        return a + b.calorie;
      }, 0);
      let monthlySum = monthlyPrice?.reduce((a, b) => {
        return a + +b.price;
      }, 0);
      let user = await userDb.getUserById(userId);
      if (sum > user?.threshold) {
        thresholdWarning = `Your maximum threshold limit ${
          user?.threshold
        } exceeded ${sum} for this ${new Date(
          req.body.foodDate
        ).toDateString()}`;
        let findDateExceed = await db.findTodayExceedEntry(
          userId,
          req.body.foodDate
        );
        if (!findDateExceed) {
          await db.createExceedEntry({
            userId,
            thresholdLimit: user?.threshold,
            exceedThreshold: sum,
            exceedDate: req.body.foodDate,
          });
        } else {
          await findDateExceed.update({ exceedThreshold: sum });
        }
      }

      if (monthlySum > 1000) {
        priceWarning = `Your monthly price limit $1000 reached $${monthlySum}`;
      }

      entry
        ? res
            .status(200)
            .json(
              req?.user
                ? { user: req.user, thresholdWarning, priceWarning }
                : { entry: { ...entry, thresholdWarning, priceWarning } }
            )
        : next({ nF: "Food Entry" });
    } catch (error) {
      return next(error);
    }
  },

  async getStats(req, res, next) {
    try {
      let stats = await db.getAdminStats();
      return res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  },
};
