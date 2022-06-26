const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ROLES = require("../utilities/roles.constant");

const roles_enum = {
  values: [ROLES.regular, ROLES.admin],
  message: "`{VALUE}` is not a valid user role.",
};

const usersSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, enum: roles_enum, required: true, default: "regular" },
});

module.exports = mongoose.model("User", usersSchema);
