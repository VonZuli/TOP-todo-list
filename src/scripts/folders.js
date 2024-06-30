//#region imports
import { imagepath } from "..";
import { createElem } from "./factory";
import { createModal as modal }  from "./modal";
// import { folderArray } from "./init";
import { render } from "./render";
import { saveAccounts } from "./saveAccounts"
import { addTask } from "./tasks";
//#endregion imports

export function addFolder() {
  
  render();
}

export function selectFolder(){
  const selectedFolder = document.querySelectorAll(".folder-container")
  selectedFolder.forEach((folderDiv)=>
    folderDiv.addEventListener('click', (e)=>{
      e.preventDefault()
      document.querySelector(".active")?.classList.remove("active")
      folderDiv.classList.add("active")
      let folderTitle = document.querySelector("li[data-folder]")
      displayFolderContents(folderTitle);
    })
  )
}

export function displayDeleteBtn() {
  const hoveredEl = document.querySelectorAll('.animation-container')

  hoveredEl.forEach((el)=>{
    el.addEventListener('mouseenter', (e)=>{
      e.target.lastChild.lastChild.style.display = "flex"
      e.target.lastChild.lastChild.style.marginLeft = "1px"
    })  
  })
  hoveredEl.forEach((el)=>{
    el.addEventListener('mouseleave', (e)=>{
      e.target.lastChild.lastChild.style.display = "none"
      e.target.lastChild.lastChild.style.margin = "0"
    })
  })
}

export const deleteFolder = (folderToDelete, folderTitle)=>{
  return () => {
    handleDelete();
  }
  function handleDelete(){
    const body = document.querySelector('body')
    const dialogText = `Are you sure you want to delete the folder named ${folderTitle}?`
    const spanText = "This process is irreversible"
    body.appendChild(
      createElem("dialog",{class:'confirmDelete_dialog', autofocus:''}, {},
        createElem("div",{class:'dialog-content'}, {},
          createElem("div",{class:'dialogMsg-container'},{},
            createElem("p",{class:'deleteMsg'},{}, dialogText),
            createElem("span",{class:'deleteMsg_span'},{},spanText)
          ),
          createElem("div",{class:'dialog-controls'},{},
            createElem("button",{class:'confirmDelete_btn'},{mouseup: confirmDelete},"Confirm"),
            createElem("button",{class:'cancelDelete_btn'},{click:cancelDelete},"Cancel")
          )
        )
      ))

   function confirmDelete(){
      document.querySelector('.confirmDelete_dialog').remove()
      removeFolder(folderToDelete)
      document.querySelector(".task-container").remove()
      render()
    }
    function cancelDelete(){
      document.querySelector('.confirmDelete_dialog').remove()
    }
  }
}

function removeFolder(folderToDelete) {

  const accounts = JSON.parse(localStorage.getItem("accounts"));

  accounts.forEach(acc=>{
    if (acc.isLoggedIn === true){
      const index = acc.folders.findIndex(folder => folder.folderId === folderToDelete)
      if (index > -1) {
        acc.folders.splice(index, 1);
      }
      saveAccounts(accounts);
    }
  })
}

export function editFolder(e) {
  const editBtn = e.target;
  const folderToEdit = editBtn.dataset.folder;
  setEditing(folderToEdit);
  render();
}
function setEditing(folderToEdit) {
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  accounts.forEach(acc=>{
    if (acc.isLoggedIn === true){
      acc.folders.forEach(folder=>{
        if(folder.folderId === folderToEdit){
          folder.isEditing = true
        }
      })

      saveAccounts(accounts)
    }
  })
}

export function onUpdate(e){
const saveBtn = e.target;
const folderId = saveBtn.dataset.folder
const textbox = document.querySelector(`#edit-folderTitle-${folderId}`)
const tasksSection = document.querySelector(".tasks-section")
const newFolderTitle = textbox.value
if (tasksSection.style.visibility === "visible"){
  document.querySelector("#tasks-subtitle > h2").textContent = `${newFolderTitle} Tasks`
}
updateFolder(folderId, newFolderTitle)
render();
}

function updateFolder(folderId, newFolderTitle){
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  accounts.forEach(acc=>{
    if (acc.isLoggedIn === true) {
      console.log(acc);
      acc.folders.forEach(folder=>{
        if(folder.folderId === folderId){
          folder.folderTitle = newFolderTitle
          folder.isEditing = false
        }
      })
      saveAccounts(accounts)
    }
  })
}

//user clicks child of Folder header
function displayFolderContents(e) {
  const addTaskSVG = imagepath("./svg/add-task.svg")
  const tasksSection = document.querySelector(".tasks-section")
  const mainContent = document.querySelector(".content")
  mainContent.style.flexDirection = "row"
  mainContent.style.justifyContent = "flex-start"
  tasksSection.style.visibility = "visible"
  let taskHeader = document.querySelector(".active > li").textContent
  tasksSection.innerHTML = ""
  //modify tasks subtitle h2 to display "folder name + tasks"
  tasksSection.appendChild(
    createElem("div", {class: "task-container"},{},
      createElem("div", {id: "tasks-subtitle"},{},
        createElem("h2", {},{}, `${taskHeader} Tasks`)
      ),
      createElem("div", {id:'tasks-content'}, {},
        createElem("ul", {},{})
      ),
      createElem("button", {id: "newTask", class: "createBtn"},{click:modal}, "Create Task", 
        createElem("img", {src:addTaskSVG})
      )
    )
  )
}