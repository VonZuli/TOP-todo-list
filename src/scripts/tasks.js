
export function addTask() {
  
  let tasksList = document.querySelector("#tasks-content > ul")
  
  let taskTitle = document.querySelector("#title");
  let taskDesc = document.querySelector("#desc")
  let taskDueDate = document.querySelector("#dueDate")
  let lowPriority = document.querySelector("#low-priority")
  let medPriority = document.querySelector("#med-priority")
  let highPriority = document.querySelector("#high-priority")
  let taskNotes = document.querySelector("#notes")
  
  let listItem = `
  <li data-tasks=${taskTitle.value.toLowerCase()}>
    <div class="item-container">${taskTitle.value}</div>
    <div>${taskDesc.value}</div>
  </li>`
  
  tasksList.insertAdjacentHTML('beforeend', listItem)

  // listItem.insertAdjacentHTML('beforeend',)
  // tasksList.appendChild(listItem)
  
  
}