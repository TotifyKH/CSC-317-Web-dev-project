const checkUsername = (username) =>{
  let usernameChecker = /^\D\w{2,}$/;
  return usernameChecker.test(username);
}

const checkPassword = (password) =>{
  let passwordChecker = /^(?=.*[A-Z])(?=.*\d)(?=.*[%+!@#$^&?&*])[A-Za-z\d%+!@#$^&?&*]{8,}$/
  return passwordChecker.test(password);
}
const checkEmail = (email) =>{
  let emailChecker =/\S+@\S+\.\S+/;
  return emailChecker.test(email);
}

const registerValidator = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  if(!checkUsername(username)){
    req.flash('error', 'Invalid username!');
    req.session.save(err => {
      res.redirect('/register');
      });
  }else if(!checkPassword(password)){
    req.flash('error', 'Invalid password!');
    req.session.save(err => {
      res.redirect('/register');
      });
  }else if(!checkEmail(email)){
    req.flash('error', 'Invalid email!');
    req.session.save(err => {
      res.redirect('/register');
      });
  }else{
    next();
  }
}

const loginValidator = (req, res, next) => {
  let username = req.body.username;
  if(!checkUsername(username)){
    req.flash('error', 'Invalid username!');
    req.session.save(err => {
      res.redirect('/login');
      });
    }else{
      next();
    }
}

const checkPost = (str) =>{
  let checker =/\w{1,}$/;
  return checker.test(str);
}

const postValidator = (req, res, next) =>{
  let title = req.body.title;
  let desc = req.body.desc;
  if(!checkPost(title)){
    req.flash('error', 'Empty Title');
    req.session.save(err => {
      res.redirect('/postimage');
      });
  }else if(!checkPost(desc)){
    req.flash('error', 'Empty Description');
    req.session.save(err => {
      res.redirect('/postimage');
      });
  }else{
    next();
  }
}

module.exports = {registerValidator, loginValidator, postValidator}