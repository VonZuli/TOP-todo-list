//#region imports
import _ from 'lodash';
import './style.css'
import {createHeader as header} from './scripts/header'
import {createFooter as footer} from './scripts/footer';
import {createInit as init } from './scripts/init';
import { createTask } from "./scripts/todo";

// import images
const images = require.context('../src/assets/images', true)
export const imagepath = (name) => images(name, true)
// import { folder } from './assets/images/svg/folder.svg';
//#endregion imports

//import calls
header();
init();
footer();

// const folder = new Image()
// folder.src = imagepath('./svg/folder.svg')


//create sign in function
//add clock svg to due date when task approaches X amount of time left

//initialize folders array
//push the default list item title dataset to folders array
//IIFE gets invoked immediately and returns the result. You can't call it later. If you want to call it later, create a normal function.
let foldersArrInit = (() => {
  let foldersArr = [];
  
  return (() =>{
    let defaultListItem = document.querySelector('[data-folder]');
    let defaultfolderTitle = defaultListItem.dataset.folder
  
    foldersArr.push({defaultfolderTitle})
    // console.table(foldersArr);
    return {foldersArr, defaultfolderTitle}
  })() 
})()

let todo = createTask("A", "B", "C", "D", "E")
let todo2 = createTask("F", "G", "H", "I", "J")


