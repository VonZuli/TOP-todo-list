//#region imports
import { createModal as modal } from './modal'
import { imagepath } from "../index";
import { render } from "./render";
import { saveFolders } from './saveFolders';
import { generateId } from './generateID';
import { selectFolder, 
         displayDeleteBtn, 
         deleteFolder } from './folders'
//#endregion imports

//initialize folders array
export let folderArray;

export function initDOM(){
 
  //create folders DOM
  let folderInit = (() =>{

    const folderSVG = new Image();
    const trashSVG = new Image();
    folderSVG.src = imagepath('./svg/folder.svg');
    trashSVG.src = imagepath('./svg/trash.svg');

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
    const counterContainer = document.createElement('div')
    const deleteContainer = document.createElement('div')
    const animationContainer = document.createElement('div')
    
    // const folderDelete = document.createElement('img')
    const folderCounter = document.createElement('div')
    const folderId = generateId()

    //create folders section
    foldersContainer.classList.add('container')

    foldersSubtitle.textContent = 'Folders'
    foldersSubtitleContainer.id = 'folder-subtitle'
    foldersContent.id = 'folder-content'

    defaultListItem.textContent = "General"
    let defaultName = defaultListItem.textContent

    defaultFolder.classList.add('folder-container')
    defaultFolder.setAttribute('data-folder', folderId)
    defaultListItem.setAttribute('data-folder', folderId)
    animationContainer.classList.add("animation-container")
    counterContainer.classList.add('counter-container')
    folderCounter.classList.add('folder-counter')
    folderCounter.setAttribute('data-folder', folderId)
    folderCounter.textContent = 0
    deleteContainer.classList.add('delete-container')
    deleteContainer.classList.add('hovered')
    trashSVG.classList.add('deleteBtn')
    trashSVG.setAttribute('data-folder', folderId)
    trashSVG.addEventListener('click', deleteFolder(folderId))
    
    //append folderSection
    folderSection.appendChild(foldersContainer)
    foldersContainer.appendChild(foldersSubtitleContainer)
    foldersSubtitleContainer.appendChild(folderSVG)
    foldersSubtitleContainer.appendChild(foldersSubtitle)
    foldersContainer.appendChild(foldersContent)
    foldersContent.appendChild(folderList)
    folderList.appendChild(defaultFolder)
    defaultFolder.appendChild(defaultListItem)
    defaultFolder.appendChild(animationContainer)
    animationContainer.appendChild(counterContainer)
    animationContainer.appendChild(deleteContainer)
    counterContainer.appendChild(folderCounter)
    deleteContainer.appendChild(trashSVG)
  
    newFolderBtn.textContent = 'Add Folder ➕'
    newFolderBtn.id = 'newFolder'
    newFolderBtn.classList.add('addBtn')
    foldersContainer.appendChild(newFolderBtn)
    
    function initFolderArray(folderId, folderTitle, count){
      const savedFoldersObj = JSON.parse(localStorage.getItem("folders"));
        if (!localStorage.getItem("folders")) {
          folderArray = new Array();
          folderArray.push({
            folderId, 
            folderTitle, 
            folderTaskCount:+count
          })
          saveFolders(folderArray)
        }else{
          folderArray = savedFoldersObj
          //call function to render DOM with localstorage data
          render()
        }
        
    };
    initFolderArray(folderId, defaultName, folderCounter.textContent);
    
    //adds event listeners to elements on init
    displayDeleteBtn();
    deleteFolder();
    selectFolder(); 
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
  return {folderInit, taskInit}
}





//local storage structure
// folderArray.push([{folderTitle},{"tasksArray": ["task1", "task2", "task3"]}])

//initialze tasks array
function initTaskArray(){
  let tasksArray;

  const savedTasks = JSON.parse(localStorage.getItem("tasks"))
  
  Array.isArray(savedTasks) ? tasksArray = savedTasks : tasksArray = new Array()
}