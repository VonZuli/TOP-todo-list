//imports
import { imagepath } from ".."
import { initHomepage } from "./init"
import { login } from "./login"

export function createHeader() {
  const loginSVG = new Image()
  const titleSVG = new Image()
  loginSVG.src = imagepath('./svg/square-user.svg')
  titleSVG.src = imagepath('./png/title-image_yl-dark.png')
  const loginBtn = document.createElement("button")

  const header = document.querySelector('header')
  // const title = document.createElement('h1')

  // title.textContent = "Let's get stuff done!"
  loginBtn.innerHTML = 'Login'
  loginBtn.classList.add('loginBtn')
  loginSVG.classList.add('loginSVG')
  loginBtn.addEventListener('click', login)
  // titleSVG.addEventListener('click', initHomepage)

  header.appendChild(titleSVG)
  header.appendChild(loginBtn)
  loginBtn.append(loginSVG)
}

// export function createRegistrationHeader(){
//   const header = document.querySelector('header')
//   const title = document.createElement('h1')

//   title.textContent = "Let's get stuff done!"
//   header.appendChild(title)
// }

