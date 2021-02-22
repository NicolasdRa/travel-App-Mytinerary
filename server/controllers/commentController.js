const Comment = require("../models/commentModel");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");

// Basic CRUD controllers
exports.getAllComments = getAll(Comment);
exports.getComment = getOne(Comment);
exports.createComment = createOne(Comment);
exports.deleteComment = deleteOne(Comment);
exports.updateComment = updateOne(Comment);

// CRUD controllers for special routes -- implement below
