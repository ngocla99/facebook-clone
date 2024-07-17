import ReactDOM from "react-dom"

import { Alert } from "./alert"
import AlertFactory from "./alert-factory"

// Note: replacing this one with container.unmount when updating to React 18
// function reactUnmount(container) {
//   ReactDOM.unmountComponentAtNode(container);
// }

export const alert = (config) => {
  const container = document.createDocumentFragment()
  AlertFactory.getInstance()

  let currentConfig = { ...config, onClose, open: true }

  function render({ ...props }) {
    /**
     * Sync render blocks React event. Let's make this async.
     */
    setTimeout(() => {
      ReactDOM.createRoot(container).render(<Alert {...props} />)
    })
  }

  // Remove store dialog in global state after close
  function destroy() {
    for (let i = 0; i < AlertFactory.destroyFns.length; i++) {
      const fn = AlertFactory.destroyFns[i]
      if (fn === onClose) {
        AlertFactory.destroyFns.splice(i, 1)
        break
      }
    }
  }

  function onClose() {
    currentConfig = {
      ...currentConfig,
      open: false,
    }
    render(currentConfig)
    destroy()
  }

  function update(configUpdate) {
    if (typeof configUpdate === "function") {
      currentConfig = configUpdate(currentConfig)
    } else {
      currentConfig = {
        ...currentConfig,
        ...configUpdate,
      }
    }
    render(currentConfig)
  }

  render(currentConfig)

  AlertFactory.destroyFns.push(onClose)

  return {
    destroy: onClose,
    update,
  }
}
