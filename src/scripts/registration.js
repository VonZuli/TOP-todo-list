//imports
import { imagepath } from "..";
import { createFooter as footer } from "./footer"
import { createHeader  as header } from "./header"
import { initHomepage } from "./init"
import { registrationValidation } from "./validation";
import { createElem } from "./factory";



//builds registration page
export function registration(){

  const submitSVG = imagepath('./svg/submit-arrow.svg')
  let eyeOpenSVG = imagepath('./svg/eye-open.svg')
  let eyeCloseSVG = imagepath('./svg/eye-closed.svg')

  const content = document.querySelector(".content")
  content.innerHTML = ""
  const registrationMsg = "Welcome! Please input your information below and press submit."
  content.appendChild(
    createElem("section",{class:"registration_section"},{},
      createElem("div", {class:"reg-form-container"},{},
        createElem("img",{src:imagepath('./svg/user-plus.svg')},{}),
        createElem("h2",{class:"registration-msg"},{}, registrationMsg),
        createElem("form",{class:"registration_form"},{})
      )
    )
  )
  
  const regFormObj = {
    emailInput: {
      placeholder: "E-mail",
      class: "email_text",
      "aria-required": "true",
      "aria-invalid": "false",
      "aria-label": "E-mail input",
      type: "email",
      "data-error": "email"
    },
    fnameInput: {
      placeholder: "First name",
      class: "fname_text",
      "aria-required": "true",
      "aria-invalid": "false",
      "aria-label": "First name input",
      type: "text",
      "data-error": "fname"
    },
    lnameInput: {
      placeholder: "Last name",
      class: "lname_text",
      "aria-required": "true",
      "aria-invalid": "false",
      "aria-label": "Last name input",
      type: "text",
      "data-error": "lname"
    },
    usernameInput:{
      placeholder: "Username",
      class: "username_text",
      "aria-required": "true",
      "aria-invalid": "false",
      "aria-label": "User name input",
      type: "text",
      "data-error": "username"
    },
    passwordInput:{
      placeholder: "Password",
      class: "password_text",
      "aria-required": "true",
      "aria-invalid": "false",
      "aria-label": "Password input",
      type: "password",
      "data-error": "password"
    },
    confirmPWInput:{
      placeholder: "Confirm password",
      class: "password-confirm",
      "aria-required": "true",
      "aria-invalid": "false",
      "aria-label": "Confirm password input",
      type: "password",
      "data-error": "password-confirm"
    }
  }
  
  let buildForm = () => {
    const regForm = document.querySelector(".registration_form")
    Object.entries(regFormObj).forEach(([key,value])=>{
  
      regForm.appendChild(
        createElem("div",{class:"field-container"},{},
          key === "passwordInput" || key === "confirmPWInput" ? 
          createElem("div", {
              class:"password-group", 
              'data-field':key.split('Input')[0]
            },{},
            createElem("input", value,{}),
              createElem("img",{
                  class:"view-password",
                  src:imagepath('./svg/eye-open.svg'),
                  "data-field":key.split('Input')[0]
                },{}
              )
          )
          :
          createElem("input", value,{}),
          createElem("p",{
            class:`error-msg ${regFormObj[key].class.split('_')[0]}`,
            'data-error': `${regFormObj[key].class.split('_')[0]}`},{},""
          ),
        )
      )
    })
    regForm.appendChild(
      createElem("button",{class:"submit_btn", type:"submit"},{},"Submit", 
        createElem("img",{src: submitSVG},{})
      ))

    const submitBtn = document.querySelector('.submit_btn')
    submitBtn.addEventListener('click', handleRegistration)

    document.querySelectorAll(".view-password").forEach(i=>{
      i.addEventListener("click", viewPassword)
    })

    function viewPassword(e){
      const target = e.currentTarget;
      const field = target.previousElementSibling
      const isPasswordVisible = field.type === "text";

      field.type = isPasswordVisible ? "password" : "text";
      target.src = isPasswordVisible ? eyeOpenSVG : eyeCloseSVG;
    }

  }
  buildForm()
  
  function handleRegistration(e){
    e.preventDefault()
    const formFields = document.querySelectorAll('input')
    const userInfoObj = new Object()

    formFields.forEach(field=>{
      userInfoObj[field.className.split('_')[0]] = field.value.trim()
    })
    
    registrationValidation(userInfoObj)
    
  } 
}
