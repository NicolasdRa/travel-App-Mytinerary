const jwt = require('jsonwebtoken')
const User = require('../../models/userModel')

const auth = async (req, res, next) => {
  if (!req.header('Authorization'))
    return res.status(401).send('Access denied, no credentials')

  const token = req.header('Authorization').replace('Bearer ', '')

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: data._id, 'tokens.token': token })
    req.user = user
    req.token = token
    next()
  } catch (err) {
    res.status(400).send('Invalid credentials to access this resource')
  }
}
module.exports = auth
