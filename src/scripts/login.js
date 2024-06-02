//imports
import {imagepath} from '..'
import { loginValidation } from './validation'

export function login() {

  const userSVG = new Image()
  userSVG.src = imagepath('./svg/user-login.svg')
  const body = document.querySelector("body")
  const dialog = document.createElement("dialog")
  const dialogContainer = document.createElement("div")
  const welcomeMsg = document.createElement("h2")
  const loginForm = document.createElement("form")
  const usernameInput = document.createElement("input")
  const passwordInput = document.createElement("input")
  const loginControls = document.createElement('div')
  const signInBtn = document.createElement('button')
  const cancelBtn = document.createElement('button')
  const noAccount = document.createElement('p')
  const linkSpan = document.createElement('span')
  const signupLink = document.createElement('a')

  signupLink.href = '#'
  const linkText = 'here.'
  signupLink.textContent = linkText
  noAccount.textContent = `Don't have an account? Click `

  dialog.classList.add("login_dialog")
  dialogContainer.classList.add("login-container")

  welcomeMsg.classList.add("welcomeMsg")
  welcomeMsg.textContent = "Please sign in"

  loginForm.classList.add("login_form")
 
  usernameInput.setAttribute("autofocus", "")
  usernameInput.classList.add('username_txt')
  usernameInput.setAttribute("placeholder", "Username")
  passwordInput.classList.add('password_txt')
  passwordInput.setAttribute("placeholder", "Password")
  
  loginControls.classList.add('login-controls')
  signInBtn.classList.add("sign-in_btn")
  signInBtn.textContent = "Sign In" 
  signInBtn.addEventListener('submit', (e)=>{
    console.log(e);
    e.preventDefault();
    e.stopImmediatePropagation();
    loginValidation(usernameInput.value, passwordInput.value);
  })
  cancelBtn.classList.add("cancel_btn")
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
  loginForm.appendChild(passwordInput)
  loginForm.appendChild(loginControls)
  loginControls.appendChild(signInBtn)
  loginControls.appendChild(cancelBtn)
  dialogContainer.appendChild(noAccount)
  noAccount.appendChild(linkSpan)
  linkSpan.appendChild(signupLink)
}