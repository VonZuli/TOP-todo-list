//#region imports
import { addFolder } from "./folders";
import { generateId } from "./generateID";
import { initFolders, initHomepage } from "./init";
import { login } from "./login";
import { createElem } from "./factory";
import { saveAccounts } from "./saveAccounts";
import { addTask } from "./tasks";

// import { bcrypt } from "..";
//#endregion imports

export const folderValidation = () =>{
  
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const folderNameInput = document.querySelector("#title")
  const errorMsg = document.querySelector("#errorMsgDisplay")
  
  let userInput = folderNameInput.value;
  let folderId = generateId();


  //change the lower case function to regex later
  const folderExists = accounts.map(acc =>{
    acc.folders.map(folder=>{
      return folder.folderTitle.toLowerCase()
    })
  });
 
  if (userInput === "") {
    errorMsg.style.visibility = "visible";
    errorMsg.textContent = "Folder name cannot be empty."
    return
  }
  if(userInput.length < 3) {
    errorMsg.style.visibility = "visible";
    errorMsg.textContent = "Folder name must be longer than 2 characters."
    return
  }
  
  //this is broken
  if(folderExists.includes(userInput.toLowerCase())){
    errorMsg.style.visibility = "visible";
    errorMsg.textContent = `Folder with title "${userInput}" already exists.`
    return
  }

  accounts.forEach(acc=>{
    if (acc.isLoggedIn === true) {
      acc.folders.push({
        folderId, 
        folderTitle:userInput,
        "tasks":[]
      })
      saveAccounts(accounts)
    }
  })
  document.querySelector('#new-modal').remove();
  return addFolder(userInput);
};

export const taskValidation = (e)=>{
  e.preventDefault()
  let taskInputs = document.querySelectorAll("input")
  let radioInputs = document.querySelectorAll("input[type=radio]")
  const errorMsg = document.querySelector("#errorMsgDisplay")


  const textInputEmpty = Array.from(taskInputs).some(input => input.type !=="radio" && input.value === "");

  if (textInputEmpty) {
    errorMsg.style.visibility = "visible";
    errorMsg.textContent += "Input fields cannot be empty."
    return
  }

  const isRadioChecked = Array.from(radioInputs).some(radio=> radio.checked);
  if (!isRadioChecked) {
    errorMsg.style.visibility = "visible";
    errorMsg.textContent = "Please select a priority level for your task."
    return
  }

  let taskObj = {}
  let taskId = generateId()
  let taskTitle;
  let taskDesc;
  let taskPriority;
  let taskDueDate;
  let completed = false;

  taskInputs.forEach(input=>{
    if (input.type === "text"){
      input.id === "title" ? 
      taskTitle = input.value : taskDesc = input.value
      Object.assign(taskObj, {taskTitle}, {taskDesc})
    }

    if(input.type === "radio"){
      if(input.checked === true){
        taskPriority = input.value
        Object.assign(taskObj, {taskPriority})
      }
    }

    if (input.type === "date") {
      taskDueDate = input.value;
      Object.assign(taskObj, {taskDueDate})
    }
  })

  Object.assign(taskObj, {taskId, completed})

  return addTask(taskObj)
}

export const loginValidation = (username, password)=>{

  const errorMsg = document.querySelector('.error-msg')
  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  errorMsg.innerHTML = "";
  
  if (username === "" || password === ""){
    errorMsg.innerHTML = "Username & Password fields cannot be empty.</br>"
    return
  }

  let validLogin = false
  let userAcc;
  accounts.forEach(acc=>{
    if (username === acc.username && password === acc.password){
      validLogin = true;
      userAcc = acc;
    }
  })

  if (!validLogin){
   errorMsg.innerHTML = `Username does not exist or</br> password is incorrect.`
   return
  }
 
  let dialog = document.querySelector(".login_dialog")
  console.log(`Signing in... ${username}`);
  dialog.remove()

  const section = document.querySelector("section")
  if (section.className === "hero-section") {
    const heroSection = document.querySelector(".hero-section")
    const contentContainer = document.querySelectorAll('.content-container')
    heroSection.remove()
    contentContainer.forEach(i=>{
      i.remove()
    })
  }else if (section.className === "registration_section"){
    const regSection = document.querySelector(".registration_section")
    regSection.remove()
  }

  //move user to their profile
  initFolders(username, validLogin)
  // localStorage.setItem("accounts", JSON.stringify(accounts))
}

export function registrationValidation(userInfoObj){
  let errorArr = new Array()
  let errorObj = new Object()
  
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
      if (key === "password" || key === "password-confirm") {
        return;
      }
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
          const isValidName = /^[a-zA-Z\-]*$/.test(str)
          if (isValidName === false) {
            errorMsg = "Name cannot contain blanks, numeric or special characters.</br>"
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
        const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(str)

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

    if (key==="email" || key === "username"){
      const checkUserExists = ((str)=>{
        const accounts = JSON.parse(localStorage.getItem("accounts"));
        if (key === "email" && accounts) {
          const emailUnavailable = accounts.find(account => account.email === str)
          if (emailUnavailable) {
            errorMsg = `"${str}" is already associated with an account.` 
            errorObj[formField][isValid] = false
            errorObj[key].errorMsgsArr.push(errorMsg)
          }
        }

        if (key === "username" && accounts) {
          const usernameUnavailable = accounts.find(account => account.username.toLowerCase() === str.toLowerCase())
          if (usernameUnavailable) {
            errorMsg = `The username "${str}" is taken. Please select another username.` 
            errorObj[formField][isValid] = false
            errorObj[key].errorMsgsArr.push(errorMsg)
          }
        }
      })(userInfoObj[key])
    }

  }
  
  Object.entries(errorObj).filter((data)=>{
    if (data[1].isValid === false){
      errorArr.push(data)
    }
  })
  const displayErrors = (() =>{
    const errorMsgDisplay = document.querySelectorAll(".error-msg");
    const formField = document.querySelectorAll("input");

    formField.forEach(i=>{
      i.classList.remove("error")
    });

    [...formField].filter(elem =>
      elem.type === "text" || elem.type==="password" || elem.type==="email");
      
    [...errorMsgDisplay].forEach(el =>{
      el.innerHTML = ""
      
      errorArr.forEach(i=>{
        if (i[0]===el.dataset.error) {
          el.innerHTML += i[1].errorMsgsArr.join("")
        }
        [...formField].forEach(input=>{
          if (i[0] === input.dataset.error) {
            input.classList.add("error")
          }
        })
      })
    }); 
  })(errorArr)
  console.log(`Error message array has ${errorArr.length} errors`, errorArr);

  if (errorArr.length === 0){
    const errorMsgDisplay = document.querySelectorAll(".error-msg");
    const userFolders = {"folders":[]};
    const isLoggedIn = {"isLoggedIn": false}
    errorMsgDisplay.forEach(err =>{
      err.innerHTML = ""
    })
    
    let savedUsersObj = JSON.parse(localStorage.getItem("accounts"));
    let userArr = savedUsersObj ? savedUsersObj : [];
    Object.assign(userInfoObj, userFolders, isLoggedIn)
    userArr.push(userInfoObj)
    localStorage.setItem("accounts", JSON.stringify(userArr))
    document.querySelector("body").appendChild(
      createElem("dialog",{class: "confirm-reg"},{},
        createElem("p", {class: "confirm-reg-msg"},{}, `Account created — Redirecting to login screen...`)
        //add animation here
      ))
    setTimeout(() => {
      document.querySelector('.confirm-reg').remove()
      initHomepage()
      login()
    }, 3000);
  }

}


