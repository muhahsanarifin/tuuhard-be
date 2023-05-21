const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  const extName = path.extname(file.originalname);
  const allowedExt = /jpeg|jpg|png|webp/;
  if (!allowedExt.test(extName)) {
    return cb({
      msg: "Only use allowed extension (JPEG, JPG, PNG or WEBP)",
    });
  }
  cb(null, true);
};

let limits = {
  fileSize: 204800,
};

const storage = multer.memoryStorage();

const memoryUpload = multer({
  storage: storage,
  fileFilter,
  limits,
});

const errorHandler = (err, res, next) => {
  if (err) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        data: null,
        msg: "File size it too large. Allowed file size less than equel to 200 kb",
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        data: null,
        msg: "Too many files",
      });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        data: null,
        msg: "Unexpected field",
      });
    }
  }
  next();
};

module.exports = {
  singleMemoryUpload: (fieldName) => memoryUpload.single(fieldName),
  errorHandler,
};
