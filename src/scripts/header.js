//imports
import { imagepath } from ".."
import { login } from "./login"

export function createHeader() {
  const loginSVG = new Image()
  loginSVG.src = imagepath('./svg/square-user.svg')
  const loginBtn = document.createElement("button")
  // username = login()
  // let user = username;

  const header = document.querySelector('header')
  const title = document.createElement('h1')

  title.textContent = "Let's get stuff done!"
  loginBtn.innerHTML = 'Login'
  loginBtn.classList.add('loginBtn')
  loginSVG.classList.add('loginSVG')
  loginBtn.addEventListener('click', login())


  header.appendChild(title)
  header.appendChild(loginBtn)
  loginBtn.append(loginSVG)
}

