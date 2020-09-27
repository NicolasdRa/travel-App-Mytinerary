const User = require('../models/userModel')
const asyncErrorCatcher = require('../utils/asyncErrorCatcher')
const AppError = require('../utils/appError')
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} = require('./factoryHandler')

// Basic CRUD controllers admin
exports.getAllUsers = getAll(User)
exports.getUser = getOne(User)
exports.createUser = createOne(User)
exports.deleteUser = deleteOne(User)
exports.updateUser = updateOne(User)

// current user controllers
// middleware to get current user on /me route
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id
  next()
}

exports.updateMe = asyncErrorCatcher(async (req, res, next) => {
  // 1) create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not meant to update passwords. Please use: /updatePassword.',
        400
      )
    )
  }

  // 2) filter fields to be updated
  const filteredBody = filterObj(req.body, 'userName', 'email')

  // 3) if file upload, add photo property to filteredBody
  if (req.file) filteredBody.photo = req.file.filename

  // 4) update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })
})

exports.deleteMe = asyncErrorCatcher(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })

  res.status(204).json({
    status: 'success',
    data: null
  })
})
