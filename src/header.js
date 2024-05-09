//imports


export function createHeader() {
  // let body = document.querySelector("body")
  let header = document.querySelector('header')
  let title = document.createElement('h1')

  title.textContent = 'Mike'

  // body.appendChild(header)
  header.appendChild(title)
}

