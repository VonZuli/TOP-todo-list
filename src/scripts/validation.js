//#region imports
import { isBoolean } from "lodash";
import { addFolder } from "./folders";
import { generateId } from "./generateID";
import { folderArray } from "./init";
import { isValid } from "date-fns";
//#endregion imports

export const folderValidation = () =>{
  const folderNameInput = document.querySelector("#title")
  const errorMsg = document.querySelector("#errorMsgDisplay")
  const savedFoldersObj = JSON.parse(localStorage.getItem("folders"));
  let userInput = folderNameInput.value;
  let folderTaskCount = document.querySelector('.folder-counter')
  let count = folderTaskCount.textContent
  let folderId = generateId();

  //change the lower case function to regex later
  const folderExists = savedFoldersObj.map(folderItem =>{
    return folderItem.folderTitle.toLowerCase()
  });
 
  if (userInput === "") {
    errorMsg.style.visibility = "visible";
    errorMsg.textContent = "Folder name cannot be empty."
    return console.log("form error thrown!");
  } else if(userInput.length < 3) {
    errorMsg.style.visibility = "visible";
    errorMsg.textContent = "Folder name must be longer than 2 characters."
    return console.log("form error thrown!");
  } else if(folderExists.includes(userInput.toLowerCase())){
    errorMsg.style.visibility = "visible";
    errorMsg.textContent = `Folder with title "${userInput}" already exists.`
    return console.log("form error thrown!");
  } else {
    folderArray.push({
      folderId,
      folderTitle:userInput, 
      folderTaskCount:+count
    })
    localStorage.setItem("folders", JSON.stringify(folderArray))
    document.querySelector('#new-modal').remove();
    return addFolder(userInput);
  }  
};

// this section needs to be reworked to validate the login itself not the fields
export const loginValidation = (username, password)=>{

  const errorMsg = document.querySelector('.error-msg')

  const checkUserBlanks = ((str) => {
    const validStr =/^(?![\s-])[\w\s-]+$/.exec(str);
    return !!validStr
  })(username)

  const checkPWBlanks = ((str) => {
    const validStr =/^(?![\s-])[\w\s-]+$/.exec(str);
    return !!validStr
  })(password)

  const checkPassword = ((str) => {
    const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.exec(str)
    return !!validPassword
  })(password)

  errorMsg.innerHTML = "";

  if (username === "" && password === ""){
    return errorMsg.innerHTML = "Username & Password fields cannot be empty.</br>"
  } 
  if (!checkUserBlanks) {
    return errorMsg.innerHTML += "Username field cannot be empty.</br>"
  }
  if (username.length < 3 || username.trim() < 4){
    return errorMsg.innerHTML += "Username must be at least 4 characters.</br>"
  }
  if (username.length > 24 || username.trim() > 20 ) {
    return errorMsg.innerHTML += "Username cannot exceed 20 characters.</br>"
  }
  if (!checkPWBlanks) {
    return errorMsg.innerHTML += "Password field cannot be empty.</br>"
  }
  if (!checkPassword) {
    errorMsg.innerHTML += "Minimum password length is 8 characters.</br>"
    errorMsg.innerHTML += "Password must contain 1 uppercase letter, <br> 1 lowercase letter and 1 number.<br>"
    errorMsg.innerHTML += "Password can contain special characters."
  }
}

