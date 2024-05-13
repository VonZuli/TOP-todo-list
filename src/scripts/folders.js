//#region imports

//#endregion imports




//user enters folder data
//user clicks add
//user data is appended to Folders list

export function addFolder() {
  const folderList = document.querySelector("#folder-content > ul")
  const listItem = document.createElement('li')
  const folderNameInput = document.querySelector("#title")

  let userInput = folderNameInput.value.toLowerCase()


  listItem.textContent = folderNameInput.value
  listItem.setAttribute('data-folder', userInput)
  
  // taskFolderObject = [userInput,{taskTitle, taskDesc, taskDueDate, taskPriority, taskNotes, taskCheckbox}]

  // Object(taskFolderObject, userInput, {
  //   taskTitle: 'test',
  //   description: 'testdesc',
  //   dueDate: 'somedate',
  //   priority: 'high',
  //   notes: 'oooo so many notes',
  //   completed: true
  // })
  //insert task objects here.

  console.log(taskFolderObject);

  // localStorage.setItem('taskFolderObject', JSON.stringify(taskFolderObject))

  folderList.appendChild(listItem)

  listItem.addEventListener('click', (e)=>{
    e.preventDefault();
    displayFolder(e)
  })
}


//user clicks child of Folder header

function displayFolder(e) {
  const tasksSection = document.querySelector(".tasks-section")
  tasksSection.style.visibility = "visible"
  let taskHeader = e.target.textContent;
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

let taskFolderObject = {}

let taskTitle = document.querySelector("#title");
let taskDesc = document.querySelector("#desc")
let taskDueDate = document.querySelector("#dueDate")
let taskPriority
let lowPriority = document.querySelector("#low-priority")
let medPriority = document.querySelector("#med-priority")
let highPriority = document.querySelector("#high-priority")
let taskNotes = document.querySelector("#notes")
let taskCheckbox

/*
Task Name:
Description:
Due Date:
Prio:
Notes:
Completed:  add date when checked
*/