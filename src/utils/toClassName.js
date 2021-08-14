export const cl = (classes) => {
  if (Array.isArray(classes)) {
    return classes.filter(Boolean).join(' ')
  }
  if (typeof classes === 'object') {
    return Object.keys(classes)
      .filter((key) => classes[key])
      .join(' ')
  }
  return classes
}
