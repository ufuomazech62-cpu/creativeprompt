import { useCallback, useEffect, useRef, useState } from 'react'

function fallbackCopy(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const ok = document.execCommand && document.execCommand('copy')
  document.body.removeChild(textarea)
  return ok
}

export function useCopy() {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(undefined)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const copy = useCallback(async (text) => {
    let succeeded = false
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
        succeeded = true
      } else if (fallbackCopy(text)) {
        succeeded = true
      }
    } catch {
      succeeded = false
    }

    if (succeeded) {
      setError(undefined)
      setCopied(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), 2000)
    } else {
      setError('failed')
      setCopied(false)
    }
  }, [])

  return { copied, copy, error }
}
