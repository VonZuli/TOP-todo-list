//imports
import {imagepath} from '..'
import { loginValidation } from './validation'
import {registration} from './registration'

export function login() {

  const userSVG = new Image()
  userSVG.src = imagepath('./svg/user-login.svg')
  let viewPasswordSVG = new Image()
  let eyeOpenSVG = imagepath('./svg/eye-open.svg')
  let eyeCloseSVG = imagepath('./svg/eye-closed.svg')
  
  viewPasswordSVG.src = eyeOpenSVG
  const body = document.querySelector("body")
  const dialog = document.createElement("dialog")
  const dialogContainer = document.createElement("div")
  const welcomeMsg = document.createElement("h2")
  const loginForm = document.createElement("form")
  const usernameInput = document.createElement("input")
  const passwordGroup = document.createElement('div')
  const passwordInput = document.createElement("input")
  const loginControls = document.createElement('div')
  const loginBtn = document.createElement('button')
  const cancelBtn = document.createElement('button')
  const noAccount = document.createElement('p')
  const linkSpan = document.createElement('span')
  const signupLink = document.createElement('a')
  const errorContainer = document.createElement('div')
  const errorMsg = document.createElement('p')

  signupLink.href = '#'
  signupLink.addEventListener('click', (e)=>{
    e.preventDefault()
    dialog.remove()
    registration()
  })
  const linkText = 'here.'
  signupLink.textContent = linkText
  noAccount.textContent = `Don't have an account? Click `

  dialog.classList.add("login_dialog")
  dialogContainer.classList.add("login-container")

  welcomeMsg.classList.add("welcomeMsg")
  welcomeMsg.textContent = "Please sign in"

  loginForm.id = 'login'
  loginForm.classList.add("login_form")
  loginForm.setAttribute("action", "#")
 
  usernameInput.setAttribute("autofocus", "")
  usernameInput.classList.add('username_txt')
  usernameInput.setAttribute("type", "text")
  usernameInput.setAttribute("placeholder", "Username")
  usernameInput.setAttribute("name", "Username")
  passwordInput.classList.add('password_txt')
  passwordInput.setAttribute("type", "password")
  passwordInput.setAttribute("placeholder", "Password")
  passwordInput.setAttribute("name", "Password")
  viewPasswordSVG.classList.add("view-password")

  viewPasswordSVG.addEventListener('click', (e)=>{
    switch (true) {
      case e.target.src === eyeOpenSVG:
        viewPasswordSVG.src = eyeCloseSVG
        passwordInput.removeAttribute("type")
        passwordInput.setAttribute("type", "text")
        break;
      case e.target.src === eyeCloseSVG:
        viewPasswordSVG.src = eyeOpenSVG
        passwordInput.removeAttribute("type")
        passwordInput.setAttribute("type", "password")
        break;
      default:
        break;
    }
  })
  passwordGroup.classList.add("password-group")
  errorContainer.classList.add('error-container')
  errorMsg.classList.add('error-msg')

  loginControls.classList.add('login-controls')
  loginBtn.classList.add("sign-in_btn")
  loginBtn.setAttribute('type', 'button')
  loginBtn.setAttribute("form", "login")
  loginBtn.textContent = "Sign In" 
  loginBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    loginValidation(usernameInput.value, passwordInput.value);
    return false;
  })
  cancelBtn.classList.add("cancel_btn")
  cancelBtn.setAttribute('type', 'button')
  cancelBtn.textContent = "Cancel" 
  cancelBtn.addEventListener('click', ()=>{
    document.querySelector("dialog").remove()
  })

  body.appendChild(dialog)
  dialog.appendChild(dialogContainer)
  dialogContainer.appendChild(userSVG)
  dialogContainer.appendChild(welcomeMsg)
  dialogContainer.appendChild(loginForm)
  loginForm.appendChild(usernameInput)
  loginForm.appendChild(passwordGroup)
  passwordGroup.appendChild(passwordInput)
  passwordGroup.appendChild(viewPasswordSVG)
  loginForm.appendChild(errorContainer)
  errorContainer.appendChild(errorMsg)
  loginForm.appendChild(loginControls)
  loginControls.appendChild(loginBtn)
  loginControls.appendChild(cancelBtn)
  dialogContainer.appendChild(noAccount)
  noAccount.appendChild(linkSpan)
  linkSpan.appendChild(signupLink)
}