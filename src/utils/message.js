const start = () => {
  window.parent.postMessage({ type: 'sycret', status: 'start' }, '*')
}

const finish = () => {
  window.parent.postMessage({ type: 'sycret', status: 'finish' }, '*')
}

export const PostMessage = {
  start,
  finish,
}
