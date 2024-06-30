//#region imports
import { imagepath } from "../index";
import { folderArray } from "./init";
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

export function render(username){
  
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
                },{}, "0")
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

    // const folderContainer = document.createElement('div')
    // const animationContainer = document.createElement('div')
    // const counterContainer = document.createElement('div')
    // const editContainer = document.createElement('div')
    // const deleteContainer = document.createElement('div')
    // const folderCounter = document.createElement("div")
    // const listItem = document.getElementsByTagName('li')
    // const tooltipEdit = document.createElement('span')
    // const tooltipDel = document.createElement('span')
   

    // folderContainer.classList.add('folder-container')
    // folderContainer.setAttribute('data-folder', folderId)
    // listItem.setAttribute('data-folder', folderId)
    
    // animationContainer.classList.add("animation-container")
    // counterContainer.classList.add('counter-container')
    // editContainer.classList.add('edit-container')
    // editContainer.classList.add('tooltip')
    // tooltipEdit.classList.add('tooltipText')
    // tooltipEdit.textContent = "Edit folder name" 
    // deleteContainer.classList.add('delete-container')
    // deleteContainer.classList.add('hovered')
    // deleteContainer.classList.add('tooltip')
    // tooltipDel.classList.add('tooltipText')
    // tooltipDel.textContent = "Click to delete folder"
    // folderCounter.classList.add('folder-counter')
    // folderCounter.setAttribute('data-folder', folderId)
    // editSVG.classList.add('editBtn')
    // editSVG.setAttribute('data-folder', folderId)
    // editSVG.setAttribute("tabindex", "0")
    // document.querySelector(".editBtn").addEventListener('click', editFolder)
    // deleteSVG.classList.add('deleteBtn')
    // deleteSVG.setAttribute('data-folder', folderId)
    // deleteSVG.setAttribute("tabindex", "1")
    // document.querySelector(".deleteBtn").addEventListener('click', deleteFolder(folderId, folderTitle))
    // listItem.textContent = folderTitle
    // folderCounter.textContent = +0
  
    // folderList.appendChild(folderContainer)
    // if (folder.isEditing === true){
    //   document.querySelector(".folder-container").appendChild(
    //     createElem("div",{class:"editing-container"},
    //       createElem("input",{type: "text", id: `edit-folderTitle-${folderId}`,autofocus:"", class: "editFolderInput", "value":folderTitle}),
    //       createElem("button",{class:"saveEditBtn", "data-folder":folderId, id:folderId}, "Save?")
    //     )
    //   )
      // const editingContainer = document.createElement('div')
      // const editingTxt = document.createElement("input")
      // const saveEditBtn = document.createElement("button")
      // editingContainer.classList.add("editing-container")
      // editingTxt.setAttribute("type","text")
      // editingTxt.setAttribute("id", `edit-folderTitle-${folderId}`)
      // editingTxt.setAttribute("autofocus", "")
      // editingTxt.classList.add("editFolderInput")
      // editingTxt.focus()
      // editingTxt.select()
      // saveEditBtn.classList.add("saveEditBtn")
      // editingTxt.setAttribute("value", folderTitle)
      // saveEditBtn.setAttribute("data-folder", folderId)
      // saveEditBtn.textContent = "Save?"
      // saveEditBtn.id = folderId;
      // saveEditBtn.addEventListener('click', onUpdate)
      // folderContainer.appendChild(editingContainer)
      // editingContainer.appendChild(editingTxt)
      // editingContainer.appendChild(saveEditBtn)
     
    // }else{
    //   document.querySelector(".folder-container").appendChild(listItem)
    // }
    // folderContainer.appendChild(animationContainer)
    // animationContainer.appendChild(counterContainer)
    // animationContainer.appendChild(editContainer)
    // animationContainer.appendChild(deleteContainer)
    // counterContainer.appendChild(folderCounter)
    // editContainer.appendChild(tooltipEdit)
    // editContainer.appendChild(editSVG)
    // deleteContainer.appendChild(tooltipDel)
    // deleteContainer.appendChild(deleteSVG)