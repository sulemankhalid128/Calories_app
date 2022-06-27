const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ROLES = require("../utilities/roles.constant");

const roles_enum = {
  values: [ROLES.regular, ROLES.admin],
  message: "`{VALUE}` is not a valid user role.",
};

const usersSchema = new Schema({
  name: { type: String, required: true },
  token: { type: String, required: false },
  threshold: {
    type: Number,
    default: 2100,
  },
  role: { type: String, enum: roles_enum, default: "regular" },
});

module.exports = mongoose.model("User", usersSchema);
