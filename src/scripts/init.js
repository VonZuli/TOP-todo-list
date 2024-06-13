//#region imports
import { createModal as modal } from './modal'
import { imagepath } from "../index";
import { render } from "./render";
import { saveFolders } from './saveFolders';
import { generateId } from './generateID';
import { selectFolder, 
         displayDeleteBtn, 
         deleteFolder,
         editFolder,
         onUpdate } from './folders';
import { createElem } from "./factory";
//#endregion imports

//initialize folders array
export let folderArray;

// export function initDOM(){
  
  //check if user is logged in and then display the correct data for that user
  //else show noLoginInit and quote div
  // let nologinInit = (()=>{

  //   const content = document.querySelector(".content")
  //   const quoteContainer = document.createElement("div")
  //   const quoteEl = document.createElement("p")
  //   const authorEl = document.createElement("p")

  //   quoteContainer.classList.add("quote-container")
  //   randomQuote();
  //   quoteEl.classList.add("quote")
  //   authorEl.classList.add("quote-author")
    
  //   async function randomQuote() {
  //     try {
  //       const response = await fetch('https://api.quotable.io/random')
  //       const quote = await response.json()
  //        // Output the quote and author name
  //       quoteEl.textContent = quote.content;
  //       console.log(quoteEl.textContent.split(" ").length);
  //       authorEl.textContent = `- ${quote.author}`
  //     } catch (error) {
  //       console.log('Something went wrong!', error);
  //     }
  //   }
  //   content.appendChild(quoteContainer);
  //   quoteContainer.appendChild(quoteEl);
  //   quoteContainer.appendChild(authorEl);
  // })();
  
  //create folders DOM
  // let folderInit = (() =>{

  //   const folderSVG = new Image();
  //   const deleteSVG = new Image();
  //   const editSVG = new Image()
  //   folderSVG.src = imagepath('./svg/folder.svg');
  //   deleteSVG.src = imagepath('./svg/delete.svg');
  //   editSVG.src = imagepath('./svg/edit.svg')
    
  //   //folders section declarations
  //   const folderSection = document.querySelector('.folders-section')
  //   const foldersContainer = document.createElement('div')
  //   const foldersSubtitleContainer = document.createElement('div')
    
  //   const foldersSubtitle = document.createElement('h2')
  //   const foldersContent = document.createElement('div')
  //   const folderList = document.createElement('ul')
  //   const newFolderBtn = document.createElement('button')
  //   const defaultFolder = document.createElement('div')
  //   const defaultListItem = document.createElement('li')
  //   const animationContainer = document.createElement('div')
  //   const counterContainer = document.createElement('div')
  //   const editContainer = document.createElement('div')
  //   const deleteContainer = document.createElement('div')
  //   const folderCounter = document.createElement('div')
    
  //   const folderId = generateId()
    
  //   //create folders section
  //   foldersContainer.classList.add('container')
    
  //   foldersSubtitle.textContent = 'Folders'
  //   foldersSubtitleContainer.id = 'folder-subtitle'
  //   foldersContent.id = 'folder-content'
    
  //   defaultListItem.textContent = "General"
  //   let defaultName = defaultListItem.textContent
    
  //   defaultFolder.classList.add('folder-container')
  //   defaultFolder.setAttribute('data-folder', folderId)
  //   defaultListItem.setAttribute('data-folder', folderId)
  //   animationContainer.classList.add("animation-container")
  //   counterContainer.classList.add('counter-container')
  //   editContainer.classList.add('edit-container')
  //   deleteContainer.classList.add('delete-container')
  //   deleteContainer.classList.add('hovered')
  //   folderCounter.classList.add('folder-counter')
  //   folderCounter.setAttribute('data-folder', folderId)
  //   folderCounter.textContent = 0
  //   editSVG.classList.add('editBtn')
  //   editSVG.setAttribute('data-folder', folderId)
  //   editSVG.addEventListener('click', editFolder)
  //   deleteSVG.classList.add('deleteBtn')
  //   deleteSVG.setAttribute('data-folder', folderId)
  //   deleteSVG.addEventListener('click', deleteFolder(folderId))
    
  //   //append folderSection
  //   folderSection.appendChild(foldersContainer)
  //   foldersContainer.appendChild(foldersSubtitleContainer)
  //   foldersSubtitleContainer.appendChild(folderSVG)
  //   foldersSubtitleContainer.appendChild(foldersSubtitle)
  //   foldersContainer.appendChild(foldersContent)
  //   foldersContent.appendChild(folderList)
  //   folderList.appendChild(defaultFolder)
  //   defaultFolder.appendChild(defaultListItem)
    
  //   defaultFolder.appendChild(animationContainer)
  //   animationContainer.appendChild(counterContainer)
  //   animationContainer.appendChild(editContainer)
  //   animationContainer.appendChild(deleteContainer)
  //   counterContainer.appendChild(folderCounter)
  //   editContainer.appendChild(editSVG)
  //   deleteContainer.appendChild(deleteSVG)
    
  //   newFolderBtn.textContent = 'Add Folder ➕'
  //   newFolderBtn.id = 'newFolder'
  //   newFolderBtn.classList.add('addBtn')
  //   foldersContainer.appendChild(newFolderBtn)
    
  //   function initFolderArray(folderId, folderTitle, count){
  //     const savedFoldersObj = JSON.parse(localStorage.getItem("folders"));

  //       if (!localStorage.getItem("folders") || savedFoldersObj.length < 1) {
  //         folderArray = new Array();
  //         folderArray.push({
  //           folderId, 
  //           folderTitle, 
  //           folderTaskCount:+count
  //         })
  //         saveFolders(folderArray)
  //       }else{
  //         folderArray = savedFoldersObj
  //         //call function to render DOM with localstorage data
  //         render()
  //       }
        
  //   };
  //   initFolderArray(folderId, defaultName, folderCounter.textContent);
    
  //   //adds event listeners to elements on init
  //   displayDeleteBtn();
  //   deleteFolder();
  //   selectFolder(); 
  // })();
  
  // //create tasks DOM
  // let taskInit = (() => {
  //   //tasks section declarations
  //   const tasksSection = document.querySelector('.tasks-section')
  //   const tasksContainer = document.createElement('div')
  //   const tasksSubtitle = document.createElement('h2')
  //   const tasksSubtitleContainer = document.createElement('div')
  //   const tasksContent = document.createElement('div')
  //   const tasksList = document.createElement('ul')
  //   const newTaskBtn = document.createElement('button')

  //   //create tasks section
  //   tasksContainer.classList.add("container")
  //   tasksSubtitle.textContent = "Tasks"
  //   tasksSubtitleContainer.id = 'tasks-subtitle'
  //   tasksContent.id = 'tasks-content'

  //   tasksSection.appendChild(tasksContainer)
  //   tasksContainer.appendChild(tasksSubtitleContainer)
  //   tasksSubtitleContainer.appendChild(tasksSubtitle)
  //   tasksContainer.appendChild(tasksContent)
  //   tasksContent.appendChild(tasksList)
    

  //   newTaskBtn.textContent = 'Add Task ➕'
  //   newTaskBtn.id = 'newTask'
  //   newTaskBtn.classList.add('addBtn')
  //   tasksContainer.appendChild(newTaskBtn)
    
  // })();

  //add event listener to form buttons that displays appropriate modal
