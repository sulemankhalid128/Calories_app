const usersModel = require("../modals/user.modal");

module.exports = class getUserQuery {
  constructor(limit, skip, roleFilter) {
    this.limit = parseInt(limit);
    this.skip = skip;
    this.query = {};
    // if (searchFilter)
    //   this.query.name = { $regex: RegExp(`.*${searchFilter}.*`) };
    if (roleFilter) this.query.role = roleFilter;
  }
  getUsers() {
    return (
      usersModel
        // .find(this.query)
        .aggregate([
          { $match: this.query },
          { $project: { _id: 1, name: 1, role: 1 } },
          {
            $lookup: {
              from: "foodentries",
              localField: "_id",
              foreignField: "userId",
              as: "foods",
            },
          },
          { $addFields: { averageCount: { $avg: "$foods.calorie" } } },
          // { $group: { _id: null, avgValue: { $avg: "$" } } },
        ])

        .limit(this.limit)
        .skip(this.skip)
        // .select("_id name role")
        // .lean()
        .exec()
    );
  }
  getUsersCount() {
    return usersModel.find(this.query).select("-meals").count().lean().exec();
  }
};
