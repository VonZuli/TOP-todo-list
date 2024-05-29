//#region imports
import { imagepath } from "../index";
import { folderArray } from "./init";
//#endregion imports  

export function render(){
    
  const savedFoldersObj = JSON.parse(localStorage.getItem("folders"));
  const folderList = document.querySelector("#folder-content > ul")
  
  folderList.innerHTML = ""

  savedFoldersObj.forEach(folder=>{
    
    let folderTitle = folder.folderTitle
    const trashSVG = new Image();
    trashSVG.src = imagepath('./svg/trash.svg');
    const folderContainer = document.createElement('div')
    const counterContainer = document.createElement('div')
    const folderCounter = document.createElement("div")
    const deleteContainer = document.createElement('div')
    const animationContainer = document.createElement('div')
    const listItem = document.createElement('li')
    
    const folderId = folder.folderId
    
    folderContainer.classList.add('folder-container')
    folderContainer.setAttribute('data-folder', folderId)
    listItem.setAttribute('data-folder', folderId)
  
    animationContainer.classList.add("animation-container")
    counterContainer.classList.add('counter-container')
    folderCounter.classList.add('folder-counter')
    folderCounter.setAttribute('data-folder', folderId)
    deleteContainer.classList.add('delete-container')
    deleteContainer.classList.add('hovered')
    trashSVG.classList.add('deleteBtn')
    trashSVG.setAttribute('data-folder', folderId)
    
    listItem.textContent = folderTitle
    folderCounter.textContent = +0
    
    folderList.appendChild(folderContainer)
    folderContainer.appendChild(listItem)
    folderContainer.appendChild(animationContainer)
    animationContainer.appendChild(counterContainer)
    animationContainer.appendChild(deleteContainer)
    counterContainer.appendChild(folderCounter)
    deleteContainer.appendChild(trashSVG)
  })
};