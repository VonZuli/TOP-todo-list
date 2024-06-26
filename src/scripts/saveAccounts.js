import { accounts } from "./init"

// export function saveFolders(){
//   localStorage.setItem("folders", JSON.stringify(folderArray))
// }

export function saveAccounts(updatedAccounts){
  localStorage.setItem("accounts", JSON.stringify(updatedAccounts))
}