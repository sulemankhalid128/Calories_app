const usersModel = require("../modals/user.modal");

module.exports = class getUserQuery {
  constructor(limit, skip, roleFilter, searchFilter) {
    this.limit = limit;
    this.skip = skip;
    this.query = {};
    if (searchFilter)
      this.query.name = { $regex: RegExp(`.*${searchFilter}.*`) };
    if (roleFilter) this.query.role = roleFilter;
  }
  getUsers() {
    return usersModel
      .find(this.query)
      .limit(this.limit)
      .skip(this.skip)
      .select("_id name role")
      .lean()
      .exec();
  }
  getUsersCount() {
    return usersModel.find(this.query).select("-meals").count().lean().exec();
  }
};
