var express = require('express');
var router = express.Router();
var db = require('../config/database');
const {errorPrint, successPrint, requestPrint} = require('../helpers/debug/debugprinters');
const UserModel = require('../models/Users');
const UserError = require('../helpers/error/UserError');
var bcrypt = require('bcrypt');
const {registerValidator, loginValidator} = require('../middleware/validation');

/* GET users listing. */


router.post('/register', registerValidator, (req, res, next) =>{
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.cPassword;
  
  UserModel.usernameExists(username)
  .then((usernameDoesExist) =>{
   if(usernameDoesExist){
    throw new UserError(
      "Registration Failed: Username already exists",
      "/register",
      200
    );
   } else{
     return UserModel.emailExists(email);
   }
  })
  .then((emailDoesExist) => {
    if(emailDoesExist){
      throw new UserError(
        "Registration Failed: Email already exists",
        "/register",
        200
      );
    }else{
      return UserModel.create(username, password, email);
    }
  })
  .then((createdUserId) => {
    if(createdUserId < 0){
      throw new UserError(
        "Server Error, user could not be created",
        "/register",
        500
      );
    }else{
      successPrint("User.js --> User was created!!!");
      req.flash('success', 'User account has been made!');
      res.redirect('/login');
    }
  }).catch((err) => {
      errorPrint("user could not be made", err);
      if(err instanceof UserError){
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
      }else{
        next(err);
      }
  })
});


router.post("/login", loginValidator, (req, res, next) =>{
 let username = req.body.username;
 let password = req.body.password;
 /**
   * do server side validation
   * not done in video must do on our own
   */
  UserModel.authenticate(username, password)
  .then((loggedUserId) =>{
    if(loggedUserId > 0){
    successPrint(`User ${username} is logged in`);
    req.session.username = username;
    req.session.userId = loggedUserId;
    req.flash('success', 'You have been successfully logged in!');
    res.redirect("/home");
   }else{
    throw new UserError("invalid username and/or password!", "/login", 200);
   }
 })
 .catch((err) => {
   errorPrint("user login failed");
   if(err instanceof UserError){
    errorPrint(err.getMessage());
    req.flash('error', err.getMessage());
    res.status(err.getStatus());
    res.redirect('/login');
   }else{
     next(err);
   }
 })
});

router.post("/logout", (req,res,next)=>{
  req.session.destroy((err) =>{
    if(err){
      errorPrint("Session could not be destroyed.");
      next(err);
    }else{
      successPrint("Session was destroyed");
      res.clearCookie('csid');
      res.json({status: "OK", message: "User is logged out"});
    }
  })
});

module.exports = router;

