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
         onUpdate } from './folders'
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
    const landingSection = document.createElement("section")

    const subContainerHeader = document.createElement("div")
    const uspHeader = document.createElement("h1")
    const uspContentIntro = document.createElement("p")
    
    const subContainerTop = document.createElement('div')
    const uspTitleTop = document.createElement("h3")
    const uspContentTop = document.createElement("p")  
    
    const subContainerMid = document.createElement('div')
    const uspTitleMid = document.createElement("h3")
    const uspContentMid = document.createElement("p")
    
    const subContainerBottom = document.createElement('div')
    const uspTitleBottom = document.createElement("h3")
    const uspContentBottom = document.createElement("p")
    const footer = document.createElement("footer")
    
    content.innerHTML = ""
   
    landingSection.classList.add("landing-section")
    uspHeader.classList.add("usp-header")

    content.appendChild(landingSection)

    content.appendChild(footer)

    landingSection.appendChild(subContainerHeader)
    landingSection.appendChild(subContainerTop)
    landingSection.appendChild(subContainerMid)
    landingSection.appendChild(subContainerBottom)

    const subContainer = document.querySelectorAll(".landing-section > div");
    [...subContainer].forEach(i=>{
      i.classList.add("sub-container")
    })
    subContainerHeader.classList.add("header")
    subContainerTop.classList.add("top")
    subContainerMid.classList.add("mid")
    subContainerBottom.classList.add("bottom")

    subContainerHeader.appendChild(uspHeader)
    subContainerHeader.appendChild(uspContentIntro)

    subContainerTop.appendChild(uspTitleTop)
    subContainerTop.appendChild(uspContentTop)

    subContainerMid.appendChild(uspTitleMid)
    subContainerMid.appendChild(uspContentMid)

    subContainerBottom.appendChild(uspTitleBottom)
    subContainerBottom.appendChild(uspContentBottom);
    
    const uspContent = document.querySelectorAll('p');
    [...uspContent].forEach(i=>{
      i.classList.add("usp-content")
    })
    uspContentIntro.classList.add("intro")
    uspContentTop.classList.add("top")
    uspContentMid.classList.add("mid")
    uspContentBottom.classList.add("bottom")
    
    foldersSection.style.display = 'none'
    tasksSection.style.display = 'none'

    uspHeader.innerHTML = "Unlock the Magic of Productivity with</br> <span>Arcane Assignments</span>"

    uspContentIntro.innerHTML = "Embark on a journey through your tasks with <span>Arcane Assignments</span>,</br> the ultimate wizardly task tracker that transforms mundane to-dos into enchanting quests!" 
    
    uspTitleTop.innerHTML = "Harness the power of arcane organization."
    uspContentTop.innerHTML = "Let your productivity soar as you navigate through your magical list of assignments and tasks. With Arcane Assignments, every task becomes an opportunity to wield your wizardly prowess. Dive into a world where each item on your to-do list transforms into a mystical quest, designed to keep you focused and motivated."

    uspTitleMid.innerHTML = "Designed for modern-day sorcerers."
    uspContentMid.innerHTML = "Arcane Assignments offers a spellbinding interface, mystical reminders, and an enchanting experience that makes conquering your daily tasks feel like an epic adventure." 
    
    uspTitleBottom.innerHTML = "With Arcane Assignments, every task is a quest, every goal a spell to cast."
    uspContentBottom.innerHTML = "Enter a realm where productivity meets magic, and let your wizardly willpower guide you to triumphant task completion."


    
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
  })();
}
