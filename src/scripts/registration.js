//imports
import { imagepath } from "..";
import { createFooter as footer } from "./footer"
import { createHeader  as header } from "./header"
import { initHomepage } from "./init"
import { registrationValidation } from "./validation";


//builds registration page
export function registration(){
  const userPlusSVG = new Image()
  const submitSVG = new Image()
  let viewPasswordSVG = new Image()
  let viewConfirmSVG = new Image()
  let eyeOpenSVG = imagepath('./svg/eye-open.svg')
  let eyeCloseSVG = imagepath('./svg/eye-closed.svg')
  viewPasswordSVG.src = eyeOpenSVG
  viewConfirmSVG.src = eyeOpenSVG
  submitSVG.src = imagepath('./svg/submit-arrow.svg')
  userPlusSVG.src = imagepath('./svg/user-plus.svg')
  const pageContainer = document.querySelector('#page-container')
  const headerEl = document.createElement('header')
  const content = document.createElement('div')
  const section = document.createElement('section')
  const formContainer = document.createElement('div')
  const registrationMsg = document.createElement("h2")
  const registrationForm = document.createElement('form')

  const regFormObj = {
    emailInput: {
      "placeholder": "E-mail",
      "class": "email_text",
      "aria-required": "true",
      "aria-invalid": "false",
      "aria-label": "E-mail input",
      "type": "email",
      "data-error": "email"
    },
    fnameInput: {
      "placeholder": "First name",
      "class": "fname_text",
      "aria-required": "true",
      "aria-invalid": "false",
      "aria-label": "First name input",
      "type": "text",
      "data-error": "fname"
    },
    lnameInput: {
      "placeholder": "Last name",
      "class": "lname_text",
      "aria-required": "true",
      "aria-invalid": "false",
      "aria-label": "Last name input",
      "type": "text",
      "data-error": "lname"
    },
    usernameInput:{
      "placeholder": "Username",
      "class": "username_text",
      "aria-required": "true",
      "aria-invalid": "false",
      "aria-label": "User name input",
      "type": "text",
      "data-error": "username"
    },
    passwordInput:{
      "placeholder": "Password",
      "class": "password_text",
      "aria-required": "true",
      "aria-invalid": "false",
      "aria-label": "Password input",
      "type": "password",
      "data-error": "password"
    },
    confirmPWInput:{
      "placeholder": "Confirm password",
      "class": "password-confirm",
      "aria-required": "true",
      "aria-invalid": "false",
      "aria-label": "Confirm password input",
      "type": "password",
      "data-error": "password-confirm"
    }
  }

  const submitBtn = document.createElement('button')
  const footerEl = document.createElement('footer')


  content.classList.add("reg-content")
  section.classList.add("registration_section")
  formContainer.classList.add("reg-form-container")
  registrationMsg.classList.add("registration-msg")
  registrationForm.classList.add("registration_form")
  viewPasswordSVG.classList.add("view-password")
  viewConfirmSVG.classList.add("view-password")

  submitBtn.classList.add("submit_btn")

  registrationMsg.textContent = "Welcome! Please input your information below and press submit."
  submitBtn.textContent = "Submit"
  submitBtn.setAttribute("type", "submit")


  pageContainer.innerHTML = ""
  pageContainer.appendChild(headerEl)
  header()

  pageContainer.appendChild(content)
  content.appendChild(section)
  // noLogin() initHomepage
  section.appendChild(formContainer)

  formContainer.appendChild(userPlusSVG)
  formContainer.appendChild(registrationMsg)
  formContainer.appendChild(registrationForm)
  let buildForm = () => {
    const form = document.querySelector('.registration_form')

    Object.keys(regFormObj).forEach(key=>{
      const fieldContainer = document.createElement('div')
      const passwordGroup = document.createElement('div')
      const formField = document.createElement('input')
      const errorMsg = document.createElement('p')

      fieldContainer.classList.add("field-container")
      errorMsg.classList.add('error-msg')  
      errorMsg.classList.add(regFormObj[key].class.split('_')[0])
      errorMsg.setAttribute('data-error', regFormObj[key].class.split('_')[0])
      errorMsg.innerHTML = ""
      key === "passwordInput" || key === "confirmPWInput" ? passwordGroup.classList.add("password-group") & fieldContainer.appendChild(passwordGroup) & passwordGroup.setAttribute('data-field', key.split('Input')[0]) & passwordGroup.appendChild(formField) : fieldContainer.appendChild(formField)
      
      if (passwordGroup.dataset.field === "password"){
        passwordGroup.appendChild(viewPasswordSVG)
        viewPasswordSVG.addEventListener('click', (e)=>{
          switch (true) {
            case e.target.src === eyeOpenSVG:
              viewPasswordSVG.src = eyeCloseSVG
              formField.removeAttribute("type")
              formField.setAttribute("type", "text")
              break;
            case e.target.src === eyeCloseSVG:
              viewPasswordSVG.src = eyeOpenSVG
              formField.removeAttribute("type")
              formField.setAttribute("type", "password")
              break;
            default:
              break;
          }
        })
      } 
      if (passwordGroup.dataset.field === "confirmPW"){
        passwordGroup.appendChild(viewConfirmSVG)
        viewConfirmSVG.addEventListener('click', (e)=>{
          switch (true) {
            case e.target.src === eyeOpenSVG:
              viewConfirmSVG.src = eyeCloseSVG
              formField.removeAttribute("type")
              formField.setAttribute("type", "text")
              break;
            case e.target.src === eyeCloseSVG:
              viewConfirmSVG.src = eyeOpenSVG
              formField.removeAttribute("type")
              formField.setAttribute("type", "password")
              break;
            default:
              break;
          }
        })
      } 

      Object.entries(regFormObj[key]).forEach(([attr,val])=>{
        formField.setAttribute(attr,val)
      })
      fieldContainer.appendChild(errorMsg)
      form.appendChild(fieldContainer)
    })   
  }
  buildForm()

  registrationForm.appendChild(submitBtn)
  submitBtn.appendChild(submitSVG)
  pageContainer.appendChild(footerEl)
  footer()
  
  function handleRegistration(e){
    e.preventDefault()
    const formFields = document.querySelectorAll('input')
    const userInfoObj = new Object()

    formFields.forEach(field=>{
      userInfoObj[field.className.split('_')[0]] = field.value.trim()
    })
    
    registrationValidation(userInfoObj)
    
    
  }
  submitBtn.addEventListener('click', handleRegistration)
}