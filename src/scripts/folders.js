//#region imports
import { addTask } from "./tasks";
import { imagepath } from "../index";
import { render } from "./render";
// import { folderArray } from "./init";
//#endregion imports

export function addFolder(userInput) {

  const trashSVG = new Image();
  trashSVG.src = imagepath('./svg/trash.svg');
  const folderList = document.querySelector("#folder-content > ul")
  const folderContainer = document.createElement('div')
  const counterContainer = document.createElement('div')
  const folderCounter = document.createElement('div')
  const deleteContainer = document.createElement('div')
  const animationContainer = document.createElement('div')
  const listItem = document.createElement('li')
  
  let folderTitle = userInput
  
  trashSVG.classList.add('deleteBtn')
  trashSVG.setAttribute('data-folder', folderTitle)
  folderContainer.classList.add('folder-container')
  folderContainer.setAttribute('data-folder', folderTitle)

  counterContainer.classList.add('counter-container')
  folderCounter.classList.add('folder-counter')
  folderCounter.setAttribute('data-folder', folderTitle)
  folderCounter.textContent = 0

  
  listItem.textContent = folderTitle
  listItem.setAttribute('data-folder', folderTitle)
  
  animationContainer.classList.add("animation-container")
  deleteContainer.classList.add('delete-container')
  deleteContainer.classList.add('hovered')
  folderList.appendChild(folderContainer)
  folderContainer.appendChild(listItem)
  folderContainer.appendChild(animationContainer)
  animationContainer.appendChild(counterContainer)
  counterContainer.appendChild(folderCounter)
  animationContainer.appendChild(deleteContainer)
  deleteContainer.appendChild(trashSVG)

  //adds event listener to folder-container class elements
  selectFolder(); 
  displayDeleteBtn();
}

export function selectFolder(){
  const selectedFolder = document.querySelectorAll(".folder-container")
  selectedFolder.forEach((folderDiv)=>
    folderDiv.addEventListener('click', ()=>{
        document.querySelector(".active")?.classList.remove("active")
        folderDiv.classList.add("active")
  }))
}

export function displayDeleteBtn() {
  const hoveredEl = document.querySelectorAll('.animation-container')

  hoveredEl.forEach((el)=>{
    el.addEventListener('mouseenter', (e)=>{
      e.target.lastChild.lastChild.style.display = "flex"
    })  
  })
  hoveredEl.forEach((el)=>{
    el.addEventListener('mouseleave', (e)=>{
      e.target.lastChild.lastChild.style.display = "none"
    })
  })
}

export function deleteFolder(){
  const deleteBtn = document.querySelectorAll(".deleteBtn")
  const savedFolders = JSON.parse(localStorage.getItem("folders"))
  const folderToDelete = document.querySelectorAll('.folder-container')


  deleteBtn.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
      
      // const dataFolders = document.querySelectorAll(".folder-container")
      const storageObj = savedFolders.map(folderItem=>{
        return folderItem.folderTitle
      })
      storageObj.forEach(obj=>{
          if (obj === e.target.dataset.folder) {
            console.log(obj);
            console.log(e.target.dataset.folder);
            console.log(folderToDelete);
          } 
      })
    })
  })
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
