//factory function to create DOM elements
export const createElem = (tag, attr, ...children)=>{
  const el = document.createElement(tag)

  for (const key in attr) {
    el.setAttribute(key, attr[key])
  }

  children.forEach(child=>{
    typeof child === "string" ? 
    el.appendChild(document.createTextNode(child)) :
    el.appendChild(child)
  })
  return el
}