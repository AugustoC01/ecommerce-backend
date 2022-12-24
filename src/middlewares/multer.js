const multer = require('multer');
const path = require('path');
const { v4: uuid } = require('uuid');

const IMG_URL = path.join(__dirname, '../public/avatars');

const storage = multer.diskStorage({
  destination: IMG_URL,
  filename: (req, file, cb) => {
    const name = uuid() + path.extname(file.originalname).toLocaleLowerCase();
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5e6 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|gif|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype & extname) return cb(null, true);
    cb('error: el archivo sebe ser una imagen');
  },
}).single('avatar');

module.exports = upload;
