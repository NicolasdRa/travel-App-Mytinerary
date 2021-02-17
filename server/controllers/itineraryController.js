const Itinerary = require("../models/itineraryModel");
const asyncErrorCatcher = require("../utils/asyncErrorCatcher");
const AppError = require("../utils/appError");
const multer = require("multer");
const sharp = require("sharp");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");

// Basic CRUD controllers
exports.getAllItineraries = getAll(Itinerary);
exports.getItinerary = getOne(Itinerary, { path: "activities" });
exports.createItinerary = createOne(Itinerary);
exports.deleteItinerary = deleteOne(Itinerary);
exports.updateItinerary = updateOne(Itinerary);

// CRUD controllers for custom routes -- still to refactor

// gets ITINERARIES for a given city
exports.getCityItineraries = asyncErrorCatcher(async (req, res, next) => {
  const itineraries = await Itinerary.find({ city: req.params.city_name });
  res.status(200).json({
    status: "success",
    data: { itineraries },
  });
  if (!itineraries) {
    return next(new AppError("No documents found", 404));
  }
  res.status(200).json({
    status: "success",
    results: itineraries.length,
    data: itineraries,
  });
});

// gets ITINERARIES by userId
exports.getItinerariesByUser = asyncErrorCatcher(async (req, res, next) => {
  const itineraries = await Itinerary.find({ author: req.params.user });
  console.log(req.params);

  if (!itineraries) {
    return next(new AppError("No documents found", 404));
  }
  res.status(200).json({
    status: "success",
    results: itineraries.length,
    data: itineraries,
  });
});

// gets ITINERARY by title
exports.getItineraryByTitle = asyncErrorCatcher(async (req, res, next) => {
  let itinerary = await Itinerary.findOne({ title: req.params.title });

  if (!itinerary) {
    return next(new AppError("No document found with that title", 404));
  }

  const populateOptions = { path: "activities" };
  if (populateOptions) itinerary = itinerary.populate(populateOptions);

  res.status(200).json({
    status: "success",
    data: itinerary,
  });
});

// multer middleware set up - upload images
const multerStorage = multer.memoryStorage();

// test for file type
const multerFilter = (req, file, cb) => {
  file.mimetype.startsWith("image")
    ? cb(null, true)
    : cb(
        new AppError("Not an image! Please upload image type file only", 400),
        false,
      );
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCoverImg = upload.single("img");

// img resize middleware
exports.resizeCoverImg = asyncErrorCatcher(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `cover-itinerary${req.body.title}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(1300, 800)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/${req.file.filename}`);

  next();
});
