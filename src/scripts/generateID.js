
export const generateId = () => {
  const id = new Date().getTime()
  const itemId = id.toString(16).slice(2);

  return itemId
}

export const generateAccountId = () =>{
  const id = new Date().getTime()
  const accountId = id.toString(16).slice(2);

  return accountId
}