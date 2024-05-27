//#region imports
import { addTask } from "./tasks";
import { imagepath } from "../index";
// import { folderArray } from "./init";
//#endregion imports



// let taskFolderObject = {}

// let taskTitle = document.querySelector("#title");
// let taskDesc = document.querySelector("#desc")
// let taskDueDate = document.querySelector("#dueDate")
// let taskPriority
// let lowPriority = document.querySelector("#low-priority")
// let medPriority = document.querySelector("#med-priority")
// let highPriority = document.querySelector("#high-priority")
// let taskNotes = document.querySelector("#notes")
// let taskCheckbox = document.querySelector(".completedChk")

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
  const deleteBtn = document.querySelector(".deleteBtn")
  deleteBtn.addEventListener('click',(e)=>{
    console.log(deleteBtn);
    console.log(e.target);
    console.log("delete");
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

/*
Task Name:
Description:
Due Date:
Prio:
Notes:
Completed:  add date when checked
*/

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