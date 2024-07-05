//#region imports
import { createModal as modal } from './modal'
import { imagepath } from "../index";
import { renderFolders } from "./render";
import { saveAccounts } from './saveAccounts';
import { generateId } from './generateID';
import { selectFolder, 
         displayDeleteBtn, 
         deleteFolder,
         editFolder } from './folders';
import { createElem } from "./factory";
import { registration } from './registration';
import { createHeader } from './header';
import { login } from './login';
//#endregion imports

//initialize folders array
// export let accounts;
export let userArr;

//user signs in
//access the folders object within the logged in users accounts array
//display that users folders

//this section may be deprecated in new app flow
  //solution could be to create folder and tasks sections rather than them existing in HTML file
export function initFolders(username, validLogin) {
  createHeader(username)
  const folderSVG = imagepath('./svg/folder.svg');
  const addFolderSVG = imagepath('./svg/add-folder.svg')
  const editSVG = imagepath('./svg/edit.svg');
  const deleteSVG = imagepath('./svg/delete.svg');
  const folderSection = createElem("section",{class:"folders-section"},{})
  const tasksSection = createElem("section",{class:"tasks-section"},{})

  document.querySelector(".content").appendChild(folderSection)
  document.querySelector(".content").appendChild(tasksSection)
  
  const folderId = generateId()

  folderSection.innerHTML =""

  folderSection.appendChild(
    createElem("div",{class:"container"},{},
      createElem("div",{id:"folder-subtitle"},{}, 
        createElem("img",{src:folderSVG},{},),
        createElem("h2", {},{}, "Folders")
      ),
    createElem("div",{id:"folder-content"},{},
      createElem("ul",{},{},
        createElem("div", {class:"folder-container", "data-folder": folderId},{},
          createElem("li",{"data-folder":folderId},{}, "General"),
          createElem("div",{class:"animation-container"},{},
            createElem("div", {class:"counter-container"},{},
              createElem("div",{class:"folder-counter", "data-folder": folderId},{},0)
            ),
            createElem("div", {class:"edit-container"},{},
              createElem("img",{src:editSVG},{click: editFolder})
            ),
            createElem("div", {class:'delete-container hovered'},{},
              createElem("img",{src:deleteSVG},{click:deleteFolder(folderId)})
            )
          )
        )
      )
    ), 
    createElem("button",{id:"newFolder", class:"createBtn"},{click:modal}, "Create Folder", 
      createElem("img", {src:addFolderSVG},{})
    )
    )
  )

  //adds event listeners to elements on init
  displayDeleteBtn();
  selectFolder(); 
  // deleteFolder();

  //get the accounts from localstorage
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const header = document.querySelector("header")
  //for each account in accounts
  let defaultTitle = document.querySelector(".folder-container > li").textContent
  let folderCounter = document.querySelector(".folder-counter")

  //function to push folder object to array
  function initFolderArray(accounts, username, folderId, folderTitle){
    let userAccount = accounts.find(user => user.username === username);

    userAccount.isLoggedIn = validLogin
    if (!userAccount || userAccount.folders < 1) {
      userAccount.folders = [];
      userAccount.folders.push({
        folderId, 
        folderTitle, 
        "tasks":[]
      })
      saveAccounts(accounts)
    } else {
      saveAccounts(accounts)
      renderFolders(username)
    }
  }
  initFolderArray(accounts, username, folderId, defaultTitle)

  //set logout event to login button
  let loginBtn = document.querySelector(".loginBtn"); 
  loginBtn.innerHTML = "Logout" //add SVG here
  loginBtn.removeEventListener("click", login)
  //right now this would logout any user that is flagged as logged in would need to be adjusted for real world application
  //a timeout would need to be added to logout user
  // user is not logged out on page refresh so you need to create a check for logged in users on refresh and load the correct DOM elements
  loginBtn.addEventListener("click", () =>{
    accounts.forEach(acc=>{
      if (acc.isLoggedIn === true){
        acc.isLoggedIn = false
        saveAccounts(accounts)
        console.log("Account logged out:", acc.username);
        console.log("Accounts saved to localStorage:", JSON.stringify(accounts));
      }
    })
    document.querySelector(".folders-section").remove()
    document.querySelector(".tasks-section").remove()
    initHomepage()
    username = ""
    createHeader()
  })
}
 
