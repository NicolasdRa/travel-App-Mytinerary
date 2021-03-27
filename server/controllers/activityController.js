const Activity = require('../models/activityModel')
const asyncErrorCatcher = require('../utils/asyncErrorCatcher')
const AppError = require('../utils/appError')

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./factoryHandler')

// Basic CRUD controllers
exports.getAllActivities = getAll(Activity)
exports.getActivity = getOne(Activity, { path: 'activities' })
exports.createActivity = createOne(Activity)
exports.deleteActivity = deleteOne(Activity)
exports.updateActivity = updateOne(Activity)

// gets ACTIVITY by title
exports.getActivityByTitle = asyncErrorCatcher(async (req, res, next) => {
  let activity = await Activity.findOne({ title: req.params.title }).populate(
    'comments'
  )

  if (!activity) {
    return next(new AppError('No document found with that title', 404))
  }

  // code below replaced by pre-middleware in model
  // const populateOptions = { path: "activities" };
  // if (populateOptions) itinerary = itinerary.populate(populateOptions);

  res.status(200).json({
    status: 'success',
    data: activity,
  })
})
