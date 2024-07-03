
import { folderValidation, taskValidation } from "./validation";
import { createElem } from "./factory";
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
      { label: "Description:", id: "desc", type: "text", name: "desc" },      { label: "Priority:", id: "priority", type: "radio", name: "priority", 
      options:["Low", "Medium", "High"] },
      { label: "Due Date:", id: "dueDate", type: "date", name: "dueDate" },

    ]

    // add close event to closeSVG
    let modalClose = () => {
      document.querySelector('#new-modal').remove();
    };

    const formFieldContainer = createElem("div",{id:"formFieldContainer"},{})

    document.body.appendChild(
      createElem("dialog", {id: "new-modal", class: "modal"},{}, 
        createElem("div", {class:"modal-content"},{},
          createElem("div", {class:"modal-header"},{},
            createElem("h1",{},{}, `Create new ${formType}`),
            createElem("img",{src:closeSVG, class: "modal-close"},{click: modalClose})
          )
        )
      )
    );
    
    if (e.target.id === "newFolder") {
      document.querySelector(".modal-content").appendChild(
        createElem("form",{id:"modalNewFolderForm"},{},
          createElem("div",{id:"formFieldContainer"},{},
            createElem("div",{},{},
              createElem("label",{for:"title"},{}, "Folder Name:"), 
              createElem("input",{id:"title", type:"text", name:"title"},{})
            ), 
            createElem("div", {id:"errorMsgDisplay"},{})
          ),
          createElem("button", {id:"addBtn", form:`modalNewFolderForm`, "data-add-type":"folder"},{click:(e)=>{
            e.preventDefault()
            folderValidation()
          }}, "Add", 
            createElem("img", {src:addFolderSVG})
          )
        )  
      )
    }

    if (e.target.id === "newTask"){
      const radioWrapper = createElem("div",{class:"radio-wrapper"},{})
      fields.forEach(field=>{
        if (field.type === "radio") { 
          const radioDiv = createElem("div",{},{},
            createElem("label",{}, {}, field.label),
            radioWrapper
          );
          field.options.forEach(option=>{
            const radioId = `${field.id}-${option.toLowerCase()}`
            radioWrapper.appendChild(
              createElem("div",{},{},
                createElem("input",{id: radioId, type:"radio", name:field.name, value: option},{}),
                createElem("label", {for: radioId}, {},option)
              )
            )
          })
          formFieldContainer.appendChild(radioDiv)
        } else {
          const fieldDiv = createElem("div",{},{},
          createElem("label", { for: field.id }, {}, field.label),
          createElem("input", { id: field.id, type: field.type, name: field.name }, {})
          )
          formFieldContainer.appendChild(fieldDiv);
        }
      });

      document.querySelector(".modal-content").appendChild(
        createElem("form",{id:"modalNewTaskForm"},{},
          formFieldContainer,
          createElem("div", {id:"errorMsgDisplay"},{}),
          createElem("button", {id:"addBtn", form:"modalNewTaskForm", "data-add-type":"task"},{click:(e)=>{
            e.preventDefault()
            taskValidation()
          }}, "Add", 
            createElem("img", {src:addTaskSVG})
          )
        )  
      );
    }   
  }
  renderModal();
};