import { addTask } from "./tasks"
import { folderValidation } from "./validation";
import { createElem, createListenerElem } from "./factory";
import { imagepath } from "..";
export function createModal(e) {
  e.preventDefault();
  function renderModal() {
    const closeSVG = imagepath("./svg/close.svg")
    const addFolderSVG = imagepath("./svg/add-folder.svg")
    const addTaskSVG = imagepath("./svg/add-task.svg")
    let formType = e.target.id.toLowerCase().substring(3)

    const fields = [
      { label: "Title:", id: "title", type: "text", name: "title" },
      { label: "Description:", id: "desc", type: "text", name: "desc" },
      { label: "Due Date:", id: "dueDate", type: "date", name: "dueDate" },
      { label: "Priority:", id: "priority", type: "radio", name: "priority", 
        options:["Low", "Medium", "High"] },
      { label: "Notes:", id: "notes", type: "text", name: "notes" },
    ]

    // add close event to closeSVG
    let modalClose = () => {
      document.querySelector('#new-modal').remove();
    };

    const formFieldContainer = createListenerElem("div",{id:"formFieldContainer"},{})

    document.body.appendChild(
      createListenerElem("dialog", {id: "new-modal", class: "modal"},{}, 
        createListenerElem("div", {class:"modal-content"},{},
          createListenerElem("div", {class:"modal-header"},{},
            createListenerElem("h1",{},{}, `Create new ${formType}`),
            createListenerElem("img",{src:closeSVG, class: "modal-close"},{click: modalClose})
          )
        )
      )
    );
    
    if (e.target.id === "newFolder") {
      document.querySelector(".modal-content").appendChild(
        createListenerElem("form",{id:"modalNewFolderForm"},{},
          createListenerElem("div",{id:"formFieldContainer"},{},
            createListenerElem("div",{},{},
              createListenerElem("label",{for:"title"},{}, "Folder Name:"), 
              createListenerElem("input",{id:"title", type:"text", name:"title"},{})
            ), 
            createListenerElem("div", {id:"errorMsgDisplay"},{})
          ),
          createListenerElem("button", {id:"addBtn", form:`modalNewFolderForm`, "data-add-type":"folder"},{}, "Add", 
            createListenerElem("img", {src:addFolderSVG})
          )
        )  
      )
    }

    if (e.target.id === "newTask"){
      const radioWrapper = createListenerElem("div",{class:"radio-wrapper"},{})
      fields.forEach(field=>{
        if (field.type === "radio") { 
          const radioDiv = createListenerElem("div",{},{},
            createListenerElem("label",{}, {}, field.label),
            radioWrapper
          );
          field.options.forEach(option=>{
            const radioId = `${field.id}-${option.toLowerCase()}`
            radioWrapper.appendChild(
              createListenerElem("div",{},{},
                createListenerElem("input",{id: radioId, type:"radio", name:field.name, value: option},{}),
                createListenerElem("label", {for: radioId}, {},option)
              )
            )
          })
          formFieldContainer.appendChild(radioDiv)
        } else {
          const fieldDiv = createListenerElem("div",{},{},
          createListenerElem("label", { for: field.id }, {}, field.label),
          createListenerElem("input", { id: field.id, type: field.type, name: field.name }, {})
          )
          formFieldContainer.appendChild(fieldDiv);
        }
      });

      document.querySelector(".modal-content").appendChild(
        createListenerElem("form",{id:"modalNewTaskForm"},{},
          formFieldContainer,
          createListenerElem("div", {id:"errorMsgDisplay"},{}),
          createListenerElem("button", {id:"addBtn", form:"modalNewTaskForm", "data-add-type":"task"},{click: addTask}, "Add", 
            createListenerElem("img", {src:addTaskSVG})
          )
        )  
      );
    }   
  }
  renderModal();
};
        





  // pass in the form type and use it to determine form creation
  // dynamically create forms
    // function createForm(){

      
    //   // creates task form
    //   function createTaskForm(newForm){
    //     modalFormTitle.textContent = "Create new task";
    //     newForm.setAttribute('id', createFormObject.label.labelAttr.form[1]);

    //     // create form from object
    //     formFieldContainer.innerHTML = 
    //     `${createFormObject.label.generateLabel(0,0)}
    //       ${createFormObject.input.generateInput(0,1,0)} 

    //       ${createFormObject.label.generateLabel(1,1)}
    //       ${createFormObject.input.generateInput(0,1,1)}

    //       ${createFormObject.label.generateLabel(2,2)}
    //       ${createFormObject.input.generateInput(2,1,2)}

    //       ${createFormObject.label.generateLabel(3,3)}
    //       ${createFormObject.input.generateInput(4,1,3)}
    //     `;
    //   };

    //   //set input focus
    //   document.querySelector("input").focus()
    // }
    // // createForm();
    // document.querySelector('input').setAttribute('autofocus', '')
    // document.querySelector('form').addEventListener("submit", (e) =>{
    //   e.preventDefault
    // })
    // addBtn.addEventListener('click', (e)=>{
    //   e.preventDefault()
    //     if (e.target.dataset.addType === 'folder') {
    //       folderValidation();
    //     }
    //     if (e.target.dataset.addType === 'task') {
    //       addTask()
    //       document.querySelector('#new-modal').remove();
    //     }
    // })

    


