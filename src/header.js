//imports


export function createHeader() {
  let user = "Mike's"
  let header = document.querySelector('header')
  let title = document.createElement('h1')

  title.textContent = `${user} Todo List`

  header.appendChild(title)
}

