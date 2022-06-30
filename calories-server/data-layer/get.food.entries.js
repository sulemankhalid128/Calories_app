const foodEntryModel = require("../modals/food.entry.modal");

module.exports = class getFoodEntryQuery {
  constructor(limit, skip, searchFilter, userId) {
    this.limit = limit;
    this.skip = skip;
    this.query = {};
    this.query.userId = userId;
    if (searchFilter?.from && searchFilter?.to) {
      let start = new Date(searchFilter?.from);
      start.setHours(0, 0, 0, 0);

      let end = new Date(searchFilter?.to);
      end.setHours(23, 59, 59, 999);
      this.query.foodDate = {
        $gte: start,
        $lte: end,
      };
    }
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
