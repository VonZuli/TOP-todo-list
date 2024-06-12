//imports
import { imagepath } from "..";
export function createFooter() {
  let footer = document.querySelector('footer')
  let tagline = document.createElement('h4')
  const footerImg = new Image();
  footerImg.src = imagepath('./png/footerImg.png')
  tagline.textContent = 'Enchant Your Productivity Journey'
  footer.appendChild(footerImg)
  footer.appendChild(tagline)
}