const foodEntryModel = require("../modals/food.entry.modal");

module.exports = class getFoodEntryQuery {
  constructor(limit, skip, searchFilter, userId) {
    this.limit = limit;
    this.skip = skip;
    this.query = {};
    this.query.userId = userId;
    if (searchFilter)
      this.query.foodName = { $regex: RegExp(`.*${searchFilter}.*`) };
  }
  getFoodEntries() {
    return foodEntryModel
      .find(this.query)
      .limit(this.limit)
      .skip(this.skip)
      .populate("userId")
      .select("_id foodName foodDate calorie price userId")
      .lean()
      .exec();
  }
  getFoodEntriesCount() {
    return foodEntryModel
      .find(this.query)
      .select("-meals")
      .count()
      .lean()
      .exec();
  }
};
