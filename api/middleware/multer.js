const multer = require("multer");
const fs = require('fs-extra')

const storage = multer.diskStorage({
  destination: async function(req, file, cb) {
    const dir = `./uploads/${req.body.id}`;
    await fs.removeSync(dir);
    await fs.ensureDir(dir);
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter,
  storage: storage,
});