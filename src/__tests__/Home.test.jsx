import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import App from '../App.jsx'
import { CATEGORIES, getPrompts, filterPrompts } from '../lib/promptLibrary.js'

function renderApp(initial = '/') {
  return render(
    <MemoryRouter initialEntries={[initial]}>
      <App />
    </MemoryRouter>,
  )
}

describe('Home', () => {
  test('renders all 15 prompt cards with title and tier badge', () => {
    renderApp('/')
    expect(screen.getAllByTestId('prompt-card')).toHaveLength(15)
    expect(screen.getAllByTestId('card-title')).toHaveLength(15)
    expect(screen.getAllByTestId('tier-badge').length).toBe(15)
  })

  test('clicking a category chip reduces the grid to that category', async () => {
    const user = userEvent.setup()
    renderApp('/')
    for (const category of CATEGORIES) {
      await user.click(screen.getByTestId(`chip-${category}`))
      const expected = filterPrompts({ category }).length
      const cards = screen.getAllByTestId('prompt-card')
      expect(cards).toHaveLength(expected)
      expect(expected).toBeGreaterThanOrEqual(2)
    }
  })

  test('nav link to /pricing shows Free and Premium tiers with prices', async () => {
    const user = userEvent.setup()
    renderApp('/')
    await user.click(screen.getByTestId('nav-pricing'))
    const free = screen.getByTestId('tier-free')
    const premium = screen.getByTestId('tier-premium')
    expect(within(free).getByText('Free')).toBeInTheDocument()
    expect(within(premium).getByText(/\$/)).toBeInTheDocument()
  })
})
