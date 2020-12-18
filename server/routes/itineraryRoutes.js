const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAllItineraries,
  getItinerary,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getCityItineraries,
} = require("../controllers/itineraryController");
const { protect } = require("../controllers/authController");
const activityRouter = require("../routes/activityRoutes");
const favouriteRouter = require("../routes/favouriteRoutes");

// ------------------------------------- //
// Middleware

// Sets up Multer Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname,
    );
  },
});

const uploadFileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("please only upload .png or .jpg files"), false);
  }
};

// Initialize upload (Multer)
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: uploadFileFilter,
});

// Param middleware
// router.param('id', checkID)

// ------------------------------------- //

// Nested routes
router.use("/:itineraryId/activities", activityRouter);
router.use("/:itineraryId/favourites", favouriteRouter);

// Routes
router.route("/").get(getAllItineraries).post(protect, createItinerary);

router
  .route("/:id")
  .get(getItinerary)
  .patch(protect, updateItinerary)
  .delete(protect, deleteItinerary);

router.route("/:city_name").get(getCityItineraries);

module.exports = router;
