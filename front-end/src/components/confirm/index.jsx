// https://github.com/ant-design/ant-design/blob/master/components/modal/confirm.tsx

import { createRoot } from "react-dom/client"

import { Alert } from "./alert"
import AlertFactory from "./alert-factory"

export const confirm = (config) => {
  const domNode = document.createDocumentFragment()
  const container = createRoot(domNode)

  AlertFactory.getInstance()

  let currentConfig = { ...config, onClose, open: true }

  function render({ ...props }) {
    clearTimeout(timeoutId)
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     *
     * Sync render blocks React event. Let's make this async.
     */
    var timeoutId = setTimeout(() => {
      container.render(<Alert {...props} />)
    })
  }

  function destroy() {
    for (let i = 0; i < AlertFactory.destroyFns.length; i++) {
      const fn = AlertFactory.destroyFns[i]
      if (fn === onClose) {
        AlertFactory.destroyFns.splice(i, 1)
        break
      }
    }

    // container.unmount()
  }

  function onClose() {
    currentConfig = {
      ...currentConfig,
      open: false,
    }
    destroy()
    render(currentConfig)
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
