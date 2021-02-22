const User = require("../models/userModel");
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

// Basic CRUD controllers admin
exports.getAllUsers = getAll(User);
exports.getUser = getOne(User);
exports.createUser = createOne(User);
exports.deleteUser = deleteOne(User);
exports.updateUser = updateOne(User);

// current user controllers

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

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserImg = upload.single("img");
exports.uploadCoverImg = upload.single("coverImg");

// img resize middleware
exports.resizeUserImg = asyncErrorCatcher(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `userProfile-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/${req.file.filename}`);

  next();
});

exports.resizeCoverImg = asyncErrorCatcher(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `userCover-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(1300, 800)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/${req.file.filename}`);

  next();
});

// middleware to get current user on /me route
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const filterObj = (obj, ...allowedFields) => {
  filteredObj = {};
  Object.keys(obj).forEach((item) => {
    if (allowedFields.includes(item)) filteredObj[item] = obj[item];
  });
  return filteredObj;
};

exports.updateMe = asyncErrorCatcher(async (req, res, next) => {
  // 1) create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not meant to update passwords. Please use: /updatePassword.",
        400,
      ),
    );
  }

  // 2) filter fields to be updated
  const filteredBody = filterObj(
    req.body,
    "userName",
    "firstName",
    "lastName",
    "details",
    "email",
  );

  // 3) if file upload, add photo property to filteredBody
  if (req.file) filteredBody.img = req.file.filename;

  // 4) update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

// updates User Profile Cover Image
exports.updateCoverImg = asyncErrorCatcher(async (req, res, next) => {
  // 1) create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not meant to update passwords. Please use: /updatePassword.",
        400,
      ),
    );
  }

  // 2) filter fields to be updated
  const filteredBody = filterObj(
    req.body,
    "userName",
    "firstName",
    "lastName",
    "details",
    "email",
  );

  // 3) if file upload, add photo property to filteredBody
  if (req.file) filteredBody.coverImg = req.file.filename;

  // 4) update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.deleteMe = asyncErrorCatcher(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
