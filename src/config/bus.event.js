class EventBus {
  constructor() {
    this.listeners = new Map()
  }

  $on(event, handler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }

    this.listeners.get(event).add(handler)
  }

  $off(event, handler) {
    if (handler) {
      this.listeners.get(event)?.delete(handler)
    } else {
      this.listeners.delete(event)
    }
  }

  $emit(event, ...args) {
    this.listeners.get(event)?.forEach(handler => handler(...args))
  }
}

const bus = new EventBus()

export default bus;