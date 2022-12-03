const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

exports.uploadCoverImageCloudinary = (file) =>
  cloudinary.uploader.upload(file, {
    width: 1300,
    height: 800,
    aspect_ratio: '16:9',
    crop: 'fit',
  })

exports.uploadProfileImageCloudinary = (file) =>
  cloudinary.uploader.upload(file, {
    width: 300,
    aspect_ratio: '1.0',
    gravity: 'west',
    crop: 'fit',
  })
