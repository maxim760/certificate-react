import hexRgb from 'hex-rgb'

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

export const toEmotion = (classes) => {
  if (Array.isArray(classes)) {
    return classes.filter(Boolean)
  }
  if (typeof classes === 'object') {
    return Object.keys(classes).filter((key) => classes[key])
  }
  return classes
}

export const toRgba = (hex, alpha) => {
  const rgb = hexRgb(hex, { format: 'array' }).slice(0, -1).join(',')
  return `rgba(${rgb},${alpha})`
}
