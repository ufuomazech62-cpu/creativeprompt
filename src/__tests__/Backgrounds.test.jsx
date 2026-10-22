import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'

function renderBackgrounds() {
  return render(
    <MemoryRouter initialEntries={['/backgrounds']}>
      <App />
    </MemoryRouter>,
  )
}

describe('Backgrounds', () => {
  test('renders the three demo nodes with distinct testids and animation classes', () => {
    renderBackgrounds()
    for (const id of ['bg-aurora', 'bg-grain-drift', 'bg-star-parallax']) {
      const node = screen.getByTestId(id)
      expect(node.className).toMatch(/animate|drift|twinkle|parallax|shimmer/i)
    }
  })

  test('links back to the gallery', () => {
    renderBackgrounds()
    const back = screen.getByTestId('back-link')
    expect(back.getAttribute('href')).toBe('/')
  })
})
