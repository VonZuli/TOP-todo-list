//#region imports
import {createModal as modal} from './modal'
import {selectFolder} from './folders'
import { imagepath } from "../index";
import { addTask } from "./tasks";
import { initArray } from "./todo"
//#endregion imports

export function initDOM(){
 
  //create folders DOM
  let folderInit = (() =>{

    const folderSVG = new Image();
    folderSVG.src = imagepath('./svg/folder.svg');
 
    //folders section declarations
    const folderSection = document.querySelector('.folders-section')
    const foldersContainer = document.createElement('div')
    const foldersSubtitleContainer = document.createElement('div')
    
    const foldersSubtitle = document.createElement('h2')
    const foldersContent = document.createElement('div')
    const folderList = document.createElement('ul')
    const newFolderBtn = document.createElement('button')
    const defaultFolder = document.createElement('div')
    const defaultListItem = document.createElement('li')
    const folderCounter = document.createElement('div')

    //create folders section
    foldersContainer.classList.add('container')

    foldersSubtitle.textContent = 'Folders'
    foldersSubtitleContainer.id = 'folder-subtitle'
    foldersContent.id = 'folder-content'

  

    defaultListItem.textContent = "General"
    let defaultName = defaultListItem.textContent

    defaultFolder.classList.add('folder-container')
    defaultFolder.setAttribute('data-folder', defaultName)

    defaultListItem.setAttribute('data-folder', defaultName)

    folderCounter.classList.add('folder-counter')
    folderCounter.setAttribute('data-folder', defaultName)
    folderCounter.textContent = 0
    
    //append folderSection
    folderSection.appendChild(foldersContainer)
    foldersContainer.appendChild(foldersSubtitleContainer)
    foldersSubtitleContainer.appendChild(folderSVG)
    foldersSubtitleContainer.appendChild(foldersSubtitle)
    foldersContainer.appendChild(foldersContent)
    foldersContent.appendChild(folderList)
    folderList.appendChild(defaultFolder)
    defaultFolder.appendChild(defaultListItem)
    defaultFolder.appendChild(folderCounter)
    
    newFolderBtn.textContent = 'Add Folder ➕'
    newFolderBtn.id = 'newFolder'
    newFolderBtn.classList.add('addBtn')
    foldersContainer.appendChild(newFolderBtn)
  })();
  
  //create tasks DOM
  let taskInit = (() => {
    //tasks section declarations
    const tasksSection = document.querySelector('.tasks-section')
    const tasksContainer = document.createElement('div')
    const tasksSubtitle = document.createElement('h2')
    const tasksSubtitleContainer = document.createElement('div')
    const tasksContent = document.createElement('div')
    const tasksList = document.createElement('ul')
    const newTaskBtn = document.createElement('button')

    //create tasks section
    tasksContainer.classList.add("container")
    tasksSubtitle.textContent = "Tasks"
    tasksSubtitleContainer.id = 'tasks-subtitle'
    tasksContent.id = 'tasks-content'

    tasksSection.appendChild(tasksContainer)
    tasksContainer.appendChild(tasksSubtitleContainer)
    tasksSubtitleContainer.appendChild(tasksSubtitle)
    tasksContainer.appendChild(tasksContent)
    tasksContent.appendChild(tasksList)
    

    newTaskBtn.textContent = 'Add Task ➕'
    newTaskBtn.id = 'newTask'
    newTaskBtn.classList.add('addBtn')
    tasksContainer.appendChild(newTaskBtn)
    
  })();



  //add event listener to form buttons that displays appropriate modal
  const formBtn = document.querySelectorAll('.addBtn');
  formBtn.forEach(btn => {
    btn.addEventListener('click', (e)=>{
      e.preventDefault()
      modal(e.target)
    })
  });
  
  //adds event listener to folder-container class elements
  selectFolder(); 
  
  return {folderInit, taskInit}
}


//initialize folders array
export let folderArray;
export function initFolderArray(){
  const savedFolders = JSON.parse(localStorage.getItem("folders"));

    if (!localStorage.getItem("folders")) {
      folderArray = new Array()

      let folderListItem = document.querySelector('[data-folder]');
      let folderTitle = folderListItem.dataset.folder

      folderArray.push({folderTitle})
      localStorage.setItem("folders", JSON.stringify(folderArray))

      return {folderArray, folderTitle}
    }else{
      folderArray = savedFolders
    }
};


//local storage structure
// folderArray.push([{folderTitle},{"tasksArray": ["task1", "task2", "task3"]}])

// localStorage.setItem("folders", JSON.stringify(folderArray))
// export function addToFolderArray(){

// }



//initialze tasks array
function initTaskArray(){
  let tasksArray;

  const savedTasks = JSON.parse(localStorage.getItem("tasks"))
  
  Array.isArray(savedTasks) ? tasksArray = savedTasks : tasksArray = new Array()
}