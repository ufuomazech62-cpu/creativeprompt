import { SITE_NAME } from '../data/site.js'
import { Link } from 'react-router-dom'

const links = [
  { to: '/backgrounds', label: 'Backgrounds', testid: 'nav-backgrounds' },
  { to: '/pricing', label: 'Pricing', testid: 'nav-pricing' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-edge/60 bg-night/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight text-white">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_2px] shadow-accent/60" />
          {SITE_NAME}
        </Link>
        <div className="flex items-center gap-5 text-sm text-zinc-300">
          {links.map((l) => (
            <Link key={l.to} to={l.to} data-testid={l.testid} className="transition hover:text-white">
              {l.label}
            </Link>
          ))}
          <Link
            to="/"
            className="rounded-full bg-accent px-4 py-1.5 font-medium text-white transition hover:bg-accent-soft"
          >
            Browse prompts
          </Link>
        </div>
      </nav>
    </header>
  )
}
