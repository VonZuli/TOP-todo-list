//#region imports
import { imagepath } from "../index";
import { saveAccounts } from "./saveAccounts";
import { createElem } from "./factory";
import { 
  selectFolder, 
  displayDeleteBtn,
  deleteFolder, 
  editFolder,
  onUpdate
} from './folders.js'
import { handleCheckbox, editTask, onTaskUpdate } from "./tasks";
//#endregion imports  

export function renderFolders(){
  
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const folderList = document.querySelector("#folder-content > ul")

  accounts.forEach(acc=>{
    if (acc.isLoggedIn === true) {
      folderList.innerHTML = ""
      acc.folders.forEach(folder=>{

        let folderTitle = folder.folderTitle
        let folderId = folder.folderId
        let taskCount = folder.tasks.length

        const deleteSVG = imagepath('./svg/delete.svg');
        const editSVG = imagepath('./svg/edit.svg')

        const folderContainerClass = `folder-container` + (folder.isActive === true ? " active" : "");
        folderList.appendChild(
          createElem("div",{class:folderContainerClass,'data-folder': folderId},{},
            folder.isEditing !== true ?
            createElem("li",{'data-folder': folderId},{}, folderTitle)
            :
            (function() {
              const editingContainer = 
                createElem("div", { class: "editing-container" },{},
                  createElem("input", { 
                    type: "text", 
                    id:`edit-folderTitle-${folderId}`, 
                    autofocus: "", 
                    class: "editFolderInput", 
                    "value": folderTitle 
                  },{click:(e)=>{
                    e.stopPropagation()
                  }})
              );

              const saveEditButton = 
                createElem("button", { 
                  class: "saveEditBtn", 
                  "data-folder": folderId, 
                  id: folderId 
                },{click:(e)=>{
                  e.stopPropagation()
                  onUpdate(e)
                }}, "Save?");

              editingContainer.appendChild(saveEditButton);
              return editingContainer;
            })(),

            createElem("div",{class:'animation-container'},{},
              createElem("div",{class:'counter-container'},{},
                createElem("div",{
                  class: 'folder-counter', 
                  'data-folder': folderId
                },{}, taskCount)
              ), 
              createElem("div",{class:'edit-container tooltip'},{},
                createElem("span",{class:'tooltipText'},{},"Edit folder name"),
                createElem("img",{
                  src:editSVG, 
                  class:'editBtn', 
                  'data-folder': folderId, 
                  tabindex:"0"
                },
                {click:(e)=>{
                  e.stopPropagation()
                  editFolder(e)
                }})
              ), 
              createElem("div",{class:'delete-container hovered tooltip'},{},
                createElem("span",{class:"tooltipText"},{}, "Delete folder"),
                createElem("img",{
                  src:deleteSVG, 
                  class:'deleteBtn',
                  'data-folder': folderId, 
                  tabindex:"1"
                },
                {click:
                  deleteFolder(folderId, folderTitle)
                })
              )
            )
        ))
      })
    //adds event listener to folder-container new class elements
    selectFolder(); 
    displayDeleteBtn();
    }
  })
  saveAccounts(accounts)
};

