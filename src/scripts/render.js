import { savedFoldersObj } from '../index';
import { imagepath } from "../index";
import {selectFolder, displayDeleteBtn, deleteFolder} from './folders'
export function render(userInput){
  console.log(userInput);
  // const foldersObj = savedFoldersObj.map(folderItem =>{
  //   return folderItem.folderTitle
  // });
  const savedFoldersObj = JSON.parse(localStorage.getItem("folders"));
  const folderList = document.querySelector("#folder-content > ul")
  folderList.innerHTML = ""

  savedFoldersObj.forEach(folder=>{
    console.log(folder);
    let folderTitle = folder.folderTitle
    const trashSVG = new Image();
    trashSVG.src = imagepath('./svg/trash.svg');
    const folderContainer = document.createElement('div')
    const counterContainer = document.createElement('div')
    const folderCounter = document.createElement("div")
    const deleteContainer = document.createElement('div')
    const animationContainer = document.createElement('div')
    const listItem = document.createElement('li')
    

    folderContainer.classList.add('folder-container')
    folderContainer.setAttribute('data-folder', folderTitle)
    listItem.setAttribute('data-folder', folderTitle)
  

    animationContainer.classList.add("animation-container")
    counterContainer.classList.add('counter-container')
    folderCounter.classList.add('folder-counter')
    folderCounter.setAttribute('data-folder', folderTitle)
    deleteContainer.classList.add('delete-container')
    deleteContainer.classList.add('hovered')
    trashSVG.classList.add('deleteBtn')
    trashSVG.setAttribute('data-folder', folderTitle)
    
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

    
  

  //adds event listener to folder-container class elements
  selectFolder(); 
  displayDeleteBtn();
  deleteFolder();
};