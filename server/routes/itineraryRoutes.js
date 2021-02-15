const express = require("express");
const router = express.Router();
const {
  getAllItineraries,
  getItinerary,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getItineraryByTitle,
  getCityItineraries,
  resizeCoverImg,
  uploadCoverImg,
  getItinerariesByUser,
} = require("../controllers/itineraryController");
const { protect } = require("../controllers/authController");
const activityRouter = require("../routes/activityRoutes");
const favouriteRouter = require("../routes/favouriteRoutes");

// ------------------------------------- //

// Param middleware
// router.param('id', checkID)

// ------------------------------------- //

// Nested routes
router.use("/:itineraryId/activities", activityRouter);
router.use("/:itineraryId/favourites", favouriteRouter);

// Routes
router
  .route("/")
  .get(getAllItineraries)
  .post(protect, uploadCoverImg, resizeCoverImg, createItinerary);

router
  .route("/:id")
  .get(getItinerary)
  .patch(protect, updateItinerary)
  .delete(protect, deleteItinerary);

router.route("/city/:city_name").get(getCityItineraries);
router.route("/title/:title").get(getItineraryByTitle);
router.route("/user/:userId").get(getItinerariesByUser);

module.exports = router;
