//#region imports
import { folderArray } from "./init";
import { render } from "./render";
import { saveFolders } from "./saveFolders"
//#endregion imports

// export function createFolder(){

//   console.log(folderArray);
  
// }

export function addFolder() {
  render();
}

export function selectFolder(){
  const selectedFolder = document.querySelectorAll(".folder-container")
  selectedFolder.forEach((folderDiv)=>
    folderDiv.addEventListener('click', ()=>{
        document.querySelector(".active")?.classList.remove("active")
        folderDiv.classList.add("active")
  }))
}

export function displayDeleteBtn() {
  const hoveredEl = document.querySelectorAll('.animation-container')

  hoveredEl.forEach((el)=>{
    el.addEventListener('mouseenter', (e)=>{
      e.target.lastChild.lastChild.style.display = "flex"
    })  
  })
  hoveredEl.forEach((el)=>{
    el.addEventListener('mouseleave', (e)=>{
      e.target.lastChild.lastChild.style.display = "none"
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
  // let folderArray = folderArray.filter(folder=>{
  //     console.log(folderToDelete);
  //     console.log(folder.folderId);
  //     return folderToDelete !== folder.folderId
  // })
  const index = folderArray.findIndex(folder => 
    folder.folderId === folderToDelete);
    if (index > -1) {
      folderArray.splice(index, 1);
    }
  console.log(folderArray);
  saveFolders();
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