//   const formBtn = document.querySelectorAll('.addBtn');
//   formBtn.forEach(btn => {
//     btn.addEventListener('click', (e)=>{
//       e.preventDefault()
//       modal(e.target)
//     })
//   });
//   return {folderInit, taskInit}
// }





//local storage structure
// folderArray.push([{folderTitle},{"tasksArray": ["task1", "task2", "task3"]}])

//initialze tasks array
function initTaskArray(){
  let tasksArray;

  const savedTasks = JSON.parse(localStorage.getItem("tasks"))
  
  Array.isArray(savedTasks) ? tasksArray = savedTasks : tasksArray = new Array()
}

export function noLogin(){
  let nologinInit = (()=>{

    const content = document.querySelector(".content")
    const foldersSection = document.querySelector(".folders-section")
    const tasksSection = document.querySelector(".tasks-section")
    const heroSection = document.createElement("section")
    const arcaneCircleImg = new Image()
    

    content.innerHTML = ""
    foldersSection.style.display = 'none'
    tasksSection.style.display = 'none'

    heroSection.classList.add("hero-section")
    content.appendChild(heroSection)

    let contentObj = {
      hero:{
        heroTitle: "Unlock the Magic of Productivity with ",
        heroSpan: "Arcane Assignments",
        heroContentText: "The ultimate wizardly task tracker that transforms mundane to-dos into enchanting quests!"
      },
      top:{
        contentTopTitle: "Harness the power of arcane organization",
        contentTopText: "Let your productivity soar as you navigate through your magical list of assignments and tasks. With Arcane Assignments, every task becomes an opportunity to wield your wizardly prowess. Dive into a world where each item on your to-do list transforms into a mystical quest, designed to keep you focused and motivated.",
        contentTopImg: imagepath("./jpeg/arcane-circle.png")
      },
      middle:{
        contentMidTitle: "Designed for modern-day sorcerers.",
        contentMidText: "Arcane Assignments offers a spellbinding interface, mystical reminders, and an enchanting experience that makes conquering your daily tasks feel like an epic adventure.",
        // contentMidImg: imagepath("./jpeg/arcane-circle.png")
      },
      bottom:{
        contentBottomTitle: "Embark on a journey through your tasks.",
        contentBottomText: "With Arcane Assignments, every task is a quest, every goal a spell to cast. Enter a realm where productivity meets magic, and let your wizardly willpower guide you to triumphant task completion.",
        // contentBottomImg: imagepath("./jpeg/arcane-circle.png")

      }
    }
    // arcaneCircleImg.src = contentObj.top.contentTopImg
    Object.entries(contentObj).forEach(([key, value])=>{
      key === "hero" ? heroSection.appendChild(
        createElem("div", {class: `flex-wrapper ${key}-container`}, 
          createElem("h1", {class:`${key}-title`}, value[Object.keys(value)[0]],
          createElem("br",), 
          createElem("span", {}, value[Object.keys(value)[1]])), 
          createElem("h2", {class:`${key}-content`}, value[Object.keys(value)[2]]))
        ):
      content.appendChild(
      createElem("div", {class: `flex-wrapper content-${key}`}, 
        createElem("img", {class:`content-image`,src: value[Object.keys(value)[2]]}),
        createElem("h3", {class:`title content-${key}`}, value[Object.keys(value)[0]]), 
        createElem("p", {class: `text content-${key}`}, value[Object.keys(value)[1]])
        )
      )
    })
    
    const footer = createElem("footer",{})

    content.appendChild(footer)
    
  })();
}
