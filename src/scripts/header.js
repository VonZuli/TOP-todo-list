//imports
import { imagepath } from ".."
import { initHomepage } from "./init"
import { login } from "./login"

export function createHeader(username) {
  const loginSVG = new Image()
  const titleSVG = new Image()
  loginSVG.src = imagepath('./svg/square-user.svg')
  titleSVG.src = imagepath('./png/title-image_yl-dark.png')
  const loginBtn = document.createElement("button")
  const welcomeMsgArr = [
    `Welcome, ${username}! Begin your magical productivity journey.`,
    `Greetings, ${username}! Transform tasks into enchanted quests.`,
    `Hail, ${username}! Your productivity spells await your command.`,
    `Salutations, ${username}! Conquer tasks with wizardly precision.`,
    `Welcome, ${username}! Embark on your magical task journey.`,
    `Ahoy, ${username}! Begin your spellbinding productivity quest.`,
    `Greetings, ${username}! Unleash the magic of productivity.`,
    `Welcome, ${username}! Start your mystical task adventure.`,
    `Salutations, ${username}! Embrace magical productivity now.`,
    `Hail, ${username}! Begin your legendary task quest.`
  ]

  const header = document.querySelector('header')
  header.innerHTML = ""
  loginBtn.innerHTML = 'Login'
  loginBtn.classList.add('loginBtn')
  loginSVG.classList.add('loginSVG')
  loginBtn.addEventListener('click', login)
  // titleSVG.addEventListener('click', initHomepage)

  header.appendChild(titleSVG)
  if (typeof username !== "undefined") {
    const title = document.createElement('h1')
    title.textContent = `${welcomeMsgArr[Math.floor(Math.random()*welcomeMsgArr.length)]}`
    header.appendChild(title)
  }
  header.appendChild(loginBtn)
  loginBtn.append(loginSVG)
}



