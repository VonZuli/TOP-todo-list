//#region imports
import { imagepath } from "../index";
import { folderArray } from "./init";
import { saveFolders } from "./saveFolders";
import { 
  selectFolder, 
  displayDeleteBtn,
  deleteFolder, 
  editFolder,
  onUpdate
} from './folders.js'
//#endregion imports  

export function render(){
  
  const folderList = document.querySelector("#folder-content > ul")
  
  folderList.innerHTML = ""

  folderArray.forEach(folder=>{

    let folderTitle = folder.folderTitle
    const deleteSVG = new Image();
    const editSVG = new Image()
    
    deleteSVG.src = imagepath('./svg/delete.svg');
    editSVG.src = imagepath('./svg/edit.svg')
    
    const folderContainer = document.createElement('div')
    const animationContainer = document.createElement('div')
    const counterContainer = document.createElement('div')
    const editContainer = document.createElement('div')
    const deleteContainer = document.createElement('div')
    const folderCounter = document.createElement("div")
    const listItem = document.createElement('li')
    const tooltipEdit = document.createElement('span')
    const tooltipDel = document.createElement('span')
    const folderId = folder.folderId

    folderContainer.classList.add('folder-container')
    folderContainer.setAttribute('data-folder', folderId)
    listItem.setAttribute('data-folder', folderId)
    
    animationContainer.classList.add("animation-container")
    counterContainer.classList.add('counter-container')
    editContainer.classList.add('edit-container')
    editContainer.classList.add('tooltip')
    tooltipEdit.classList.add('tooltipText')
    tooltipEdit.textContent = "Edit folder name" 
    deleteContainer.classList.add('delete-container')
    deleteContainer.classList.add('hovered')
    deleteContainer.classList.add('tooltip')
    tooltipDel.classList.add('tooltipText')
    tooltipDel.textContent = "Click to delete folder"
    folderCounter.classList.add('folder-counter')
    folderCounter.setAttribute('data-folder', folderId)
    editSVG.classList.add('editBtn')
    editSVG.setAttribute('data-folder', folderId)
    editSVG.setAttribute("tabindex", "0")
    editSVG.addEventListener('click', editFolder)
    deleteSVG.classList.add('deleteBtn')
    deleteSVG.setAttribute('data-folder', folderId)
    deleteSVG.setAttribute("tabindex", "1")
    deleteSVG.addEventListener('click', deleteFolder(folderId, folderTitle))
    listItem.textContent = folderTitle
    folderCounter.textContent = +0
    
    folderList.appendChild(folderContainer)
    if (folder.isEditing === true){
      const editingContainer = document.createElement('div')
      const editingTxt = document.createElement("input")
      const saveEditBtn = document.createElement("button")
      editingContainer.classList.add("editing-container")
      editingTxt.setAttribute("type","text")
      editingTxt.setAttribute("id", `edit-folderTitle-${folderId}`)
      editingTxt.setAttribute("autofocus", "")
      editingTxt.classList.add("editFolderInput")
      editingTxt.focus()
      editingTxt.select()
      saveEditBtn.classList.add("saveEditBtn")
      editingTxt.setAttribute("value", folderTitle)
      saveEditBtn.setAttribute("data-folder", folderId)
      saveEditBtn.textContent = "Save?"
      saveEditBtn.id = folderId;
      saveEditBtn.addEventListener('click', onUpdate)
      folderContainer.appendChild(editingContainer)
      editingContainer.appendChild(editingTxt)
      editingContainer.appendChild(saveEditBtn)
     
    }else{
      folderContainer.appendChild(listItem)
    }
    folderContainer.appendChild(animationContainer)
    animationContainer.appendChild(counterContainer)
    animationContainer.appendChild(editContainer)
    animationContainer.appendChild(deleteContainer)
    counterContainer.appendChild(folderCounter)
    editContainer.appendChild(tooltipEdit)
    editContainer.appendChild(editSVG)
    deleteContainer.appendChild(tooltipDel)
    deleteContainer.appendChild(deleteSVG)
  })

  //adds event listener to folder-container new class elements
  selectFolder(); 
  displayDeleteBtn();
  
  saveFolders();
};