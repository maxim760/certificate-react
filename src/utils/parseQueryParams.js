export const parseQueryParams = (url) => {
  const data = Object.fromEntries(new URL(url).searchParams)
  if (Object.keys(data).length === 0) {
    return null
  }
  return data
}
