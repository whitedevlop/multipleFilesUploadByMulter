const express = require("express");

const multer = require("multer");

const path = require("path");

const app = express();

app.set("view engine", "ejs");

const PORT = process.env.PORT || 5000;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: storage });

var multipleUpload = upload.fields([
  { name: "file1" },
  { name: "file2", maxCount: 3 },
]);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/uploadfile", multipleUpload, (req, res) => {
  if (req.files) {
    console.log("files upload");
    console.log(req.files);
    res.render("index");
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
