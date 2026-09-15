export const ROBOTS_URL = 'https://jsonplaceholder.typicode.com/users'

export const apiCall = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Could not load robots (HTTP ${response.status})`)
  }
  return response.json()
}
