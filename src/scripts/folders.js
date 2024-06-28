//#region imports
import { imagepath } from "..";
import { createElem, createListenerElem } from "./factory";
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
        // document.querySelector(".editBtn").style.display = "none"
        // if (folderDiv.classList.contains("active")) 
        // document.querySelector(".editBtn").style.display = "flex"
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
      createElem("dialog",{class:'confirmDelete_dialog', autofocus:''},
        createElem("div",{class:'dialog-content'}, 
          createElem("div",{class:'dialogMsg-container'},
            createElem("p",{class:'deleteMsg'}, dialogText),
            createElem("span",{class:'deleteMsg_span'}, spanText)
          ),
          createElem("div",{class:'dialog-controls'},
            createElem("button",{class:'confirmDelete_btn'},"Confirm"),
            createElem("button",{class:'cancelDelete_btn'},"Cancel")
          )
        )
      ))

    document.querySelector(".confirmDelete_btn").addEventListener('mouseup', ()=>{
      document.querySelector('.confirmDelete_dialog').remove()
      removeFolder(folderToDelete)
      render()
    })
    document.querySelector(".cancelDelete_btn").addEventListener('click',()=>{
      document.querySelector('.confirmDelete_dialog').remove()
    })
  }
}
function removeFolder(folderToDelete) {
  const index = folderArray.findIndex(folder => 
    folder.folderId === folderToDelete);
    if (index > -1) {
      folderArray.splice(index, 1);
    }
  console.log(folderArray);
  // saveAccounts();
}

export function editFolder(e) {
  const editBtn = e.target;
  const folderToEdit = editBtn.dataset.folder;
  console.log(folderToEdit);
  setEditing(folderToEdit);
  render();
}
function setEditing(folderToEdit) {
  folderArray.forEach(folder=>{
    console.log(folder);
    if (folder.folderId === folderToEdit) {
      folder.isEditing = true
    }
  })
  // saveAccounts()
}

export function onUpdate(e){
const saveBtn = e.target;
const folderId = saveBtn.dataset.folder
const textbox = document.querySelector(`#edit-folderTitle-${folderId}`)
const newFolderTitle = textbox.value

updateFolder(folderId, newFolderTitle)
render();
}
function updateFolder(folderId, newFolderTitle){
  folderArray.forEach(folder=>{
    if (folder.folderId === folderId) {
      folder.folderTitle = newFolderTitle
      folder.isEditing = false;
    }
  })
  // saveAccounts()
}

//user clicks child of Folder header
function displayFolderContents(e) {
  const addTaskSVG = imagepath("./svg/add-task.svg")
  const tasksSection = document.querySelector(".tasks-section")
  const mainContent = document.querySelector(".content")
  mainContent.style.flexDirection = "row"
  mainContent.style.justifyContent = "flex-start"
  tasksSection.style.visibility = "visible"
  console.log(e);
  let taskHeader = e.textContent;
  //modify tasks subtitle h2 to display "folder name + tasks"
  tasksSection.appendChild(
    createListenerElem("div", {class: "container"},{},
      createListenerElem("div", {id: "tasks-subtitle"},{},
        createListenerElem("h2", {},{}, `${taskHeader} Tasks`)
      ),
      createListenerElem("div", {id:'tasks-content'}, {},
        createListenerElem("ul", {},{})
      ),
      createListenerElem("button", {id: "newTask", class: "createBtn"},{click:modal}, "Create Task", 
        createListenerElem("img", {src:addTaskSVG})
      )
    )
  )
}