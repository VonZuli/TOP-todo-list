import { imagepath } from "../index";
import { createElem } from "./factory";
import { generateId } from "./generateID";
import { initTaskArray } from "./init";

export function addTask(e) {
  e.preventDefault();
  const deleteSVG = imagepath('./svg/delete.svg')
  const editSVG = imagepath('./svg/edit.svg')
  const calendarSVG = imagepath('./svg/calendar-exclaim.svg')

  let folderCounter = document.querySelectorAll(".folder-counter")
  let folderId = document.querySelectorAll("li[data-folder]")
  let tasksContent = document.querySelector("#tasks-content[data-folder]")
  let tasksList = document.querySelector("#tasks-content > ul")
  let taskTitle = document.querySelector("#title");
  let taskDesc = document.querySelector("#desc")
  let taskDueDate = document.querySelector("#dueDate")
  let taskPriority = document.querySelectorAll("input[type='radio']")

  let taskPrioritySelection = ""
  let taskObj = {};
  let taskId = generateId()

  taskPriority.forEach((priority)=>{
    if (priority.checked === true) {
      taskPrioritySelection = priority.id;
      return taskPrioritySelection
    }
  })
  
  tasksList.appendChild(createElem("div", {class:`item-container ${taskPrioritySelection}`},{},
    createElem("div", {class:"taskControls"},{},
      createElem("div",{class:"taskControls-top"},{},
        createElem("input", {class:"completedChk", for:`${taskId}`, type: "checkbox"})
      ),
      createElem("div",{class:"taskControls-bottom"},{},
        createElem("img",{class:"editTaskBtn", src:`${editSVG}`},{}),
        createElem("img",{class:"deleteTaskBtn", src:`${deleteSVG}`},{})
      )
    ),
    createElem("li",{"data-id":`${taskId}`},{},
      createElem("div",{class:"taskDetails"},{},
        createElem("div",{class:"header-wrapper"},{},
          createElem("label",{id:`${taskId}`, class:"taskTitle"},{},`${taskTitle.value}`),
          createElem("div",{class:"taskDesc"},{},`${taskDesc.value}`)
        ),
        createElem("div",{class:"calendar-wrapper"},{},
          createElem("img",{class: "calendarSVG", src:`${calendarSVG}`},{}),
          createElem("div",{class:"taskDueDate"},{},`${taskDueDate.value}`)
        ),
        createElem("div",{class:"priority-wrapper"},{},
          createElem("div",{class:`priority-indicator ${taskPrioritySelection}`},{}),
          createElem("div",{class:`taskPriority ${taskPrioritySelection}`},{},taskPrioritySelection.split("-")[1])
        ),
        createElem("div",{class:"notes-wrapper"},{},
          createElem("div",{class:"taskNotes"},{},"Task Notes"),
          createElem("textarea",{class:"textarea"},{})
        )
      )
    )
  ))
  taskObj = {
    id:tasksContent.dataset.folder,
    title:taskTitle.value,
    description:taskDesc.value,
    dueDate:taskDueDate.value,
    taskPriority:taskPrioritySelection.split("-")[1],
    taskNotes:{},
    completed: false
  }
  initTaskArray(taskObj);
 
  console.log(tasksContent.dataset.folder);
  // console.log(folderCounter);
  // console.log(typeof folderCounter);
  // folderCounter.forEach(i=>{
  //   i.dataset ===
  // })
  //change this to set folder count to task array length
  // let folderCount = parseInt(folderCounter.textContent);
  // folderCount++
  // folderCounter.textContent = folderCount.toString();
}




  // // handleCheckbox(taskId)
  
  // // when we add a new task call this function
  // function handleCheckbox(taskId, checked) {
  //   taskArray.forEach((task)=>{
  //     if (task.id === taskId){
  //       task.complete = checked;

  //     }
  //   })
    


  //   // this function gives the new checkbox an event listener
  //   const taskItemsChk = document.querySelectorAll(".completedChk")

  //   taskItemsChk.forEach(task => task.addEventListener("change", function(){
  //     const taskDetails = document.querySelector('.taskDetails')
  //     const taskItemContainer = document.querySelector(".item-container")
  //     if (this.checked) {
  //       taskDetails.classList.add("completed")
  //       taskItemContainer.classList.add("completed")
  //     }
  //     if (!this.checked) {
  //       taskDetails.classList.remove("completed")
  //       taskItemContainer.classList.remove("completed")
  //     }  
  //   })
  // )}


  // let lowPriority = document.querySelector("#priority-low")
  // let medPriority = document.querySelector("#priority-med")
  // let highPriority = document.querySelector("#priority-high")