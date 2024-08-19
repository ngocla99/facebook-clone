// https://github.com/yairEO/react-hooks/blob/master/hooks/useDetectSticky.js
import React from "react"

/**
 * detects when a (CSS) sticky element changes "sticky" state
 * @param {object} ref optional react ref. if not provided, a new one will be used instead.
 * @param {object} observerSettings Observer's settings object
 */
export const useSticky = (ref, observerSettings = { threshold: [1] }) => {
  const [isSticky, setIsSticky] = React.useState(false)
  const newRef = React.useRef()
  ref ||= newRef

  // mount
  React.useEffect(() => {
    const cachedRef = ref.current,
      observer = new IntersectionObserver(
        ([e]) => setIsSticky(e.intersectionRatio < 1),
        observerSettings
      )

    observer.observe(cachedRef)

    // unmount
    return () => {
      observer.unobserve(cachedRef)
    }
  }, [])

  return { isSticky, ref }
}
