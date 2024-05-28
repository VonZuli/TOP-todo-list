//#region imports
import { addTask } from "./tasks";
import { render } from "./render";
//#endregion imports

export function addFolder(userInput) {

  render(userInput);

  //adds event listener to folder-container class elements
  selectFolder(); 
  displayDeleteBtn();
  deleteFolder();
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
  const folderToDelete = document.querySelectorAll('.folder-container')


  deleteBtn.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
      
      // const dataFolders = document.querySelectorAll(".folder-container")
      const storageObj = savedFolders.map(folderItem=>{
        return folderItem.folderTitle
      })
      storageObj.forEach(obj=>{
          if (obj === e.target.dataset.folder) {
            console.log(obj);
            console.log(e.target.dataset.folder);
            console.log(folderToDelete);
          } 
      })
    })
  })
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
