// https://stackoverflow.com/questions/73247936/how-to-dynamically-track-width-height-of-div-in-react-js

import React from "react"

export const useSize = (ref) => {
  const [width, setWidth] = React.useState()
  const [height, setHeight] = React.useState()

  React.useEffect(
    () => {
      if (!ref.current) {
        // we do not initialize the observer unless the ref has
        // been assigned
        return
      }

      // we also instantiate the resizeObserver and we pass
      // the event handler to the constructor
      const resizeObserver = new ResizeObserver(() => {
        if (ref.current.offsetWidth !== width) {
          setWidth(ref.current.offsetWidth)
        }
        if (ref.current.offsetHeight !== height) {
          setHeight(ref.current.offsetHeight)
        }
      })

      // the code in useEffect will be executed when the component
      // has mounted, so we are certain ref.current will contain
      // the div we want to observe
      resizeObserver.observe(ref.current)

      // if useEffect returns a function, it is called right before the
      // component unmounts, so it is the right place to stop observing
      // the div
      return function cleanup() {
        resizeObserver.disconnect()
      }
    },
    // only update the effect if the ref element changed
    [ref.current]
  )

  return { width, height }
}
