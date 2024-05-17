//#region imports

//#endregion imports

//initialze tasks array
let tasksArray = [];

// factory function to create a todo task 
export const createTask = (title, desc, dueDate, priority, checklist) =>{
  console.table({title, desc,dueDate, priority, checklist});
  
  // if array is not needed remove L13-14
  tasksArray.push({title, desc,dueDate, priority, checklist})
  console.table(tasksArray);

  return {title, desc,dueDate, priority, checklist}
}