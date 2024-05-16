//#region imports
import {createModal as modal} from './modal'
//#endregion imports
export function createToDoList(){
  
  //folders section declarations
  const folderSection = document.querySelector('.folders-section')
  const folderContainer = document.createElement('div')
  const folderSubtitle = document.createElement('h2')
  const folderSubtitleContainer = document.createElement('div')
  const folderContent = document.createElement('div')
  const folderList = document.createElement('ul')
  const newFolderBtn = document.createElement('button')
  
  //tasks section declarations
  const tasksSection = document.querySelector('.tasks-section')
  const tasksContainer = document.createElement('div')
  const tasksSubtitle = document.createElement('h2')
  const tasksSubtitleContainer = document.createElement('div')
  const tasksContent = document.createElement('div')
  const tasksList = document.createElement('ul')
  const newTaskBtn = document.createElement('button')

  //create folders section
  folderContainer.classList.add("container")
  folderSubtitle.textContent = "Folders"
  folderSubtitleContainer.id = 'folder-subtitle'
  folderContent.id = 'folder-content'

  folderSection.appendChild(folderContainer)
  folderContainer.appendChild(folderSubtitleContainer)
  folderSubtitleContainer.appendChild(folderSubtitle)
  folderContainer.appendChild(folderContent)
  folderContent.appendChild(folderList)
  
  newFolderBtn.textContent = 'Add Folder ➕'
  newFolderBtn.id = 'newFolder'
  newFolderBtn.classList.add('addBtn')
  folderContainer.appendChild(newFolderBtn)

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

  //add event listener to form buttons that displays appropriate modal
  const formBtn = document.querySelectorAll('.addBtn');
  formBtn.forEach(btn => {
    btn.addEventListener('click', (e)=>{
      e.preventDefault()
      modal(e.target)
    })
  });
}
