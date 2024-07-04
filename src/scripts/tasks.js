import { renderTasks } from "./render";
import { saveAccounts } from "./saveAccounts";

export function addTask(taskObj) {

  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const activeFolder = document.querySelector(".folder-container.active")

  if (!activeFolder) {
    console.error("No active folder found");
    return;
  }
  const activeFolderId = activeFolder.getAttribute("data-folder");

  let userFound = false;
  let folderFound = false;

  accounts.forEach(acc=>{
    if(acc.isLoggedIn === true){
      userFound = true;
      acc.folders.forEach(folder=>{
        
        if(folder.folderId === activeFolderId){
          folderFound = true
          console.log(`Adding task to folder: ${folder.folderTitle}`);
          folder.tasks.push(taskObj);
          renderTasks(folder.tasks);
        }

        if (!Array.isArray(folder.tasks)) {
          folder.tasks = [];
        }

        saveAccounts(accounts)
        
      })
    }
  })
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
  export function handleCheckbox(e, checked) {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    accounts.forEach(acc=>{
      if (acc.isLoggedIn === true){
        acc.folders.forEach(folder=>{
          folder.tasks.forEach(task=>{
            if (task.taskId === e.target.attributes[1].value){
              task.completed === false ? 
                task.completed = true : task.completed = false;
                saveAccounts(accounts)
              //run function to strike todo item here
            }
          })
        })
      }
    })
  }


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