const multer = require('multer')
// const path = require("path");

const multerStorage = multer.memoryStorage()

// test for file type
const multerFilter = (req, file, cb) => {
  file.mimetype.startsWith('image')
    ? cb(null, true)
    : cb(
        new AppError('Not an image! Please upload image type file only', 400),
        false
      )
}

upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

module.exports = upload

// // Multer config
// module.exports = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//       if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error("File type is not supported"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });
