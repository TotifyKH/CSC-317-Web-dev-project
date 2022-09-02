var express = require('express');
var router = express.Router();
var db = require('../config/database');
const {errorPrint, successPrint, requestPrint} = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostModel = require("../models/Posts");
var PostError = require('../helpers/error/PostError');
const {postValidator} = require('../middleware/validation');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,"public/uploads");
  },
  filename: function(req, file, cb){
    let fileExt = file.mimetype.split('/')[1];
    let randomName = crypto.randomBytes(22).toString("hex");
    cb(null, `${randomName}.${fileExt}`);
  }
})

var uploader = multer({storage: storage});

router.post('/createPost', postValidator, uploader.single('uploadImage'), (req, res, next) =>{
  let fileUploaded = req.file.path;
  let fileAsThumbnail = `thumbnail-${req.file.filename}`;
  let destinationOfThumbnail = req.file.destination + '/' + fileAsThumbnail;
  let title = req.body.title;
  let description = req.body.description;
  let fk_userId = req.session.userId;

  /**
   * do server validation on your own
   */
  sharp(fileUploaded)
  .resize(250)
  .toFile(destinationOfThumbnail)
  .then(() => {
    return PostModel.create(
      title, description, fileUploaded, destinationOfThumbnail, fk_userId
    )
  })
    .then((postwasCreated) =>{
      if(postwasCreated){
        req.flash('success', 'Your post was created successfully!');
        res.redirect('/');
      }else{
        throw new PostError('Post could not be created', '/postimage',200);
      }
    })
    .catch((err) =>{
      if(err instanceof PostError){
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL);
      }else{
        next(err);
      }
    })
})

router.get('/search', (req, res, next) =>{
  let searchTerm = req.query.search;
  if(!searchTerm){
    res.send({
      resultsStatus: "info",
      message: "No search term given",
      results: []
    })
  }else{
    PostModel.search(searchTerm)
    .then((results) =>{
      if(results && results.length){
        res.send({
          resultsStatus: 'info',
          message: `${results.length} results found`,
          results: results
        })
      }else{
        let results = PostModel.getRecentPosts(8)
        .then((results) =>{
          res.send({
            resultsStatus: 'info',
            message: 'No results were found. Here are the 8 most recents posts',
            results: results
          });
        })
      }
    })
    .catch((err) => next(err))
  }
})

module.exports = router;