//initialze tasks section
export function initTasks(){
  const addTaskSVG = imagepath("./svg/add-task.svg")
  const tasksSection = document.querySelector(".tasks-section")
  const mainContent = document.querySelector(".content")
  mainContent.style.flexDirection = "row"
  mainContent.style.justifyContent = "flex-start"
  tasksSection.style.visibility = "visible"
  
  let taskHeader = document.querySelector(".active > li")
  tasksSection.innerHTML = ""
  //modify tasks subtitle h2 to display "folder name + tasks"

  tasksSection.appendChild(
    createElem("div", {class: "task-container"},{},
      createElem("div", {id: "tasks-subtitle"},{},
        createElem("h2", {},{}, `${taskHeader.textContent} Tasks`)
      ),
      createElem("div", {id:'tasks-content', "data-folder":`${taskHeader.dataset.folder}`}, {},
        createElem("ul", {},{})
      ),
      createElem("button", {id: "newTask", class: "createBtn"},{click:modal}, "Create Task", 
        createElem("img", {src:addTaskSVG})
      )
    )
  )
}

export function initHomepage(){
  let homeInit = (()=>{
  
    const content = document.querySelector(".content")
    content.removeAttribute("style")
    const foldersSection = document.querySelector(".folders-section")
    const tasksSection = document.querySelector(".tasks-section")
    const heroSection =  createElem('section',{class:"hero-section"},{})
    // const accounts = JSON.parse(localStorage.getItem("accounts"))
   
    content.innerHTML = ""

    content.appendChild(heroSection)

    let contentObj = {
      hero:{
        heroTitle: "Unlock the Magic of Productivity with ",
        heroSpan: "Arcane Assignments",
        heroContentText: "The ultimate wizardly task tracker that transforms mundane to-dos into enchanting quests!",
        heroBtn: `Join the Arcane Circle — Untether your potential!`
      },
      top:{
        contentTopTitle: "Harness the power of arcane organization",
        contentTopText: "Let your productivity soar as you navigate through your magical list of assignments and tasks. With Arcane Assignments, every task becomes an opportunity to wield your wizardly prowess. Dive into a world where each item on your to-do list transforms into a mystical quest, designed to keep you focused and motivated.",
        contentTopImg: imagepath("./jpeg/arcane-circle.png")
      },
      middle:{
        contentMidTitle: "Designed for modern-day sorcerers",
        contentMidText: "Arcane Assignments offers a spellbinding interface, mystical reminders, and an enchanting experience that makes conquering your daily tasks feel like an epic adventure.",
        contentMidImg: imagepath("./jpeg/wizard-on-horseback.jpg")
      },
      bottom:{
        contentBottomTitle: "Embark on a journey through your tasks",
        contentBottomText: "With Arcane Assignments, every task is a quest, every goal a spell to cast. Enter a realm where productivity meets magic, and let your wizardly willpower guide you to triumphant task completion.",
        contentBottomImg: imagepath("./jpeg/misty-mountains.jpeg")
      }
    }

    Object.entries(contentObj).forEach(([key, value])=>{
      key === "hero" ? heroSection.appendChild(
        createElem("div", {class: `flex-wrapper ${key}-container`},{}, 
          createElem("h1", {class:`${key}-title`},{}, value[Object.keys(value)[0]],
            createElem("br",), 
            createElem("span", {},{}, value[Object.keys(value)[1]])
          ), 
          createElem("h2", {class:`${key}-content`},{}, value[Object.keys(value)[2]]),
          createElem("button",{class:`${key}_btn`},{},value[Object.keys(value)[3]])
        ))
      :
      content.appendChild(
      createElem("div", {class: `flex-wrapper content-container content-${key}`},{}, 
        createElem("img", {class:`content-image`,src: value[Object.keys(value)[2]]},{},),
        createElem("div", {class:`flex-wrapper usp-text-container`},{},
          createElem("h3", {class:`title content-${key}`},{}, value[Object.keys(value)[0]]), 
          createElem("p", {class: `text content-${key}`},{},value[Object.keys(value)[1]])
        )
      ))
    })
    
    document.querySelector('.hero_btn').addEventListener('click', registration)
    
  })();
}