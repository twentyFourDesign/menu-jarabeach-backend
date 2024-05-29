// teejay code

// controllers/image.controller.js
import { asyncHandler } from "../middlewares/index.js";
import { gfs, upload } from "../config/db.js";
import ErrorHandler from "../utils/index.js";

export const postImage = asyncHandler((req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) return next(new ErrorHandler(err.message, 500));
    res.status(201).json({ success: true, file: req.file });
  });
});

export const getImage = asyncHandler(async (req, res, next) => {
  const { filename } = req.params;
  if (!filename) return next(new ErrorHandler("Filename is required.", 400));

  gfs.files.findOne({ filename }, (err, file) => {
    if (err || !file) {
      return next(new ErrorHandler("No file found.", 404));
    }

    const readstream = gfs.createReadStream(file.filename);
    readstream.on('error', (err) => {
      return next(new ErrorHandler(err.message, 500));
    });
    readstream.pipe(res);
  });
});
