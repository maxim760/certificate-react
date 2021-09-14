export const parseQueryParams = (url) => {
  return Object.fromEntries(new URL(url).searchParams)
}
