//#region imports
import {createModal as modal} from './modal'
//#endregion imports
export function createToDoList(){
  const folderSection = document.querySelector('.folders-section')
  const folderSubtitle = document.createElement('h2')
  const folderSubtitleContainer = document.createElement('div')
  const folderContent = document.createElement('div')
  const folderList = document.createElement('ul')
  const newFolderBtn = document.createElement('button')
  
  const tasksSection = document.querySelector('.tasks-section')
  const tasksSubtitle = document.createElement('h2')
  const tasksSubtitleContainer = document.createElement('div')
  const tasksContent = document.createElement('div')
  const tasksList = document.createElement('ul')
  const newTaskBtn = document.createElement('button')

  folderSubtitle.textContent = "Folders"
  folderSubtitleContainer.id = 'folder-subtitle'
  folderContent.id = 'folder-content'

  folderSection.appendChild(folderSubtitleContainer)
  folderSubtitleContainer.appendChild(folderSubtitle)
  folderSection.appendChild(folderContent)
  folderContent.appendChild(folderList)
  
  newFolderBtn.textContent = 'Add Folder ➕'
  newFolderBtn.id = 'newFolder'
  folderSection.appendChild(newFolderBtn)

  tasksSubtitle.textContent = "Tasks"
  tasksSubtitleContainer.id = 'tasks-subtitle'
  tasksContent.id = 'tasks-content'
  tasksContent.appendChild(tasksList)

  tasksSection.appendChild(tasksSubtitleContainer)
  tasksSubtitleContainer.appendChild(tasksSubtitle)
  tasksSection.appendChild(tasksContent)

  newTaskBtn.textContent = 'Add Task ➕'
  newTaskBtn.id = 'newTask'
  tasksSection.appendChild(newTaskBtn)

  const formBtn = document.querySelectorAll('button');
  formBtn.forEach(btn => {
    btn.addEventListener('click', (e)=>{
      e.preventDefault()
      modal(e.target)
    })
  });

  // const folderName = localStorage.getItem('taskFolderObject')
  // tasksList.innerHTML = `<li data-folder="${folderName}"></li>`
}
// function createFolder(){
//   modal()
//   // <div class="folder-title">Main</div>
// }

// function createTask() {
//   modal()
  
// }
// let taskTitle 
// let taskDesc 
// let taskDueDate
// let taskPriority 
// let taskNotes
// let taskCheckbox

/*
Task Name:
Description:
Due Date:
Prio:
Notes:
Completed:  add date when checked
*/
