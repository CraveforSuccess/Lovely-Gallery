const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose')
const ejs = require('ejs');


const app = express()
app.use(express.static(path.join(__dirname + '/public')))
app.set('view engine', 'ejs')
mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://Image_Uploader:Iamphenomenol1@cluster0.tgo6z47.mongodb.net/?retryWrites=true&w=majority");

const ImgSchema = new mongoose.Schema({
  FileData: String
})

const Img_Schema = mongoose.model('Img_Schema', ImgSchema)



const Storage = multer.diskStorage({
   destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});



const upload = multer({ storage: Storage }).single('file');

app.post('/upload', upload, function (req, res, next) {
  var imagFile = req.file.filename;
  var UploadedFile = new Img_Schema({
    FileData: imagFile
  })
  UploadedFile.save();
  res.redirect('/main')

});

app.get('/upload', (req, res) => {
  res.render('index')
})
app.get('/', (req, res) => {
  res.redirect('/upload')
})

app.get('/main', (req, res) => {
  Img_Schema.find({})
    .then((docs) => {
      console.log(docs);
      res.render('main', { ImgArr: docs })
    })
    .catch((err) => {
      console.log(err);
    })

})

app.listen(3000, () => {
  console.log("running");
})



