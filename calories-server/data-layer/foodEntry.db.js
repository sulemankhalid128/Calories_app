const foodEntryModal = require("../modals/food.entry.modal");
const thresholdModal = require("../modals/thersholdExceed.entry.modal");
const moment = require("moment");

module.exports = {
  createFoodEntry({ foodName, price, calorie, foodDate, userId }) {
    const newEntry = new foodEntryModal({
      foodName,
      price,
      calorie,
      foodDate,
      userId,
    });
    return newEntry.save();
  },

  deleteFoodEntry(id) {
    return foodEntryModal.findByIdAndRemove(id).select("_id");
  },
  deleteUserFoodEntry(id) {
    return foodEntryModal.deleteMany({ userId: id }).select("_id");
  },

  getReachedEntries(userId) {
    return thresholdModal.find({ userId }).select("-__v").exec();
  },

  findTodayEntries(userId, date) {
    let start = new Date(date);
    start.setHours(0, 0, 0, 0);

    let end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return foodEntryModal
      .find({
        userId,
        foodDate: {
          $gte: start,
          $lte: end,
        },
      })
      .select("-__v")
      .exec();
  },

  updateFoodEntryInfo(_id, payload) {
    return foodEntryModal.findOneAndUpdate({ _id }, payload, { new: true });
  },

  findMonthPriceLimit(userId, date) {
    let start = moment(new Date(date)).startOf("month").toDate();
    let end = moment(new Date(date)).endOf("month").toDate();
    return foodEntryModal
      .find({
        userId,
        exceedDate: {
          $gte: start,
          $lte: end,
        },
      })
      .select("-__v")
      .exec();
  },
  findTodayExceedEntry(userId, date) {
    let start = new Date(date);
    start.setHours(0, 0, 0, 0);

    let end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return thresholdModal
      .findOne({
        userId,
        exceedDate: {
          $gte: start,
          $lte: end,
        },
      })
      .select("-__v")
      .exec();
  },

  createExceedEntry(payload) {
    return thresholdModal.create(payload);
  },

  async getAdminStats() {
    let start = moment().subtract(7, "days").startOf("day").toDate();
    let end = new Date();
    let prevStart = moment().subtract(14, "days").startOf("day").toDate();
    let prevEnd = start;
    let lastSevenDays = await foodEntryModal.count({
      foodDate: {
        $gte: start,
        $lte: end,
      },
    });
    let previousWeek = await foodEntryModal.count({
      foodDate: {
        $gte: prevStart,
        $lte: prevEnd,
      },
    });
    // .select("-__v")
    // .exec();

    return { lastSevenDays, previousWeek };
  },
};
