
var userInput = document.getElementById("username");
var emailInput = document.getElementById("user-email");
var pwInput = document.getElementById("user-password");
var cfpwInput = document.getElementById("confirm-password");
var myMessage = document.getElementById("regi-message");
var myForm = document.getElementById("regi-form")

//Validation Variables
var validUsername = false;
var validEmail = false;
var validPw = false;
var validCfpw = false;

//Username Validation
var usernameReq1 = /^[A-Za-z]/;
var usernameReq2 = /[A-Za-z0-9_]{3,20}$/;
var userMsgLine1 = `<p class="invalid"> First character must be a letter</p>`;
var userMsgLine2 = `<p class="invalid"> Must contain at least 3 alphanumeric characters</p>`;
var usernameMsg = `<p> <b><em>Your Username must contain the following: </em></b><p>
                   ${userMsgLine1}
                   ${userMsgLine2}`;

setupMessageBox(userInput, "35px", "200px", usernameMsg);

userInput.onkeyup = function(){
    validUsername = true;
    if(userInput.value.match(usernameReq1)){
      userMsgLine1 =`<p class="valid"> First character must be a letter</p>`;
    }else{
      userMsgLine1 = `<p class="invalid"> First character must be a letter</p>`;
      validUsername = false;
    }

    if(userInput.value.match(usernameReq2)){
      userMsgLine2 = `<p class="valid"> Must contain at least 3 alphanumeric characters</p>`;
    }else{
      userMsgLine2 = `<p class="invalid"> Must contain at least 3 alphanumeric characters</p>`;
      validUsername = false;
    }
    usernameMsg = `<p> <b><em>Your Username must contain the following: </em></b><p>
                   ${userMsgLine1} 
                   ${userMsgLine2}`;
  myMessage.innerHTML = usernameMsg;
  setupMessageBox(userInput, "35px", "200px", usernameMsg);
  }

//Email Validation
var emailReq1 = /\S+@\S+\.\S+/;
var emailMsgLine1 = `<p class="invalid"> Must be a valid email (example@email.com)</p>`;
var emailMsg = `<p> <b><em>Your email must contain the following: </em></b><p>
                  ${emailMsgLine1}`;

setupMessageBox(emailInput, "90px", "200px", emailMsg);

emailInput.onkeyup = function(){
  validEmail = true;
  if(emailInput.value.match(emailReq1)){
    emailMsgLine1 =`<p class="valid"> Must be a valid email (example@email.com)</p>`;
  }else{
    emailMsgLine1 = `<p class="invalid"> Must be a valid email (example@email.com)</p>`;
    validEmail = false;
  }

  emailMsg = `<p> <b><em>Your email must contain the following: </em></b><p>
                  ${emailMsgLine1}`;
  myMessage.innerHTML = emailMsg;
  setupMessageBox(emailInput, "90px", "200px", emailMsg);
  
}

//Password Validation
var pwReq1 = /[A-Z]/;
var pwReq2 = /[0-9]/;
var pwReq3 = /[-%?+!@#$^&*]/;
var pwReq4 = /\S.{7,}/;
var pwMsgLine1 = `<p class="invalid"> Must contain at least one Uppercase character</p>`;
var pwMsgLine2 = `<p class="invalid"> Must contain at least one number </p>`;
var pwMsgLine3 = `<p class="invalid"> Must contain at least one special character</p>`;
var pwMsgLine4 = `<p class="invalid"> Must contain 8 characters or more</p>`;
var pwMsg = `<p> <b><em>Your password must contain the following: </em></b><p>
            ${pwMsgLine1}
            ${pwMsgLine2}
            ${pwMsgLine3}
            ${pwMsgLine4}`;

setupMessageBox(pwInput, "135px", "100px", pwMsg);

pwInput.onkeyup = function(){
  validPw = true;
  if(pwInput.value.match(pwReq1)){
    pwMsgLine1 =`<p class="valid">  Must contain at least one Uppercase character</p>`;
  }else{
    pwMsgLine1 = `<p class="invalid">  Must contain at least one Uppercase character</p>`;
    validPw = false;
  }

  if(pwInput.value.match(pwReq2)){
    pwMsgLine2 = `<p class="valid"> Must contain at least one number </p>`;
  }else{
    pwMsgLine2 = `<p class="invalid"> Must contain at least one number </p>`;
    validPw = false;
  }

  if(pwInput.value.match(pwReq3)){
    pwMsgLine3 = `<p class="valid"> Must contain at least one special character</p>`;
  }else{
    pwMsgLine3 = `<p class="invalid"> Must contain at least one special character</p>`;
    validPw = false;
  }

  if(pwInput.value.match(pwReq4)){
    pwMsgLine4 = `<p class="valid"> Must contain 8 characters or more</p>`;
  }else{
    pwMsgLine4 = `<p class="invalid"> Must contain 8 characters or more</p>`;
    validPw = false;
  }

  pwMsg = `<p> <b><em>Your password must contain the following: </em></b><p>
                  ${pwMsgLine1}
                  ${pwMsgLine2}
                  ${pwMsgLine3}
                  ${pwMsgLine4}`;
  myMessage.innerHTML = pwMsg;
  setupMessageBox(pwInput, "135px", "100px", pwMsg);
  
}

//Confirm Password Validatio
var cfpwMsgLine1 = `<p class="invalid"> Password must match</p>`;
var cfpwMsg = `<p> <b><em>Your confirm password must contain the following: </em></b><p>
                  ${cfpwMsgLine1}`;

setupMessageBox(cfpwInput, "185px", "90px", cfpwMsg);

cfpwInput.onkeyup = function(){
  validCfpw = true;
  if(cfpwInput.value == pwInput.value){
    cfpwMsgLine1 = `<p class="valid"> Password must match</p>`;
  }else{
    cfpwMsgLine1 = `<p class="invalid"> Password must match</p>`;
    validCfpw = false;
  }

  cfpwMsg = `<p> <b><em>Your confirm password must contain the following: </em></b><p>
                  ${cfpwMsgLine1}`;
  myMessage.innerHTML = cfpwMsg;
  setupMessageBox(cfpwInput, "185px", "90px", cfpwMsg);
  
}

//VALIDATE FORM
myForm.onsubmit = function(){
  if(validUsername && validEmail && validPw && validCfpw){
    alert("Registration Successful!");
    return true;
  }else{
    alert("Incomplete Requirement. Please check your information and try again.");
    return false;
  }
}

//Functions
function setupMessageBox(element,margTop, margBot, msg){
  element.onfocus = function(){
    myMessage.style.display = "block";
    myMessage.style.marginTop = margTop;
    myMessage.style.marginBottom = margBot;
    myMessage.innerHTML = msg;
  }
  element.onblur = function(){
    myMessage.style.display = "none";
  }
  
}





