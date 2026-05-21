const express = require("express");
const multer = require("multer");

const router = express.Router();

// Previous insecure upload configuration accepted unrestricted file types
// const upload = multer({
//   dest: "uploads/",
// });

// Secure upload configuration with MIME type validation
const upload = multer({
  dest: "uploads/",

  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

router.post("/kyc", upload.single("document"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    file: req.file,
  });
});

module.exports = router;
