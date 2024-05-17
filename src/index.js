//#region imports
import _ from 'lodash';
import './style.css'
import {createHeader as header} from './scripts/header'
import {createFooter as footer} from './scripts/footer';
import {createInit as init } from './scripts/init';
import { createTask } from "./scripts/todo";
//#endregion imports

//import calls
header();
init();
footer();

//create sign in function


//initialize folders array
//push the default list item title dataset to folders array
//IIFE gets invoked immediately and returns the result. You can't call it later. If you want to call it later, create a normal function.
let foldersArrInit = (() => {
  let foldersArr = [];
  
  return (() =>{
    let defaultListItem = document.querySelector('[data-folder]');
    let defaultfolderTitle = defaultListItem.dataset.folder
  
    foldersArr.push({defaultfolderTitle})
    console.table(foldersArr);
    return {foldersArr, defaultfolderTitle}
  })() 
})()

let todo = createTask("A", "B", "C", "D", "E")
let todo2 = createTask("F", "G", "H", "I", "J")


