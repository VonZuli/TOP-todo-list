import {accountsArr} from "./registration"

export function createAccount(){
  localStorage.setItem("accounts", JSON.stringify(accountsArr))
}