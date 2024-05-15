//#region imports
import { addTask } from "./tasks";
//#endregion imports

//user enters folder data
//user clicks add
//user data is appended to Folders list

// let taskFolderObject = {}

let taskTitle = document.querySelector("#title");
let taskDesc = document.querySelector("#desc")
let taskDueDate = document.querySelector("#dueDate")
let taskPriority
let lowPriority = document.querySelector("#low-priority")
let medPriority = document.querySelector("#med-priority")
let highPriority = document.querySelector("#high-priority")
let taskNotes = document.querySelector("#notes")
let taskCheckbox = document.querySelector(".completedChk")

export function addFolder() {
  const folderList = document.querySelector("#folder-content > ul")
  const folderContainer = document.createElement('div')
  const folderCounter = document.createElement('div')
  const listItem = document.createElement('li')
  const folderNameInput = document.querySelector("#title")

  let userInput = folderNameInput.value.toLowerCase()

  folderContainer.classList.add('folder-container')
  folderCounter.classList.add('folder-counter')
  folderCounter.textContent = 0
  listItem.textContent = folderNameInput.value
  listItem.setAttribute('data-folder', userInput)
  
  localStorage.setItem('state', JSON.stringify(userInput))

  // taskFolderObject = [
  //   [userInput,
  //     {"folder":userInput,
  //      "tasks":[
  //         {taskTitle,
  //         taskDesc,
  //         taskDueDate,
  //         taskPriority,
  //         taskNotes,
  //         taskCheckbox
  //         },
  //         {}
  //       ]
  //     }
  //   ],
  //   [],
  //   []
  // ]

  // Object(taskFolderObject, userInput, {
  //   taskTitle: 'test',
  //   description: 'testdesc',
  //   dueDate: 'somedate',
  //   priority: 'high',
  //   notes: 'oooo so many notes',
  //   completed: true
  // })
  //insert task objects here.



  folderList.appendChild(folderContainer)
  folderContainer.appendChild(listItem)
  folderContainer.appendChild(folderCounter)
  

  folderContainer.addEventListener('click', (e)=>{
    e.preventDefault();
    displayFolder(e)
  })
}


//user clicks child of Folder header

function displayFolder(e) {
  const tasksSection = document.querySelector(".tasks-section")
  tasksSection.style.visibility = "visible"
  let taskHeader = e.target.firstChild.textContent;
  //modify tasks subtitle h2 to display "folder name + tasks"
  const tasksSubtitle = document.querySelector("#tasks-subtitle > h2")
  tasksSubtitle.textContent = `${taskHeader} Tasks`
 
  
  // listItem.innerHTML = localStorage.getItem
  // ('taskFolderObject')
  // tasksList.appendChild(listItem)
  //add active/hover styling to folders
    //selected folder width expands out to show delete/edit opt
  
  //Tasks section is updated with tasks assigned to that folder
    //display tasks associated with selected folder

}



/*
Task Name:
Description:
Due Date:
Prio:
Notes:
Completed:  add date when checked
*/