export function registrationValidation(userInfoObj){
  // const errorMsgEl = document.querySelectorAll('.error-msg')
  // const errorArr = new Array().fill({"index":"","errorMsgs":[]})
  const errorArr = new Array()
  const errorObj = new Object()
  
  for (const key in userInfoObj) {
    const formField = key
    const isValid = "isValid"
    const userInput = "userInput"
    const errorMsgsArr = "errorMsgsArr"
    let errorMsg;
    errorObj[formField] = {}
    errorObj[formField][isValid] = true
    errorObj[formField][userInput] = userInfoObj[key]
    errorObj[formField][errorMsgsArr] = []

    // const validateFields = ((str =>{
    const checkblanks = ((str=>{
      const isValidStr =/^(?![\s-])[\w\s-@.]+$/.test(str);
      errorMsg = "Form fields cannot contain blank spaces or be empty.</br>"

      if (isValidStr === false){
        errorObj[key].isValid = isValidStr
        errorObj[key].errorMsgsArr.push(errorMsg)
      }
    }))(userInfoObj[key])

    if (key === "email"){
      const checkEmail = (str=>{
        const isValidEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$/.test(str)
        errorMsg = "The email provided is not a valid email format.</br>"

        if (isValidEmail === false){
          errorObj[formField][isValid] = isValidEmail
          errorObj[key].errorMsgsArr.push(errorMsg)
        }
      })(userInfoObj[key])
    }

    if (key === "fname" || key === "lname" || key === "username" ||  key === "password" ||  key === "password-confirm") 
    {
      const checkLength = (str =>{            
        if(key === "fname" || key === "lname"){
          
          const fnameErrorMsg = "First name provided must be between 2 to 20 characters.</br>"
          const lnameErrorMsg = "Last name provided must be between 2 to 20 characters.</br>"

          if (str.length < 2 || str.length > 20) {
            errorObj[formField][isValid] = false
            errorObj[key].errorMsgsArr.push(key === "fname" ? errorMsg = fnameErrorMsg : errorMsg = lnameErrorMsg)
          }
        }

        if (key === "username") {
          if (str.length < 3 || str.length > 24) {
            errorMsg = "Username must be between 3 to 24 characters.</br>"
            errorObj[formField][isValid] = false
            errorObj[key].errorMsgsArr.push(errorMsg)
          }
        }

        if(key === "password" || key === "password-confirm"){
          if (str.length < 8 ){
            errorMsg = "Minimum password length is 8 characters.</br>"
            errorObj[formField][isValid] = false
            errorObj[key].errorMsgsArr.push(errorMsg)
          }
        }
      })(userInfoObj[key])
    }

    if (key === "fname"|| key === "lname" || key === "username") {
      const checkSpecialChar = (str=>{
        if (key === "fname" || key === "lname") {
          const isValidName = /^[a-zA-Z]*$/.test(str)
          if (isValidName === false) {
            errorMsg = "Name must not contain numeric or special characters.</br>"
            errorObj[formField][isValid] = isValidName
            errorObj[key].errorMsgsArr.push(errorMsg)
          }
        }
        if (key === "username") {
          const isValidChar = /^[a-zA-Z0-9\.\-\_]*$/.test(str)
          const isValidSequence = /(?!.*[\.\-\_]{2})^[a-zA-Z0-9\.\-\_]/.test(str)
          if (isValidChar === false) {
            errorMsg = "Only special characters: ('.', '-', '_') are valid.</br>"
            errorObj[formField][isValid] = isValidChar
            errorObj[key].errorMsgsArr.push(errorMsg)
          }
          if (isValidSequence === false) {
            errorMsg = "Username must not have sequential special characters.</br>"
            errorObj[formField][isValid] = isValidSequence
            errorObj[key].errorMsgsArr.push(errorMsg)
          }
        }
      })(userInfoObj[key])
    }

    if (key === "password"|| key ==="password-confirm") {
      const validPassword = (str=>{
        const isValidUpper = /(?=.*[A-Z])/.test(str)
        const isValidLower = /(?=.*[a-z])/.test(str)
        const isValidDigit = /(?=.*\d)/.test(str)
        const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(str)

        if (isValidUpper === false) {
          errorMsg = "Password must contain at least 1 uppercase letter.</br>"
            errorObj[formField][isValid] = isValidUpper
            errorObj[key].errorMsgsArr.push(errorMsg)
        }
        if (isValidLower === false) {
          errorMsg = "Password must contain at least 1 lowercase letter.</br>"
          errorObj[formField][isValid] = isValidLower
          errorObj[key].errorMsgsArr.push(errorMsg)
        }
        if (isValidDigit === false) {
          errorMsg = "Password must contain at least 1 number.</br>"
          errorObj[formField][isValid] = isValidDigit
          errorObj[key].errorMsgsArr.push(errorMsg)
        }
        if (isValidPassword === false) {
          errorMsg= "Password may contain special characters.</br>"
          errorObj[formField][isValid] = isValidPassword
          errorObj[key].errorMsgsArr.push(errorMsg)
        }
        
      })(userInfoObj[key])

      const checkMatch = (() =>{
        if (userInfoObj["password"] !== userInfoObj["password-confirm"]) {
          errorMsg = "Passwords do not match.</br>"
          errorObj[formField][isValid] = false;
          errorObj[key].errorMsgsArr.push(errorMsg)
        }
      })(userInfoObj[key])
    }
  }
  
  Object.entries(errorObj).filter((data)=>{
    if (data[1].isValid === false){
      errorArr.push(data)
    }
  })

  console.log(errorArr);
  return errorArr
}