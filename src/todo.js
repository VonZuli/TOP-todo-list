//imports

export function createToDoList(){
  let section = document.querySelector('section')
  let content = document.createElement('div')
  let subtitle = document.createElement('h2')

  subtitle.textContent = "Tasks"
  section.appendChild(content)
  content.appendChild(subtitle)
}