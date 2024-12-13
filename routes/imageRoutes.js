const express = require('express');
const multer = require('multer');
const { getImages, addImage, updateImage, deleteImage, updateImageSequence } = require('../controllers/imageController');

const router = express.Router();

// File Upload Handling
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.get('/', getImages);
router.post('/', upload.single('image'), addImage);
router.put('/:id', updateImage);
router.post('/sequence', updateImageSequence);
router.delete('/:id', deleteImage);

module.exports = router;
