const { getToken } = require("../core/authentication");
const usersModel = require("../modals/user.modal");
const ROLES = require("../utilities/roles.constant");

module.exports = {
  createUser(name, role = ROLES.regular) {
    const newUser = new usersModel({ name, role });
    return newUser.save();
  },

  deleteUser(id) {
    return usersModel.findByIdAndRemove(id).select("_id");
  },
  findAdmin() {
    return usersModel.findOne({ tole: ROLES.admin });
  },

  getUserById(_id) {
    return usersModel.findOne({ _id }).select("-__v").exec();
  },

  getUserByName(name) {
    return usersModel.findOne({ name }).select("-__v").exec();
  },

  async getUserRoleById(id) {
    const user = await usersModel
      .findById(id)
      .select("role")
      .lean()
      .exec()
      .catch((err) => {
        throw err;
      });
    if (!user) return undefined;
    return user.role;
  },

  updateUserInfo(_id, payload) {
    return usersModel.findOneAndUpdate({ _id }, payload, { new: true });
  },
};
