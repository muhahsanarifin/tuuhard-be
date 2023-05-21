const DatauriParser = require("datauri/parser");
const path = require("path");
const cloudinary = require("../configs/cloudinary");

const uploads = async (name, folder, req, res, next) => {
  if (!req.file) return next();
  const parser = new DatauriParser();
  const ext = path.extname(req.file.originalname).toString();
  const datauri = parser.format(ext, req.file.buffer);
  const fileName = name.includes(" ")
    ? name.toLowerCase().split(" ").join("-")
    : name.toLowerCase();
  const cloudinaryOpt = {
    public_id: fileName,
    folder: folder,
  };
  try {
    const result = await cloudinary.uploader.upload(
      datauri.content,
      cloudinaryOpt
    );
    req.file = result;
    next();
  } catch (error) {
    res.status(error).json({
      msg: "Internet server error",
    });
  }
};

module.exports = uploads;
