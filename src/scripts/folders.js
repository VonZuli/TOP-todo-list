//#region imports
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
  const dialog = document.createElement('dialog')
  const dialogContent = document.createElement('div')
  const msgContainer = document.createElement('div')
  const text = document.createElement('p')
  const span = document.createElement('span')
  const controlContainer = document.createElement("div")
  const confirmBtn = document.createElement('button')
  const cancelBtn = document.createElement('button')
  
  dialog.classList.add('confirmDelete_dialog')
  dialog.setAttribute('autofocus', '')
  dialogContent.classList.add('dialog-content')
  msgContainer.classList.add('dialogMsg-container')
  text.classList.add('deleteMsg')
  span.classList.add('deleteMsg_span')
  controlContainer.classList.add('dialog-controls')
  confirmBtn.classList.add('confirmDelete_btn')
  confirmBtn.addEventListener('mouseup', ()=>{
    document.querySelector('.confirmDelete_dialog').remove()
    removeFolder(folderToDelete)
    render()
  })
  cancelBtn.classList.add('cancelDelete_btn')
  cancelBtn.addEventListener('click',()=>{
    document.querySelector('.confirmDelete_dialog').remove()
  })

  const dialogText = `Are you sure you want to delete the folder named ${folderTitle}?`
  const spanText = "This process is irreversible"
  text.textContent = dialogText
  span.textContent = spanText.toUpperCase()
  confirmBtn.textContent = "Confirm"
  cancelBtn.textContent = "Cancel"

  dialog.appendChild(dialogContent)
  dialogContent.appendChild(msgContainer)
  msgContainer.appendChild(text)
  msgContainer.appendChild(span)
  dialogContent.appendChild(controlContainer)
  controlContainer.appendChild(confirmBtn)
  controlContainer.appendChild(cancelBtn)
  body.appendChild(dialog)
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
