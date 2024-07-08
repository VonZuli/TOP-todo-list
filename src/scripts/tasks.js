import { renderFolders, renderTasks } from "./render";
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
        renderFolders();
        
      })
    }
  })
}
  
export function handleCheckbox(e, taskId) {
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  accounts.forEach(acc=>{
    if (acc.isLoggedIn === true){
      acc.folders.forEach(folder=>{
        folder.tasks.forEach(task=>{
          if (task.taskId === taskId){
            const taskDetails = document.querySelector(`li[data-id="${taskId}"] > .taskDetails`)
            const taskItemContainer = document.querySelector(`.item-container[data-id="${taskId}"]`)
            task.completed = e.target.checked
            if (task.completed === true) {
              taskDetails.classList.add("completed")
              taskItemContainer.classList.add("completed")
            } else {
              taskDetails.classList.remove("completed")
              taskItemContainer.classList.remove("completed")
            }
            saveAccounts(accounts)
          }
        })
      })
    }
  })
}

export function editTask(e){
  const editBtn = e.target;
  const taskToEdit = editBtn.dataset.task;
  setTaskEditing(taskToEdit);
  const accounts = JSON.parse(localStorage.getItem("accounts"))
  accounts.forEach(acc=>{
    if (acc.isLoggedIn === true){
      acc.folders.forEach(folder=>{
        const folderDiv = document.querySelectorAll(".folder-container")
        console.log(folderDiv);
        folderDiv.forEach(el=>{
          if (folder.folderId === el.dataset.folder){
            renderTasks(folder.tasks);
          };
        })
        // if (folder.folderId === folderDiv) {
          
        // }
      })
    }
  })
}

function setTaskEditing(taskToEdit) {
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  accounts.forEach(acc=>{
    if (acc.isLoggedIn === true){
      acc.folders.forEach(folder=>{
        folder.tasks.forEach(task=>{
          if(task.taskId === taskToEdit){
            task.isEditing = true
          }
        })
      })
      saveAccounts(accounts)
    }
  })
}

export function onTaskUpdate(e) {
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const saveBtn = e.target;
  const taskId = saveBtn.dataset.id;

  const titleTxt = document.getElementById(`edit-taskTitle-${taskId}`);
  const newTaskTitle = titleTxt.value;

  const descTxt = document.getElementById(`edit-taskDesc-${taskId}`);
  const newTaskDesc = descTxt.value;

  const datePicker = document.getElementById(`edit-taskDueDate-${taskId}`);
  const newTaskDueDate = datePicker.value;

  const prioritySelect = document.getElementById(`edit-taskPriority-${taskId}`);
  const newTaskPriority = prioritySelect.value;

  updateTask(taskId, newTaskTitle, newTaskDesc, newTaskDueDate, newTaskPriority);  

  accounts.forEach(acc=>{
    if (acc.isLoggedIn === true){
      acc.folders.forEach(folder=>{
        const folderId = document.querySelector(".folder-container").dataset.folder
        if(folder.folderId === folderId){

          renderTasks(folder.tasks);
        }
      })
    }
  })
}

function updateTask(taskId, newTaskTitle, newTaskDesc, newTaskDueDate, newTaskPriority) {
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  accounts.forEach(acc=>{
    if (acc.isLoggedIn === true) {
      acc.folders.forEach(folder=>{
        folder.tasks.forEach(task=>{
          if (task.taskId === taskId) {
            task.taskTitle = newTaskTitle
            task.taskDesc = newTaskDesc
            task.taskDueDate = newTaskDueDate
            task.taskPriority = newTaskPriority
            task.isEditing = false
          }
        })
      })
      saveAccounts(accounts)
    }
  })
}