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
    errorMsg.innerHTML += "Minimum password length is 8 characters.</br>"
    errorMsg.innerHTML += "Password must contain 1 uppercase letter, <br> 1 lowercase letter and 1 number.<br>"
    errorMsg.innerHTML += "Password can contain special characters."
  }
}

export function registrationValidation(userInfoObj){
  const errorMsgEl = document.querySelectorAll('.error-msg')
  const errorArr = new Array().fill({"index":"","errorMsgs":[]})
 
  //loops over the object passed in the argument
  Object.entries(userInfoObj).forEach(val =>{
    //checks for leading or trailing blanks, works for emails
    const checkBlanks = ((str) => {
      const validStr =/^(?![\s-])[\w\s-@.]+$/.exec(str);
      //creates an array populated with the result of the regex test and the value that was tested and returns the array
      const blanksArr = new Array(!!validStr, val[0])
      return blanksArr
    })(val[1])

    //checks if the value returned by the checksBlanks func is FALSE
    if(!checkBlanks[0]){
      //filters the array to return every other index of FALSE values
      checkBlanks.filter((_,index) => {
        return index&1
        //maps over the index and pushes it to an array that contains inputs in error
      }).map(index =>{
        const errorMsg = "Form fields cannot contain blank spaces or be empty. </br>"
        errorArr.push({index, "errorMsgs":[errorMsg]})
        
      });
    }

    //if the string value is an email validate it, push to array if invalid
    if (val[0]==="email") {
      const validEmail = ((str)=>{
        const validEmailStr = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$/
        .exec(str)
        const notValidEmailArr = new Array(!!validEmailStr,val[0])
        return notValidEmailArr
      })(val[1]);
      
      //if the email is invalid filter over every other index returning FALSE values
      if (!validEmail[0]) {
        validEmail.filter((_,index)=>{
          return index&1
        }).map(index =>{
          //Push the values to an array along with an error message
          const errorMsg = "The email provided is not a valid email format."
          errorArr.push({index, "errorMsgs":[errorMsg]})
        })
      }
    }

    const checkLength = ((str)=>{
      const lengthArr = new Array()
      if(val[0]==="fname" || val[0]==="lname"){
        str.length < 2 || str.length > 20 ? lengthArr.push(!!str,val[0]): false
        console.log(lengthArr);
        return lengthArr
      }
      if(val[0]==="username"){
        str.length < 4 || str.length > 20 ? lengthArr.push(!!str, val[0]) : false
        console.log(lengthArr);
        return lengthArr
      }
      if(val[0]==="password"){
        str.length < 8 ? lengthArr.push(!!str,val[0]) : false
        console.log(lengthArr);
        return lengthArr
      }
      // if (val[0]==="password-confirm" && val[1]!== ){

      // }
    })(val[1]);

    if(checkLength){
      checkLength.filter((_,index)=>{
        return index&1
      }).map(index=>{
        let errorMsg = ""
        switch (index) {
          case "fname":
            errorMsg = "First name provided must be between 2 to 20 characters"
            errorArr.forEach(i=>{
              console.log(i.index);
              console.log(i);
              if (typeof i.index === undefined){
                errorArr.push({index, "errorMsgs":[errorMsg]})
              } else if(i.index === index){
                i.errorMsgs.push(errorMsg)
              }
              // typeof i.index === undefined ? errorArr.push({index, "errorMsgs":[errorMsg]}) : i.index === index ? i.errorMsgs.push(errorMsg) : 
            })
            break;
          case "lname":
            errorMsg = "Last name provided must be between 2 to 20 characters"
            errorArr.forEach(i=>{
              if (typeof i.index === undefined){
                errorArr.push({index, "errorMsgs":[errorMsg]})
              } else if(i.index === index){
                i.errorMsgs.push(errorMsg)
              }
            })
            break;
          case "username":
            errorMsg = "Username must be between 4 to 20 characters."
            errorArr.forEach(i=>{
              if (typeof i.index === undefined){
                errorArr.push({index, "errorMsgs":[errorMsg]})
              } else if(i.index === index){
                i.errorMsgs.push(errorMsg)
              }
            })
            break;
          case "password":
            errorMsg = "Minimum password length is 8 characters."
            // </br> Password must contain 1 uppercase letter,</br> 1 lowercase letter and 1 number.</br>Password can contain special characters."
            errorArr.forEach(i=>{
              if (typeof i.index === undefined){
                errorArr.push({index, "errorMsgs":[errorMsg]})
              } else if(i.index === index){
                i.errorMsgs.push(errorMsg)
              }
            })
            break;
          default:
            break;
        }
      })
    }
    //filter the errorMsgEl nodelist to search for matching data-attr
    [...errorMsgEl].filter(i=>{
      
      errorArr.forEach(element=>{
        //if element matches then return an error message
        if (element.index===i.dataset.error){
          // console.table(errorArr);
          // console.log(element.index===i.dataset.error, element.index, i.dataset.error, i);
          i.innerHTML =""
          return i.innerHTML += element.errorMsgs.join("")
        }
      })
    })
    
  }) //end of main loop
  console.log(errorArr);
}


        //regexWithoutLength = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/

        // const validPasswordLength = ((str, length = 8) =>{
        //   console.log(str);
        //   console.log(str.length < length);
        //   return str.length < length
        // })(val[1])
        // const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.exec(str)
        // validPasswordLength === true ? lengthArr.push(!!validPasswordLength, val[0]) : false
        // const notValidPWLength = new Array(!!validPasswordLength, val[0])
        // console.log(notValidPWLength);