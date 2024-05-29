import React from "react"

export const useClickOutside = (ref, func) => {
  React.useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return
      }

      func()
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}
