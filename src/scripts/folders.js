//#region imports
import { folderArray } from "./init";
import { render } from "./render";
// import { folderArray } from "./init";
import { saveFolders } from "./saveFolders"
//#endregion imports

// export function createFolder(){

//   console.log(folderArray);
  
// }

export function addFolder() {
  // createFolder()
  render();
  //adds event listener to folder-container new class elements
  selectFolder(); 
  displayDeleteBtn();
  deleteFolder();
  saveFolders();
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

export function deleteFolder(){
  const deleteBtn = document.querySelectorAll(".deleteBtn")
  const savedFolders = JSON.parse(localStorage.getItem("folders"))
  // const folderToDelete = document.querySelectorAll('.folder-container')


  deleteBtn.forEach((btn)=>{
    btn.addEventListener('click',(e) =>{
      return removeFolder(e.target.dataset.folder)
    })
  })
  function removeFolder(folderToDelete){
    // console.log(folderToDelete);
    folderArray.filter((folder)=>{
      console.log(folder);
    })
  }
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
