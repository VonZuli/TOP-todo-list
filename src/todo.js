//imports

export function createToDoList(){
  const section = document.querySelector('section')
  const content = document.createElement('div')
  const subtitle = document.createElement('h2')
  

  subtitle.textContent = "Tasks"
  section.appendChild(content)
  content.appendChild(subtitle)

  const newTaskBtn = document.createElement('button')
  newTaskBtn.textContent = '➕'
  newTaskBtn.addEventListener('click', createTask())

  content.appendChild(newTaskBtn)
}

export function createTask() {
  createModal()



  
  
  let taskTitle 
  let taskDesc 
  let taskDueDate
  let taskPriority 
  let taskNotes
  let taskCheckbox
}

let formObject = {
  label: function(){
    return `<label for=${this.formFields.title.titleLabel[0]}>${this.formFields.title.titleLabel[1]}</label>`
    // return `<label for=${forAttr}>${labelText}</label>`
  },
  input: function(){
    return `<input type=${this.formFields.title.titleInput} id=${this.formFields.title.titleLabel[0]}>`
    // return `<input type=${type} id=${id}>`
  },
  formFields:{
    title:{
      titleLabel: ['taskTitle','Task:'],
      titleInput: 'text'
    },
    description: {
      descLabel: [],
      descInput: ''
    },
    dueDate:{
      dueLabel: [],
      dueInput:''
    },
    priority:{
      prioLabel: [],
      prioInput: ''
    },
    notes:{
      notesLabel: [],
      notesInput: ''
    },
    checkbox:{
      checkboxLabel: [],
      checkboxInput: ''
    }
  }
}

let createFormObject = {
  label:{
    labelAttr:{
      for:{
        title: ["Task", "Description", "Due Date", "Priority", "Notes", "Completed?"]
      },
      form: "modalTaskForm"
    },
    generateLabel: function(){
      let forAttr = Object.keys(this.labelAttr)[0]
      let forAttrContent = Object.keys(this.labelAttr.for)[0]
      let labelText = this.labelAttr.for.title[0]
      return `<label ${forAttr}=${forAttrContent}>${labelText}:</label>` 
    },
  },
  input:{
    type:['text','button','checkbox','date','radio'],
    id:['title','desc','dueDate','priority','notes','checkbox'],
    generateInput: function(){
      let typeAttr = Object.keys(this)[0]
      let type = this.type[0]
      let idAttr = Object.keys(this)[1]
      let id = this.id[0]
      return `<input ${typeAttr}=${type} ${idAttr}=${id}>`
    },
  }
  

}


function createModal() {
  const newtaskModal = document.createElement('div')
  newtaskModal.id = 'newTask-modal'
  newtaskModal.classList.add('modal')
  document.body.appendChild(newtaskModal)

  const modalContent = document.createElement('div')
  modalContent.classList.add('modal-content')
  newtaskModal.appendChild(modalContent)

  const modalClose = document.createElement('span')
  modalClose.classList.add('modal-close')
  modalClose.textContent = '❌'
  modalContent.appendChild(modalClose)

  const newTaskFrm = document.createElement('form')
  newTaskFrm.setAttribute("id", 'modalTaskForm')
  modalContent.appendChild(newTaskFrm)

  newTaskFrm.innerHTML = 
    // `${formObject.label()}
    //  ${formObject.input()}
    //  `
     `${createFormObject.label.generateLabel()}
     ${createFormObject.input.generateInput()}`
  //  `${formObject.label('taskTitle', 'Task:')} 
  //   ${formObject.input('text', 'taskTitle')}

  //   ${formObject.label('taskDesc', 'Description:')}
  //   ${formObject.input('text', 'taskDesc')}

  //   ${formObject.label('taskDue', 'Due Date:')}
  //   ${formObject.input('date', 'taskDue')}

  //   ${formObject.label('taskPrio', 'Priority:')}
  //   ${formObject.input('radio', 'taskPrioLow')}
  //   ${formObject.label('taskPrioLow', 'Low')}
  //   ${formObject.input('radio', 'taskPrioMed')}
  //   ${formObject.label('taskPrioMed', 'Medium')}
  //   ${formObject.input('radio', 'taskPrioHigh')}
  //   ${formObject.label('taskPrioHigh', 'High')}

  //   ${formObject.label('taskNotes', 'Notes:')}
  //   ${formObject.input('text', 'taskNotes')}

  //   ${formObject.label('taskCheck', 'Complete?')}
  //   ${formObject.input('checkbox', 'taskCheck')}
  // `


}