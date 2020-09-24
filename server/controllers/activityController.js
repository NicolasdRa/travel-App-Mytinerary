const Activity = require('../models/activityModel')
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} = require('./factoryHandler')

// Basic CRUD controllers
exports.getAllActivities = getAll(Activity)
exports.getActivity = getOne(Activity, { path: 'activities' })
exports.createActivity = createOne(Activity)
exports.deleteActivity = deleteOne(Activity)
exports.updateActivity = updateOne(Activity)
