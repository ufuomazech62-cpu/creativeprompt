import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'

function renderApp(initial) {
  return render(
    <MemoryRouter initialEntries={[initial]}>
      <App />
    </MemoryRouter>,
  )
}

beforeAll(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
  })
})

describe('PromptDetail', () => {
  test('shows title, description, and prompt text for a known id', () => {
    renderApp('/prompt/beaconstack')
    expect(screen.getByTestId('detail-title').textContent).toBe('Beaconstack')
    expect(screen.getByTestId('detail-description')).toBeInTheDocument()
    expect(screen.getByTestId('prompt-text')).toBeInTheDocument()
  })

  test('copy button flips to Copied! after clicking', async () => {
    const user = userEvent.setup()
    renderApp('/prompt/beaconstack')
    const button = screen.getByTestId('copy-button')
    expect(button.textContent).not.toBe('Copied!')
    await user.click(button)
    await waitFor(() => expect(button.textContent).toBe('Copied!'))
  })

  test('shows Copy failed when the clipboard rejects', async () => {
    const original = navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
      configurable: true,
    })
    try {
      const view = renderApp('/prompt/beaconstack')
      fireEvent.click(screen.getByTestId('copy-button'))
      await waitFor(() =>
        expect(screen.getByTestId('copy-button').textContent).toBe('Copy failed'),
      )
      view.unmount()
    } finally {
      Object.defineProperty(navigator, 'clipboard', { value: original, configurable: true })
    }
  })

  test('unknown id renders the not-found state', () => {
    renderApp('/prompt/nope')
    expect(screen.getByTestId('detail-notfound')).toBeInTheDocument()
  })
})
