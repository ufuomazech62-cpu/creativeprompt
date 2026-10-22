import { SITE_NAME, TAGLINE } from '../data/site.js'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-edge/60 bg-panel/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-white">{SITE_NAME}</p>
          <p className="mt-1 max-w-sm">{TAGLINE}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Link to="/" className="transition hover:text-white">Gallery</Link>
          <Link to="/backgrounds" className="transition hover:text-white">Backgrounds</Link>
          <Link to="/pricing" className="transition hover:text-white">Pricing</Link>
          <a href="mailto:hello@example.com" className="transition hover:text-white">
            Contact — hello@example.com
          </a>
        </div>
      </div>
      <p className="border-t border-edge/40 px-4 py-3 text-center text-xs text-zinc-500">
        © 2026 {SITE_NAME}. Prompts are yours to use in the tool of your choice.
      </p>
    </footer>
  )
}
