//#region imports
import { imagepath } from "../index";
import { saveAccounts } from "./saveAccounts";
import { 
  selectFolder, 
  displayDeleteBtn,
  deleteFolder, 
  editFolder,
  onUpdate
} from './folders.js'
import { createElem } from "./factory";
//#endregion imports  

export function renderFolders(){
  
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const folderList = document.querySelector("#folder-content > ul")

  accounts.forEach(acc=>{
    if (acc.isLoggedIn === true) {
      folderList.innerHTML = ""
      acc.folders.forEach(folder=>{

        let folderTitle = folder.folderTitle

        const deleteSVG = imagepath('./svg/delete.svg');
        const editSVG = imagepath('./svg/edit.svg')
        const folderId = folder.folderId

        folderList.appendChild(
          createElem("div",{class:'folder-container','data-folder': folderId},{},
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
                },{}, 0)
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

export function renderTasks(folderTasks){
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const tasksList = document.querySelector("#tasks-content > ul");

  accounts.forEach(acc=>{
    if(acc.isLoggedIn === true){
      acc.folders.forEach(folder=>{

        tasksList.innerHTML = ""

        folderTasks.forEach(task=>{
          const deleteSVG = imagepath('./svg/delete.svg')
          const editSVG = imagepath('./svg/edit.svg')
          const calendarSVG = imagepath('./svg/calendar-exclaim.svg')

          tasksList.appendChild(createElem("div", {class:`item-container priority-${task.taskPriority}`},{},
          createElem("div", {class:"taskControls"},{},
            createElem("div",{class:"taskControls-top"},{},
              createElem("input", {class:"completedChk", for:`${task.taskId}`, type: "checkbox"})
            ),
            createElem("div",{class:"taskControls-bottom"},{},
              createElem("img",{class:"editTaskBtn", src:`${editSVG}`},{}),
              createElem("img",{class:"deleteTaskBtn", src:`${deleteSVG}`},{})
            )
          ),
          createElem("li",{"data-id":`${task.taskId}`},{},
            createElem("div",{class:"taskDetails"},{},
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
              ),
              createElem("div",{class:"notes-wrapper"},{},
                createElem("div",{class:"taskNotes"},{},"Task Notes"),
                createElem("textarea",{class:"textarea"},{})
              )
            )
          )
        ))
        })
      })
    }
  })
  saveAccounts(accounts)
}