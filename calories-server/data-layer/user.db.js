const usersModel = require("../modals/user.modal");

module.exports = {
  createUser(name, role) {
    const newUser = new usersModel({ name, role });
    newUser.role = role;
    return newUser.save();
  },

  deleteUser(id) {
    return usersModel.findByIdAndRemove(id).select("_id");
  },

  getUserById(_id) {
    return usersModel.findOne({ _id }).select("-__v").exec();
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
