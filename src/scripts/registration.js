//imports
import { imagepath } from "..";
import { createFooter as footer } from "./footer"
import { createHeader  as header } from "./header"
import { noLogin } from "./init"
import { registrationValidation } from "./validation";

//builds registration page
export function registration(){
  const userPlusSVG = new Image()
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
      "class":"email_text",
      "type":"email"
    },
    fnameInput: {
      "placeholder": "First name",
      "class":"fname_text",
      "type":"text"
    },
    lnameInput: {
      "placeholder": "Last name",
      "class":"lname_text",
      "type":"text"
    },
    usernameInput:{
      "placeholder": "Username",
      "class":"username_text",
      "type":"text"
    },
    passwordInput:{
      "placeholder": "Password",
      "class":"password_text",
      "type":"password"
    },
    confirmPWInput:{
      "placeholder": "Confirm password",
      "class":"password-confirm",
      "type":"password"
    }
  }

  const submitBtn = document.createElement('button')
  const footerEl = document.createElement('footer')


  content.classList.add("reg-content")
  section.classList.add("registration_section")
  formContainer.classList.add("reg-form-container")
  registrationMsg.classList.add("registration-msg")
  registrationForm.classList.add("registration_form")

  
  submitBtn.classList.add("submit_btn")

  registrationMsg.textContent = "Welcome! Please input your information below and press submit."
  submitBtn.textContent = "Submit"
  submitBtn.setAttribute("type", "submit")


  pageContainer.innerHTML = ""
  pageContainer.appendChild(headerEl)
  header()

  pageContainer.appendChild(content)
  content.appendChild(section)
  // noLogin()
  section.appendChild(formContainer)

  formContainer.appendChild(userPlusSVG)
  formContainer.appendChild(registrationMsg)
  formContainer.appendChild(registrationForm)
  let buildForm = () => {
    const form = document.querySelector('.registration_form')

    Object.keys(regFormObj).forEach(key=>{
      const formField = document.createElement('input')
      const fieldContainer =document.createElement('div')
      const errorMsg = document.createElement('p')

      errorMsg.classList.add('error-msg')  
      errorMsg.classList.add(regFormObj[key].class.split('_')[0])
      errorMsg.setAttribute('data-error', regFormObj[key].class.split('_')[0])
      errorMsg.innerHTML = ""
      fieldContainer.appendChild(formField)
      fieldContainer.appendChild(errorMsg)

      Object.entries(regFormObj[key]).forEach(([attr,val])=>{
        formField.setAttribute(attr,val)
      })
      form.appendChild(fieldContainer)
    })    
  }
  buildForm()

  registrationForm.appendChild(submitBtn)

  pageContainer.appendChild(footerEl)
  footer()

  function handleRegistration(e){
    e.preventDefault()
    const formFields = document.querySelectorAll('input')
    const userInfoObj = new Object()

    formFields.forEach(field=>{
      userInfoObj[field.className.split('_')[0]] = field.value
    })
    // let userInfoArr = new Array(userInfoObj)
    // console.log(userInfoArr);
    registrationValidation(userInfoObj)
  }
  submitBtn.addEventListener('click', handleRegistration)
}