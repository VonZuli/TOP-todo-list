import { imagepath } from "../index";
import { createElem } from "./factory";
import { generateId } from "./generateID";
import { initTaskArray, initTasks } from "./init";
import { renderTasks } from "./render";

export function addTask() {
  renderTasks();
}

 
  // console.log(tasksContent.dataset.folder);
  // console.log(folderCounter);
  // console.log(typeof folderCounter);
  // folderCounter.forEach(i=>{
  //   i.dataset ===
  // })
  //change this to set folder count to task array length
  // let folderCount = parseInt(folderCounter.textContent);
  // folderCount++
  // folderCounter.textContent = folderCount.toString();




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