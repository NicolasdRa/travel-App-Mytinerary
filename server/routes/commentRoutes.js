const express = require("express");
const router = express.Router();
const {
  getAllComments,
  getComment,
  getCommentsForItinerary,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const { protect, restrict } = require("../controllers/authController");

// ------------------------------------- //

// // Nested routes
// router.use("/:itineraryId/comments", commentRouter);

// ROUTES

router.route("/").get(getAllComments).post(protect, createComment);

router
  .route("/:id")
  .get(getComment)
  .patch(protect, updateComment)
  .delete(protect, restrict("admin"), deleteComment);

// router.route("/itinerary/:title").get(getCommentsForItinerary);

module.exports = router;
