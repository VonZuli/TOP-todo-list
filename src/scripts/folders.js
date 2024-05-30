//#region imports
import { folderArray } from "./init";
import { render } from "./render";
import { saveFolders } from "./saveFolders"
//#endregion imports

export function addFolder() {
  console.log(folderArray);
  render();
}

export function selectFolder(){
  const selectedFolder = document.querySelectorAll(".folder-container")
  selectedFolder.forEach((folderDiv)=>
    folderDiv.addEventListener('click', (e)=>{
      e.preventDefault()
        document.querySelector(".active")?.classList.remove("active")
        folderDiv.classList.add("active")
        // document.querySelector(".editBtn").style.display = "none"
        // if (folderDiv.classList.contains("active")) 
        // document.querySelector(".editBtn").style.display = "flex"

    })
  )
}

export function displayDeleteBtn() {
  const hoveredEl = document.querySelectorAll('.animation-container')

  hoveredEl.forEach((el)=>{
    el.addEventListener('mouseenter', (e)=>{
      e.target.lastChild.lastChild.style.display = "flex"
      e.target.lastChild.lastChild.style.margin = "2px"
    })  
  })
  hoveredEl.forEach((el)=>{
    el.addEventListener('mouseleave', (e)=>{
      e.target.lastChild.lastChild.style.display = "none"
      e.target.lastChild.lastChild.style.margin = "0"
    })
  })
}

export const deleteFolder = (folderToDelete)=>{
  return () => {
    removeFolder(folderToDelete)
    render()
  }
}
function removeFolder(folderToDelete) {
  const index = folderArray.findIndex(folder => 
    folder.folderId === folderToDelete);
    if (index > -1) {
      folderArray.splice(index, 1);
    }
  console.log(folderArray);
  saveFolders();
}

// export function editFolder(e) {
//   // const editBtn = e.target;
//   // const folderToEdit = editBtn.dataset.folder;
//   setEditing(folderToEdit);
//   render();
// }
function setEditing(folderToEdit) {
  folder.forEach(folder=>{
    if (folder.folderId === folderToEdit) {
      folder.isEditing = true
    }
  })
  saveFolders()
}

function updateFolder(folderId, newFolderTitle){
  folderArray.forEach(folder=>{
    if (folder.folderId === folderId) {
      folder.folderTitle = newFolderTitle
      folder.isEditing = false;
    }
  })
  saveFolders()
}

//user clicks child of Folder header
function displayFolderContents(e) {
  const tasksSection = document.querySelector(".tasks-section")
  tasksSection.style.visibility = "visible"
  let taskHeader = e.target.firstChild.textContent;
  //modify tasks subtitle h2 to display "folder name + tasks"
  const tasksSubtitle = document.querySelector("#tasks-subtitle > h2")
  tasksSubtitle.textContent = `${taskHeader} Tasks`
}
