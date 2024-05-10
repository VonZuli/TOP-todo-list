//imports
import {createModal as modal} from './modal'

export function createToDoList(){
  const folderSection = document.querySelector('.folders-section')
  const folderSubtitle = document.createElement('h2')
  const folderContent = document.createElement('div')
  const newFolderBtn = document.createElement('button')

  const taskSection = document.querySelector('.tasks-section')
  const tasksSubtitle = document.createElement('h2')
  const tasksContent = document.createElement('div')
  const newTaskBtn = document.createElement('button')

  folderSubtitle.textContent = "Folders"
  folderSection.appendChild(folderSubtitle)
  folderSection.appendChild(folderContent)
  
  newFolderBtn.textContent = 'Add Folder ➕'
  newFolderBtn.id = 'newFolder'
  folderContent.appendChild(newFolderBtn)

  tasksSubtitle.textContent = "Tasks"
  taskSection.appendChild(tasksContent)
  tasksContent.appendChild(tasksSubtitle)

  newTaskBtn.textContent = 'Add Task ➕'
  newTaskBtn.id = 'newTask'
  tasksContent.appendChild(newTaskBtn)

  const formBtn = document.querySelectorAll('button');
  formBtn.forEach(btn => {
    btn.addEventListener('click', (e)=>{
      e.preventDefault()
      modal(e.target)
    })
  });
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

