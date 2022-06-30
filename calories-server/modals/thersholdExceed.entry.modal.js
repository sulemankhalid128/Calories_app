const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thresholdExceed = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  thresholdLimit: {
    type: Number,
    required: true,
  },
  exceedThreshold: {
    type: Number,
    required: true,
  },
  exceedDate: {
    type: Schema.Types.Date,
    required: true,
  },
});

module.exports = mongoose.model("ThresholdExceed", thresholdExceed);
