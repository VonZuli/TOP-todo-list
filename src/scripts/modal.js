import { forEach } from "lodash"

export function createModal(e) {
  
  function renderModal() {
    const newModal = document.createElement('div')
    newModal.id = 'new-modal'
    newModal.classList.add('modal')
    document.body.appendChild(newModal)

    const modalContent = document.createElement('div')
    modalContent.classList.add('modal-content')
    
    const modalClose = document.createElement('span')
    modalClose.classList.add('modal-close')
    modalClose.textContent = '❌'

    newModal.style.display = 'block'
    
    modalClose.addEventListener('click', ()=>{
      document.querySelector('#new-modal').remove()
    })
    newModal.appendChild(modalContent)
    
      function createForm(){
        const folderBtn = document.getElementById('newFolder')
        const taskBtn = document.getElementById('newTask')
        const newForm = document.createElement('form')
        const modalTitle = document.createElement('h1')
        
        if(folderBtn === e){
          newForm.setAttribute('id', createFormObject.label.labelAttr.form[0])
          createFolderForm()
        }
        if (taskBtn === e) {
          newForm.setAttribute('id', createFormObject.label.labelAttr.form[1])
          createTaskForm()
        }
        
        modalContent.appendChild(modalTitle)
        modalContent.appendChild(modalClose)
        modalContent.appendChild(newForm)

        const folderForm = document.querySelector("#modalNewFolderForm")
        const folderField = document.createElement('div')
        folderField.id = "folderField"
        folderForm.appendChild(folderField)
        folderField.innerHTML = 
        `${createFormObject.label.generateFolderLabel()}
         ${createFormObject.input.generateInput()}`

        function createFolderForm(){
          modalTitle.textContent = "Create new folder"
          //create label
          
          // const folderNameLabel = 
          // const folderNameInput = 
          //create textbox input

          //create add button
        }
    
        function createTaskForm(){
          modalTitle.textContent = "Create new task"
        }
      }
      createForm()
  }
  renderModal()


 
}

let createFormObject = {
  label:{
    labelAttr:{
      for:{
        taskTitle: ["Task", "Description", "Due Date", "Priority", "Notes", "Completed?"],
        folderTitle:"Folder Name"
      },
      form: ["modalNewFolderForm","modalNewTaskForm"]
    },
    generateTaskLabel: function(){
      let forAttr = Object.keys(this.labelAttr)[0]
      let forAttrContent = Object.keys(this.labelAttr.for)[0]
      let labelText = this.labelAttr.for.taskTitle[0]
      return `<label ${forAttr}=${forAttrContent}>${labelText}:</label>` 
    },
    generateFolderLabel: function() {
      let forAttr = Object.keys(this.labelAttr)[1]
      let forAttrContent = Object.keys(this.labelAttr.for)[1]
      let labelText = this.labelAttr.for.folderTitle
      return `<label ${forAttr}=${forAttrContent}>${labelText}:</label>` 
    }
  },
  input:{
    type:['text','button','checkbox','date','radio'],
    id:['title','desc','dueDate','priority','notes','checkbox'],
    generateInput: function(){
      let typeAttr = Object.keys(this)[0]
      let type = this.type[0]
      let idAttr = Object.keys(this)[1]
      let id = this.id[0] //this may need to be fixed
      return `<input ${typeAttr}=${type} ${idAttr}=${id}>`
    },
  }
  

}

// let formObject = {
//   label: function(){
//     return `<label for=${this.formFields.title.titleLabel[0]}>${this.formFields.title.titleLabel[1]}</label>`
//     // return `<label for=${forAttr}>${labelText}</label>`
//   },
//   input: function(){
//     return `<input type=${this.formFields.title.titleInput} id=${this.formFields.title.titleLabel[0]}>`
//     // return `<input type=${type} id=${id}>`
//   },
//   formFields:{
//     title:{
//       titleLabel: ['taskTitle','Task:'],
//       titleInput: 'text'
//     },
//     description: {
//       descLabel: [],
//       descInput: ''
//     },
//     dueDate:{
//       dueLabel: [],
//       dueInput:''
//     },
//     priority:{
//       prioLabel: [],
//       prioInput: ''
//     },
//     notes:{
//       notesLabel: [],
//       notesInput: ''
//     },
//     checkbox:{
//       checkboxLabel: [],
//       checkboxInput: ''
//     }
//   }
// }
  // folderField.innerHTML = 
  // // //   // `${formObject.label()}
  // // //   //  ${formObject.input()}
  // // //   //  `
  //    `${createFormObject.label.generateLabel()}
  //     ${createFormObject.input.generateInput()}`
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