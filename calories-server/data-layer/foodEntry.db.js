const foodEntryModal = require("../modals/food.entry.modal");

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

  getFoodEntryById(_id) {
    return foodEntryModal.findOne({ _id }).select("-__v").exec();
  },

  updateFoodEntryInfo(_id, payload) {
    return foodEntryModal.findOneAndUpdate({ _id }, payload, { new: true });
  },
};
