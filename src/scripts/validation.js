import { addFolder } from "./folders";
import { folderArray } from "./init";

export const formValidation = () =>{
  const folderNameInput = document.querySelector("#title")
  const savedFolders = JSON.parse(localStorage.getItem("folders"));
  const errorMsg = document.querySelector("#errorMsgDisplay")

  let userInput = folderNameInput.value;

  const folderExists = savedFolders.map(folderItem =>{
    return folderItem.folderTitle
  });
 
  if (userInput === "") {
    errorMsg.style.visibility = "visible";
    errorMsg.textContent = "Folder name cannot be empty."
    return console.log("form error thrown!");
  } else if(userInput.length < 3) {
    errorMsg.style.visibility = "visible";
    errorMsg.textContent = "Folder name must be longer than 2 characters."
    return console.log("form error thrown!");
  } else if(folderExists.includes(userInput)){
    errorMsg.style.visibility = "visible";
    errorMsg.textContent = `Folder with title "${userInput}" already exists.`
    return console.log("form error thrown!");
  } else {
    folderArray.push({folderTitle:userInput, folderTaskCount:0})
    localStorage.setItem("folders", JSON.stringify(folderArray))
    document.querySelector('#new-modal').remove();
    return addFolder(userInput);
  }  
};