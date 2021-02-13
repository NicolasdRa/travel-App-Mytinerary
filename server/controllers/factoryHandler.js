const asyncErrorCatcher = require("../utils/asyncErrorCatcher");
const AppError = require("../utils/appError");
const APIfeatures = require("./../utils/apiFeatures");

exports.deleteOne = (Model) =>
  asyncErrorCatcher(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(
          "Cannot delete document, no document found with that ID",
          404,
        ),
      );
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  asyncErrorCatcher(async (req, res, next) => {
    console.log("from factory handler update one", req.body);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError(
          "Cannot update document, no document found with that ID",
          404,
        ),
      );
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.createOne = (Model) =>
  asyncErrorCatcher(async (req, res, next) => {
    // 1. create body from request
    const body = { ...req.body };

    // 2. if file upload add filename to body const
    if (req.file) body.img = req.file.filename;

    const newDoc = await Model.create(body);

    res.status(201).json({
      status: "success",
      data: {
        data: newDoc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  asyncErrorCatcher(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.getAll = (Model) =>
  asyncErrorCatcher(async (req, res, next) => {
    // creates filter object for nested routes
    let filter = {};
    if (req.params.itineraryId) filter = { itinerary: req.params.itineraryId };
    if (req.params.userId) filter = { user: req.params.userId };

    const features = new APIfeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();

    // const docs = await features.query.explain()
    const docs = await features.query;

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: docs,
    });
  });
