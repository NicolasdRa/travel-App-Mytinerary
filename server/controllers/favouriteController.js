const Favourite = require("../models/favouriteModel");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");

// Basic CRUD controllers
exports.getAllFavourites = getAll(Favourite);
exports.getFavourite = getOne(Favourite, { path: "favourites" });
exports.addFavourite = createOne(Favourite);
exports.deleteFavourite = deleteOne(Favourite);
exports.updateFavourite = updateOne(Favourite);
