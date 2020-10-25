export const getNodeENV = () => {
  return process.env.NODE_ENV
}

export function setStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getStorage(key) {
  try {
    const value = window.localStorage.getItem(key)
    return JSON.parse(value)
  } catch (err) {
    console.error(`Failed to get ${key} from localstorage`)
  }
}
