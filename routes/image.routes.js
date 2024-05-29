// // teejay code

// // routes/image.routes.js
// import express from 'express';
// const router = express.Router();
// const { upload, gfs } = require('../config/db'); // Adjust the path as necessary

// // Route to upload image
// router.post('/add-image', upload.single('image'), (req, res) => {
//   res.status(201).json({ file: req.file });
// });

// // Route to retrieve image
// router.get('/image/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     if (!file || file.length === 0) {
//       return res.status(404).json({ message: 'No file found' });
//     }

//     const readstream = gfs.createReadStream(file.filename);
//     readstream.pipe(res);
//   });
// });

// // export default router;
// export { router as imageRoutes };


// routes/image.routes.js
import { Router } from 'express';
import { ROUTES } from '../constants/index.js';
import {
  postImage,
  getImage
} from '../controllers/image.controller.js';

const router = Router();

router.route(ROUTES.IMAGE).post(postImage);
router.route(ROUTES.IMAGE + ROUTES.FILENAME).get(getImage);

export { router as imageRoutes };
