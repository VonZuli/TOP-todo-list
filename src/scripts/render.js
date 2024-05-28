import { savedFolders } from "../index";
import { imagepath } from "../index";
import {selectFolder, displayDeleteBtn, deleteFolder} from './folders'

export function render(){
  const foldersObj = savedFolders.map(folderItem =>{
    return folderItem.folderTitle
  });

  const folderList = document.querySelector("#folder-content > ul")
  folderList.innerHTML = ""

  foldersObj.forEach(item=>{
    const trashSVG = new Image();
    trashSVG.src = imagepath('./svg/trash.svg');
    const folderContainer = document.createElement('div')
    const counterContainer = document.createElement('div')
    const folderCounter = document.createElement("div")
    const deleteContainer = document.createElement('div')
    const animationContainer = document.createElement('div')
    const listItem = document.createElement('li')

    folderContainer.classList.add('folder-container')
    folderContainer.setAttribute('data-folder', item)
    counterContainer.classList.add('counter-container')
    animationContainer.classList.add("animation-container")
    listItem.setAttribute('data-folder', item)
    listItem.textContent = item
    deleteContainer.classList.add('delete-container')
    deleteContainer.classList.add('hovered')
    trashSVG.classList.add('deleteBtn')
    trashSVG.setAttribute('data-folder', item)
    folderCounter.classList.add('folder-counter')
    folderCounter.setAttribute('data-folder', item)
    folderCounter.textContent = 0
    
    folderList.appendChild(folderContainer)
    folderContainer.appendChild(listItem)
    folderContainer.appendChild(animationContainer)
    animationContainer.appendChild(counterContainer)
    animationContainer.appendChild(deleteContainer)
    counterContainer.appendChild(folderCounter)
    deleteContainer.appendChild(trashSVG)
  })

  //adds event listener to folder-container class elements
  selectFolder(); 
  displayDeleteBtn();
  deleteFolder();
};