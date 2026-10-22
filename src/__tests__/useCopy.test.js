import { renderHook, act } from '@testing-library/react'
import { useCopy } from '../lib/useCopy.js'

describe('useCopy', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  test('copies text and sets copied true, resetting after 2 seconds', async () => {
    vi.useFakeTimers()
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })

    const { result } = renderHook(() => useCopy())

    await act(async () => {
      await result.current.copy('hello prompt')
    })

    expect(writeText).toHaveBeenCalledWith('hello prompt')
    expect(result.current.copied).toBe(true)
    expect(result.current.error).toBeUndefined()

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.copied).toBe(false)
  })

  test('sets error failed and does not throw when the clipboard rejects', async () => {
    vi.useFakeTimers()
    const writeText = vi.fn().mockRejectedValue(new Error('denied'))
    vi.stubGlobal('navigator', { clipboard: { writeText } })

    const { result } = renderHook(() => useCopy())

    await act(async () => {
      await result.current.copy('nope')
    })

    expect(result.current.copied).toBe(false)
    expect(result.current.error).toBe('failed')
  })

  test('falls back to execCommand when clipboard API is missing', async () => {
    vi.useFakeTimers()
    const original = document.execCommand
    const execSpy = vi.fn().mockReturnValue(true)
    document.execCommand = execSpy
    try {
      const { result } = renderHook(() => useCopy())
      await act(async () => {
        await result.current.copy('fallback text')
      })
      expect(execSpy).toHaveBeenCalledWith('copy')
      expect(result.current.copied).toBe(true)
    } finally {
      document.execCommand = original
    }
  })
})
