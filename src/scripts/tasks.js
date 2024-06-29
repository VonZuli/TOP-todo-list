import { imagepath } from "../index";
import { generateId } from "./generateID";

export function addTask(e) {
  e.preventDefault();
  const trashSVG = new Image()
  const editSVG = new Image()
  const calendarSVG = new Image()
  trashSVG.src = imagepath('./svg/delete.svg')
  editSVG.src = imagepath('./svg/edit.svg')
  calendarSVG.src = imagepath('./svg/calendar-exclaim.svg')

  let tasksList = document.querySelector("#tasks-content > ul")
  
  let taskTitle = document.querySelector("#title");
  let taskDesc = document.querySelector("#desc")
  let taskDueDate = document.querySelector("#dueDate")
  let taskPriority = document.querySelectorAll("input[type='radio']")
  let lowPriority = document.querySelector("#priority-low")
  let medPriority = document.querySelector("#priority-med")
  let highPriority = document.querySelector("#priority-high")
  let taskPrioritySelection = ""
  

 
  let taskId = generateId()

  taskPriority.forEach((priority)=>{
    if (priority.checked === true) {
      taskPrioritySelection = priority.id;
      return taskPrioritySelection
    }
  })
  
  let listItem = `
  <div class="item-container ${taskPrioritySelection}">
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
        <div class="header-wrapper">
          <label id=${taskId} class="taskTitle">${taskTitle.value}</label>
          <div class="taskDesc">${taskDesc.value}</div>
        </div>
        <div class="calendar-container">
          <img class="calendarSVG" src="${calendarSVG.src}">
          <div class="taskDueDate">${taskDueDate.value}</div>
        </div>
        <div class="priority-wrapper">
          <div class="priority-indicator ${taskPrioritySelection}"></div>
          <div class="taskPriority ${taskPrioritySelection}">${taskPrioritySelection.split("-")[1]}</div>
        </div>
        <div class="notes-wrapper">
          <div class="taskNotes">Task Notes</div>
          <textarea class="textarea"></textarea>
        </div>
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