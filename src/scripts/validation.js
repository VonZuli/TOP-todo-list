//#region imports
import { isBoolean } from "lodash";
import { addFolder } from "./folders";
import { generateId } from "./generateID";
import { folderArray } from "./init";
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
  if (username.length < 4 || username.trim() < 4){
    return errorMsg.innerHTML += "Username must be at least 4 characters.</br>"
  }
  if (username.length > 20 || username.trim() > 20 ) {
    return errorMsg.innerHTML += "Username cannot exceed 20 characters.</br>"
  }
  if (!checkPWBlanks) {
    return errorMsg.innerHTML += "Password field cannot be empty.</br>"
  }
  if (!checkPassword) {
    errorMsg.innerHTML += "Password must be longer than 8 characters.</br>"
    errorMsg.innerHTML += "Password must contain 1 uppercase letter, <br> 1 lowercase letter and 1 number.<br>"
    errorMsg.innerHTML += "Password can contain special characters."
  }
}

export function registrationValidation(userInfoObj){
  const errorMsgs = document.querySelectorAll('.error-msg')
  const errorArr = new Array()
  console.log([...errorMsgs]);
  Object.entries(userInfoObj).forEach(val =>{
    const checkBlanks = ((str) => {
      const validStr =/^(?![\s-])[\w\s-]+$/.exec(str);
      const blanksArr = new Array(!!validStr, val[0])
      return blanksArr
    })(val[1])
    
    if(!checkBlanks[0]){
      checkBlanks.filter((_,i) => {
        return i&1
      }).map(i=>{
        errorArr.push(i)
      });
    }
    
    [...errorMsgs].filter(i=>{
      if (errorArr.includes(i.dataset.error)){
        return i
      }
    }).map(i=>{
      i.innerHTML = "Fields cannot contain blank spaces."
    })
    console.log(errorArr);
  })
}

      // if (errorArr.includes(element.dataset.error)){
      //   errorMsgs.forEach(i=>{
      //     const errorMsg = document.querySelector('.error-msg')
      //     i.innerHTML = "Fields cannot contain blank spaces."
      //   })
      // };