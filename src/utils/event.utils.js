export function eventPathContainsId(event, id) {
  const path = typeof event.composedPath === 'function'
    ? event.composedPath()
    : getEventPath(event.target)

  return path.some(element => element && element.id === id)
}

function getEventPath(target) {
  const path = []
  let element = target

  while (element) {
    path.push(element)
    element = element.parentNode
  }

  return path
}
