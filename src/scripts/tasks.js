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
    if(acc.isLoggedIn){
      userFound = true;
      acc.folders.forEach(folder=>{
        if(folder.folderId === activeFolderId){
          folderFound = true
          // console.log(`Adding task to folder: ${folder.folderTitle}`);
          
          if (!Array.isArray(folder.tasks)) {
            folder.tasks = [];
          }
          folder.tasks.push(taskObj);
          
          saveAccounts(accounts)
          renderTasks(folder.tasks, folder.folderId);
          renderFolders()
        }
      })
    }
  })
  if (!userFound) {
    console.error("No logged-in user found");
  }

  if (!folderFound) {
    console.error("No matching folder found");
  }
  document.querySelector("#new-modal").remove()
}
  
export function handleCheckbox(e, taskId) {
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  accounts.forEach(acc=>{
    if (acc.isLoggedIn){
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
          }
        })
      })
    }
  })
  saveAccounts(accounts)
}

export function editTask(e){
  const editBtn = e.target;
  const taskToEdit = editBtn.dataset.task;
  setTaskEditing(taskToEdit);

  const accounts = JSON.parse(localStorage.getItem("accounts"))
  accounts.forEach(acc=>{
    if (acc.isLoggedIn){
      const activeFolder = acc.folders.find(folder => folder.isActive);
      if (activeFolder) {
        renderTasks(activeFolder.tasks, activeFolder.folderId);
      }
    }
  })
}

function setTaskEditing(taskToEdit) {
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  accounts.forEach(acc=>{
    if (acc.isLoggedIn){
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
    if (acc.isLoggedIn){
      acc.folders.forEach(folder=>{
        if (folder.isActive) {
          folder.tasks.forEach(task=>{
            if (task.taskId === taskId){
              renderTasks(folder.tasks, folder.folderId);
            };
          })
        }
      })
    }
  })
}

function updateTask(taskId, newTaskTitle, newTaskDesc, newTaskDueDate, newTaskPriority) {
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  accounts.forEach(acc=>{
    if (acc.isLoggedIn) {
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

export function deleteTask(e){

  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const delBtn = e.target;
  const taskToDelete = delBtn.dataset.task;
  removeTask(taskToDelete)
  renderFolders()
  accounts.forEach(acc=>{
    if (acc.isLoggedIn) {
      acc.folders.forEach(folder=>{
        folder.tasks.forEach(task=>{
          if (task.taskId === taskToDelete){
            renderTasks(folder.tasks, folder.folderId)
          }
        })
      })
    }
  })
  
  function removeTask(taskToDelete) {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    accounts.forEach(acc=>{
      if (acc.isLoggedIn){
        acc.folders.forEach(folder=>{
          const index = folder.tasks.findIndex(task=>task.taskId === taskToDelete)
          if (index > - 1) {
            folder.tasks.splice(index, 1)
          }
          saveAccounts(accounts)
        })
      }
    })
  }
}