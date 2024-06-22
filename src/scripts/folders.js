//#region imports
import { createElem } from "./factory";
import { folderArray } from "./init";
import { render } from "./render";
import { saveFolders } from "./saveFolders"
//#endregion imports

export function addFolder() {
  console.log(folderArray);
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
            createElem("p", {class:'deleteMsg'}, dialogText),
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
  saveFolders();
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
  saveFolders()
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
  saveFolders()
}

//user clicks child of Folder header
function displayFolderContents(e) {
  const tasksSection = document.querySelector(".tasks-section")
  tasksSection.style.visibility = "visible"
  let taskHeader = e.target.firstChild.textContent;
  //modify tasks subtitle h2 to display "folder name + tasks"
  const tasksSubtitle = document.querySelector("#tasks-subtitle > h2")
  tasksSubtitle.textContent = `${taskHeader} Tasks`
}
