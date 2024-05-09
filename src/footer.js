//imports

export function createFooter() {
  let footer = document.querySelector('footer')
  let copyright = document.createElement('h4')

  copyright.textContent = 'Mike Camenzuli ©2024'

  footer.appendChild(copyright)
}