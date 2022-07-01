const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodEntrySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    calorie: {
      type: Number,
      required: true,
    },
    foodName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    foodDate: {
      type: Schema.Types.Date,
      required: true,
    },
  },
  { timestamps: { createdAt: true } }
);

module.exports = mongoose.model("FoodEntry", foodEntrySchema);
