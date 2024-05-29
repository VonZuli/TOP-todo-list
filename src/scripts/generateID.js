
export const generateId = () => {
  const id = new Date().getTime()
  const itemId = id.toString(16).slice(2);

  return itemId
}