export function renderTasks(folderTasks, folderId){
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const tasksList = document.querySelector("#tasks-content > ul");
  tasksList.innerHTML = ""

  accounts.forEach(acc=>{
    if(acc.isLoggedIn === true){
      acc.folders.forEach(folder=>{
      if (folder.folderId === folderId){ 
        folder.tasks.forEach(task=>{
          const deleteSVG = imagepath('./svg/delete.svg')
          const editSVG = imagepath('./svg/edit.svg')
          const calendarSVG = imagepath('./svg/calendar-exclaim.svg')

          const itemContainerClass = `item-container priority-${task.taskPriority}` + (task.completed ? " completed" : "");
          const taskDetailsClass = "taskDetails" + (task.completed ? " completed" : "");
          let taskTitle = task.taskTitle
          let taskDesc = task.taskDesc
          let taskDueDate = task.taskDueDate
          let taskPriority = task.taskPriority
          let taskId = task.taskId

          const taskContainer = createElem("div", {class:itemContainerClass,"data-id":`${task.taskId}`, "data-folder":`${folder.folderId}`},{},
            createElem("div", {class:"taskControls"},{},
              createElem("div",{class:"taskControls-top"},{},
                (()=>{
                  const checkbox = createElem("input", {
                    class: "completedChk", 
                    for: `${task.taskId}`, 
                    type: "checkbox",
                  },{change:(e)=>{
                      e.stopPropagation();
                      handleCheckbox(e, task.taskId) 
                    }
                  });
                  if (task.completed) {
                    checkbox.checked = true;
                  }
                  return checkbox
                })()  
              ),
              createElem("div",{class:"taskControls-bottom"},{},
                createElem("img",{class:"editTaskBtn", src:`${editSVG}`, "data-task": `${task.taskId}`,"data-folder":`${folder.folderId}`},{click:editTask}),
                createElem("img",{class:"deleteTaskBtn", src:`${deleteSVG}`},{})
              )
            ),
            task.isEditing !== true ?
            createElem("li",{"data-id":`${task.taskId}`},{},
              createElem("div",{class:taskDetailsClass},{},
                createElem("div",{class:"header-wrapper"},{},
                  createElem("label",{id:`${task.taskId}`, class:"taskTitle"},{},`${task.taskTitle}`),
                  createElem("div",{class:"taskDesc"},{},`${task.taskDesc}`)
                ),
                createElem("div",{class:"calendar-wrapper"},{},
                  createElem("img",{class: "calendarSVG", src:`${calendarSVG}`},{}),
                  createElem("div",{class:"taskDueDate"},{},`${task.taskDueDate}`)
                ),
                createElem("div",{class:"priority-wrapper"},{},
                  createElem("div",{class:`priority-indicator priority-${task.taskPriority}`},{}),
                  createElem("div",{class:`taskPriority priority-${task.taskPriority}`},{},task.taskPriority)
                )
              )
            )
            :
            (function () {
              const editTaskContainer = 
                createElem("div", {class:"edit-task-container"},{},
                  createElem("input", {
                    type: "text",
                    id: `edit-taskTitle-${taskId}`,
                    autofocus:"",
                    class: "editTaskInput",
                    "value": taskTitle
                  },{click:(e)=>{
                    e.stopPropagation()
                  }}),
                  createElem("input", {
                    type: "text",
                    id: `edit-taskDesc-${taskId}`,
                    class: "editTaskInput",
                    "value": taskDesc
                  },{click:(e)=>{
                    e.stopPropagation()
                  }}),
                  createElem("input", {
                    type: "date",
                    id: `edit-taskDueDate-${taskId}`,
                    class: "editTaskInput",
                    "value": taskDueDate
                  },{click:(e)=>{
                    e.stopPropagation()
                  }}),
                  createElem("select", {
                    id: `edit-taskPriority-${taskId}`,
                    class: "editTaskInput",
                    "value": taskPriority
                  },{click:(e)=>{
                    e.stopPropagation()
                  }},
                  createElem("option",{ class: "default-select", value: taskPriority, selected:""},{},taskPriority),
                  createElem("option", {class:"low-selectOpt",value:"Low"},{},"Low"),
                  createElem("option", {class:"medium-selectOpt",value:"Medium"},{},"Medium"),
                  createElem("option", {class:"high-selectOpt",value:"High"},{},"High")),
                )

                const saveTaskEditButton = 
                  createElem("button", { 
                    class: "saveEditBtn", 
                    "data-id": taskId, 
                    id: taskId 
                  },{click:(e)=>{
                    e.stopPropagation()
                    onTaskUpdate(e)
                  }}, "Save?");
                
                editTaskContainer.appendChild(saveTaskEditButton)
                return editTaskContainer;
              })()
           )
            tasksList.appendChild(taskContainer)
          })
        }
      })
    }
  })
  saveAccounts(accounts)
}