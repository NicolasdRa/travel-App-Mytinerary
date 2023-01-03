import { useCallback, useEffect, useRef } from 'react'

export const useTimeOut = (callback: any, delay: number) => {
  const callbacRef = useRef(callback)
  const timeOutRef = useRef<any>()

  // updates the callback if it changes
  useEffect(() => {
    callbacRef.current = callback
  }, [callback])

  // set up the timeout
  const set = useCallback(() => {
    timeOutRef.current = setTimeout(() => callbacRef.current(), delay)
  }, [delay])

  // clear the timeout
  const clear = useCallback(() => {
    timeOutRef.current && clearTimeout(timeOutRef.current)
  }, [])

  // start the timeout
  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}