// let createFormObject = {
//   label:{
//     labelAttr:{
//       for:{
//         title: ['title','desc','dueDate','priority','notes','checkbox','createBtn'],
//         text: ["Task", "Description", "Due Date", "Priority", "Notes", "Completed", "Folder Name"],
//       },
//       form: ["modalNewFolderForm","modalNewTaskForm"],

//     },
//     generateLabel: function(val1, val2){
//       let forAttr = Object.keys(this.labelAttr)[0]
//       let forAttrContent = this.labelAttr.for.title[val1]

//       let labelText = this.labelAttr.for.text[val2]
//       return `<div>
//                 <label ${forAttr}=${forAttrContent}>${labelText}:</label>
//               ` 
//     },
//   },
//   input:{
//     type:['text','button','date','checkbox','radio','submit'],
//     id:['title','desc','dueDate','priority','notes','checkbox','createBtn'],
//     generateInput: function(val1,val2,val3){
//       let typeAttr = Object.keys(this)[0]
//       let type = this.type[val1]

//       let idAttr = Object.keys(this)[1]
//       let id = this.id[val3]
  
//       let nameAttr = 'name';
//       let name = this.id[val3];

//       let formAttr = 'form'
//       if (type === this.type[1]) {
//         return `<button ${typeAttr}=${type} ${idAttr}=${this.id[val2]} ${formAttr}=${createFormObject.label.labelAttr.form[0]}>Add ➕</button>
//               </div>`
//       }else if(type === this.type[4]){
//         return `<div>
//                   <div>
//                     <input checked="checked" ${typeAttr}=${type} ${idAttr}=low-${id} ${nameAttr}=${name}>
//                     <label for=low-${this.id[val3]}>Low</label>
//                   </div>
//                   <div>
//                     <input ${typeAttr}=${type} ${idAttr}=med-${id} ${nameAttr}=${name}>
//                     <label for=med-${this.id[val3]}>Medium</label>
//                   </div>
//                   <div>
//                     <input ${typeAttr}=${type} ${idAttr}=high-${id} ${nameAttr}=${name}>
//                     <label for=high-${this.id[val3]}>High</label>
//                   </div>
//                 </div> 
//               </div>`
//       }else{
//         return `<input ${typeAttr}=${type} ${idAttr}=${id} ${nameAttr}=${name}>
//               </div>`
//       }
//     },
//   }
// };




    // // create the modal element and append to DOM
    // const newModal = document.createElement('div');
    // newModal.id = 'new-modal';
    // newModal.classList.add('modal');
        // modalContent.appendChild(modalFormTitle);
        // modalContent.appendChild(modalClose);
        // modalContent.appendChild(createNewForm);
        // createNewForm.appendChild(formFieldContainer)
        // formFieldContainer.appendChild(errorMsgDisplay)
            // // create the content
    // const modalContent = document.createElement('div');
    // modalContent.classList.add('modal-content');
    
    // // add a close "button"
    // const modalClose = document.createElement('span');
    // modalClose.classList.add('modal-close');
    // modalClose.textContent = '❌';

    // // display the modal
    // newModal.style.display = 'block';
        // newModal.appendChild(modalContent);
        // const folderBtn = document.getElementById('newFolder');
        // const taskBtn = document.getElementById('newTask');
        // const modalFormTitle = document.createElement('h1');
        // const createNewForm = document.createElement('form');
        // const formFieldContainer = document.createElement('div');
        // const errorMsgDisplay = document.createElement("div")
        // formFieldContainer.id = "formFieldContainer"
        // errorMsgDisplay.id = "errorMsgDisplay"
   
        // // logic to call function depending on button pressed
        // if(folderBtn === e){
        //   createFolderForm(createNewForm);
        // }
        // if (taskBtn === e) {
        //   createTaskForm(createNewForm);
        // }
        
        // append form to modal
        // modalContent.appendChild(modalFormTitle);
        // modalContent.appendChild(modalClose);
        // modalContent.appendChild(createNewForm);
        // createNewForm.appendChild(formFieldContainer)
        // formFieldContainer.appendChild(errorMsgDisplay)

        // append addBtn to modal
        // let addBtn = createFormObject.input.generateInput(1,6);
        // formFieldContainer.insertAdjacentHTML("afterend", addBtn);
        
        // if rendering form add data-type attr to addBtn
        // if (createNewForm.id === createFormObject.label.labelAttr.form[0]) {
        //   document.querySelector('#addBtn').setAttribute('data-add-type', 'folder')
        // }
        // if (createNewForm.id === createFormObject.label.labelAttr.form[1]) {
        //   document.querySelector('#addBtn').setAttribute('data-add-type', 'task')
        // }

        // creates folder form       
        // function createFolderForm(newForm){
        //   // modalFormTitle.textContent = "Create new folder";
        //   // newForm.setAttribute('id', createFormObject.label.labelAttr.form[0]);

        //   formFieldContainer.innerHTML = 
        //     `${createFormObject.label.generateLabel(0,6)}
        //      ${createFormObject.input.generateInput(0,0,0)}
        //     `;

        // };