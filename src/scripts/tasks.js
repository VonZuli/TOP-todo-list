
export function addTask() {
  
  let tasksList = document.querySelector("#tasks-content > ul")
  
  let taskTitle = document.querySelector("#title");
  let taskDesc = document.querySelector("#desc")
  let taskDueDate = document.querySelector("#dueDate")
  let taskPriority = document.querySelectorAll("input[type='radio']")
  let lowPriority = document.querySelector("#low-priority")
  let medPriority = document.querySelector("#med-priority")
  let highPriority = document.querySelector("#high-priority")
  let taskPrioritySelection = ""
  
  let generateTaskId = () => {
    const taskId = Math.random().toString(16).slice(2);
    return taskId
  }
 
  let taskId = generateTaskId()

  taskPriority.forEach((priority)=>{
    if (priority.checked === true) {

      switch (priority.checked) {
        case lowPriority.checked:
          taskPrioritySelection = "Low"
          
        break;
        case medPriority.checked:
          taskPrioritySelection = "Medium"
          
        break;
        case highPriority.checked:
          taskPrioritySelection = "High"
          
        break;
      
        default:
          break;
      }
     return taskPrioritySelection;
    }
  })
  
  let listItem = `
  <li data-tasks=${taskTitle.value.toLowerCase()}>
    <div class="item-container ${taskPrioritySelection.toLowerCase()}-prio">
      <div class="taskControls">
        <input for=${taskId} type=checkbox class="completedChk">
      </div>
      <div class="taskDetails">
        <label id=${taskId} class="taskTitle">${taskTitle.value}</label>
        <div class="taskDesc">${taskDesc.value}</div>
        <div class="taskDueDate">${taskDueDate.value}</div>
        <div class="taskPriority ${taskPrioritySelection.toLowerCase()}-prio">${taskPrioritySelection}</div>
      </div>
    </div>
  </li>`
  
  //appends task to DOM
  tasksList.insertAdjacentHTML('beforeend', listItem)
  handleCheckbox()
  
  function handleCheckbox() {
    const completedChk = document.querySelectorAll('.completedChk')

    completedChk.forEach((e)=>{
      e.addEventListener('click',()=>{
        const task = document.querySelector('li')
        const taskItemContainer = document.querySelector(".item-container")

        if (e.checked === true) {
          taskItemContainer.removeAttribute("class")
          taskItemContainer.setAttribute("class","item-container completed")
        } else if (e.checked === false) {
          taskItemContainer.classList.add(`${taskPrioritySelection.toLowerCase()}-prio`)
          taskItemContainer.classList.remove("completed")
        }
      })
    })

  }

  // listItem.insertAdjacentHTML('beforeend',)
  // tasksList.appendChild(listItem)
        // taskItemContainer.classList.remove(`${taskPrioritySelection}-prio`
  
}