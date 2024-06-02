//#region imports
import { forEach } from "lodash";
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

  const input = document.querySelectorAll('input')
  const errorMsg = document.querySelector('.error-msg')
  
  errorMsg.textContent = "";
  input.forEach(i=>{
    if (username === "" && password === ""){
      errorMsg.innerHTML = "Username & Password fields cannot be empty."
    } else if (i.type === "text") {
      switch (true) {
        case i.value === "":
          errorMsg.innerHTML += "Username field cannot be empty.</br>"
        case i.value.length < 5:
          errorMsg.innerHTML += "Username must be longer than 5 characters.</br>"
          break;
        default:
          console.log(`Process ${username}`);
          return username
      }
    } else if (i.type === "password") {
        function checkPassword(str) {
          const validPassword = new RegExp("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm")
          str.match(validPassword)
          console.log(str === validPassword);
          return !!validPassword
        }
      switch (true) {
        case i.value === "":
          errorMsg.innerHTML += "Password field cannot be empty.</br>"
          break;
        case checkPassword(i.value):
          errorMsg.innerHTML += "Password must be longer than 8 characters.</br>"
          errorMsg.innerHTML += "Must contain 1 uppercase letter, 1 lowercase letter and 1 number.<br>"
          errorMsg.innerHTML += "Can contain special characters."
          break;
        default:
          console.log(`Process ${password}`);
          return password
      }
    } else{
      console.log("wtf");
    }
  })
 }

  // switch (input.forEach(i =>{
  //   console.log(i);
  //   console.log(i.value);
  //   console.log(i.type);
  //   return i.type, i.value
  // })) {
  //   case i.type === "text" && i.value === "":
  //     console.log(username);
  //     errorMsg.textContent = "Username field cannot be empty."
  //     break;
  //     case i.type === "password" && i.value === "":
  //     console.log(password);
  //     errorMsg.textContent = "Password field cannot be empty."
  //     break;
  
  //   default:
  //     errorMsg.textContent = 'Username & Password fields cannot be empty.'
  //     break;
  // }

