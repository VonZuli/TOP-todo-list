//imports
import { imagepath } from '..'
import { loginValidation } from './validation'
import { registration } from './registration'
import { createElem } from './factory'

export function login() {

  const body = document.querySelector("body") 
  const linkText = 'here.'
  let eyeOpenSVG = imagepath('./svg/eye-open.svg')
  let eyeCloseSVG = imagepath('./svg/eye-closed.svg')
  const loginSVG = imagepath('./svg/user-login.svg')

  let loginObj = {}

  body.appendChild(
    createElem("dialog", {class:"login_dialog"},
      createElem("div",{class:"login-container"},
        createElem("img",{src:loginSVG}),
        createElem("h2", {class:"welcomeMsg"},"Please sign in"),
        createElem("form", {id:"login", class: "login-form", action:"#"},
          createElem("input", {autofocus:"", class:"username_txt", type:"text", placeholder:"Username", name:"Username"}),
          createElem("div",{class: "password-group"}, 
            createElem("input", {class:"password_txt", type:"password", placeholder:"Password", name:"Password"}),
            createElem("img",{class:"view-password", src:imagepath('./svg/eye-open.svg')})
          ),
          createElem("div", {class:"error-container"}, 
            createElem("p",{class:"error-msg"})
          ), 
          createElem("div", {class:"login-controls"}, 
            createElem("button",{class:"sign-in_btn", type:"submit", form:"login"},"Sign In"), 
            createElem("button",{class:"cancel_btn", type:""},"Cancel")
          )
        ),
        createElem("p",{},`Don't have an account? Click `,
          createElem("span",{},
            createElem("a",{href: "#"},linkText)
          )
        )
      )
    )
  );

  document.querySelector(".login-container > p > span > a").addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector("dialog").remove()
    registration()
  })

  let usernameInput = document.querySelector(".username_txt")
  let passwordInput = document.querySelector(".password_txt")
  let viewPasswordSVG = document.querySelector(".view-password")
  
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

    //log the user in
    loginValidation(usernameInput.value, passwordInput.value)
  }
  document.querySelector(".sign-in_btn").addEventListener('click', handleLogin)

  document.querySelector(".cancel_btn").addEventListener('click', ()=>{
    document.querySelector("dialog").remove()
  })
}