export default class AlertFactory {
  static instance
  static destroyFns = []

  constructor() {}

  static getInstance() {
    if (!AlertFactory.instance) {
      AlertFactory.instance = new AlertFactory()
    }
    return AlertFactory.instance
  }

  static destroyAll() {
    if (!this.destroyFns) return

    while (this.destroyFns.length) {
      const onClose = this.destroyFns.pop()
      if (onClose) {
        onClose()
      }
    }
  }
}
