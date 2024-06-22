//factory function to create DOM elements
export const createElem = (tag, attr, listeners, ...children)=>{
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

export const createListenerElem = (tag, attr, listeners, ...children)=>{
  const el = document.createElement(tag)

  for (const key in attr) {
    el.setAttribute(key, attr[key])
  }

  for (const event in listeners) {
    el.addEventListener(event, listeners[event]);
  }
  
  children.forEach(child=>{
    typeof child === "string" ? 
    el.appendChild(document.createTextNode(child)) :
    el.appendChild(child)
  })
  return el
}