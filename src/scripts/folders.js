//#region imports

//#endregion imports



//user enters folder data
//user clicks add
//user data is appended to Folders list

export function addFolder() {
  const folderList = document.querySelector("#folder-content > ul")
  const listItem = document.createElement('li')
  const userInput = document.querySelector("#title")

  listItem.textContent = userInput.value
  folderList.appendChild(listItem)
}


//user clicks child of Folder header

function displayFolder() {

}
//Tasks section is updated with tasks assigned to that folder


//selected folder width expands out to show delete/edit opt
//
