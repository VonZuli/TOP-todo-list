//imports
import {imagepath} from '..'
import { loginValidation } from './validation'
import {registration} from './registration'
import { createElem } from './factory'
export function login() {

  const body = document.querySelector("body") 

  let eyeOpenSVG = imagepath('./svg/eye-open.svg')
  let eyeCloseSVG = imagepath('./svg/eye-closed.svg')

  let loginObj = {}

  body.appendChild(createElem("dialog", {class:"login_dialog"},
    createElem("div",{class:"login-container"},
      createElem("img",{src:imagepath('./svg/user-login.svg')}),
      createElem("h2", {class:"welcomeMsg"},"Please sign in"),
      createElem("form", {id:"login", class: "login-form", action:"#"},
        createElem("input", {autofocus:"", class:"username_txt", type:"text", placeholder:"Username", name:"Username"}),
        createElem("div",{class: "password-group"}, 
          createElem("input", {class:"password_txt", type:"password", placeholder:"Password", name:"Password"}),
          createElem("img",{class:"view-password", src:imagepath('./svg/eye-open.svg')})),
        createElem("div", {class:"error-container"}, 
          createElem("p",{class:"error-msg"})), 
        createElem("div", {class:"login-controls"}, 
          createElem("button",{class:"sign-in_btn", type:"submit", form:"login"},"Sign In"), 
          createElem("button",{class:"cancel_btn", type:""},"Cancel"))),
    )
  ));

  let usernameInput = document.querySelector(".username_txt")
  let passwordInput = document.querySelector(".password_txt")
  let viewPasswordSVG = document.querySelector(".view-password")

  const noAccount = document.createElement('p')
  const linkSpan = document.createElement('span')
  const signupLink = document.createElement('a')

  signupLink.href = '#'
  signupLink.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector("dialog").remove()
    registration()
  })

  const linkText = 'here.'
  signupLink.textContent = linkText
  noAccount.textContent = `Don't have an account? Click `

  document.querySelector(".login-container").appendChild(noAccount)
  noAccount.appendChild(linkSpan)
  linkSpan.appendChild(signupLink)
  
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

  function handleLogin(e){
    e.preventDefault()

    loginValidation(usernameInput.value, passwordInput.value)
    //log the user in
  }
  document.querySelector(".sign-in_btn").addEventListener('click', handleLogin)

  document.querySelector(".cancel_btn").addEventListener('click', ()=>{
    document.querySelector("dialog").remove()
  })


}