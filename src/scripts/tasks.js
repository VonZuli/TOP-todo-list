import { forEach } from "lodash";
import { imagepath } from "../index";

export function addTask() {

  const trashSVG = new Image()
  const editSVG = new Image()
  const calendarSVG = new Image()
  trashSVG.src = imagepath('./svg/trash.svg')
  editSVG.src = imagepath('./svg/edit.svg')
  calendarSVG.src = imagepath('./svg/calendar-exclaim.svg')

  let tasksList = document.querySelector("#tasks-content > ul")
  
  let taskTitle = document.querySelector("#title");
  let taskDesc = document.querySelector("#desc")
  let taskDueDate = document.querySelector("#dueDate")
  let taskPriority = document.querySelectorAll("input[type='radio']")
  let lowPriority = document.querySelector("#low-priority")
  let medPriority = document.querySelector("#med-priority")
  let highPriority = document.querySelector("#high-priority")
  let taskPrioritySelection = ""
  
  let generateTaskId = () => {
    const taskId = Math.random().toString(16).slice(2);
    return taskId
  }
 
  let taskId = generateTaskId()

  taskPriority.forEach((priority)=>{
    if (priority.checked === true) {

      switch (priority.checked) {
        case lowPriority.checked:
          taskPrioritySelection = "Low"
          
        break;
        case medPriority.checked:
          taskPrioritySelection = "Medium"
          
        break;
        case highPriority.checked:
          taskPrioritySelection = "High"
          
        break;
      
        default:
          break;
      }
     return taskPrioritySelection;
    }
    
  })
  
  let listItem = `
  <div class="item-container ${taskPrioritySelection.toLowerCase()}-prio">
    <div class="taskControls">
      <div class="taskControls-top">
        <input for=${taskId} type=checkbox class="completedChk">
      </div>
      <div class="taskControls-bottom">
        <img class="editTaskBtn" src="${editSVG.src}">
        <img class="deleteTaskBtn" src="${trashSVG.src}">
      </div>
    </div> 
    <li data-id=${taskId}>
      <div class="taskDetails">
        <label id=${taskId} class="taskTitle">${taskTitle.value}</label>
        <div class="taskDesc">${taskDesc.value}</div>
        <div class="calendar-container">
          <img class="calendarSVG" src="${calendarSVG.src}">
          <div class="taskDueDate">${taskDueDate.value}</div>
        </div>
        <div class="taskPriority ${taskPrioritySelection.toLowerCase()}-prio">${taskPrioritySelection}</div>
      </div>
    </li>
  </div>`
  
  //appends task to DOM
  tasksList.insertAdjacentHTML('beforeend', listItem)  
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