const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserImg,
  resizeUserImg,
  uploadCoverImg,
  resizeCoverImg,
  updateCoverImg,
} = require("../controllers/userController");
const { protect, restrict } = require("../controllers/authController");
const favouriteRouter = require("../routes/favouriteRoutes");

const router = express.Router({ mergeParams: true });

// Nested routers
router.use("/:userId/favourites", favouriteRouter);

// protects ruotes below this point
router.use(protect);

router.route("/me").get(getMe, getUser);
router.patch("/updateMe", uploadUserImg, resizeUserImg, updateMe);
router.patch("/updateCover", uploadCoverImg, resizeCoverImg, updateCoverImg);

router.delete("/deleteMe", deleteMe);

// admin routes
router.route("/").get(getAllUsers).post(restrict("admin"), createUser);

router
  .route("/:id")
  .get(getUser)
  .patch(restrict("admin"), updateUser)
  .delete(restrict("admin"), deleteUser);

module.exports = router;
