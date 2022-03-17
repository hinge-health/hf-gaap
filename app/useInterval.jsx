import { useEffect, useRef } from 'react'

export function useInterval(callback, delay) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
        savedCallback.current();
    }
    if (!delay && delay !== 0) {
      return
    }

    const id = setInterval(tick, delay)

    return () => clearInterval(id)
  }, [callback, delay])
}

export default useInterval
