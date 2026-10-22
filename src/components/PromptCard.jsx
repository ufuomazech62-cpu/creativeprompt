import { Link } from 'react-router-dom'
import { FREE_TIER_LABEL, PREMIUM_TIER_LABEL } from '../data/site.js'

const HUES = {
  SaaS: 'from-cyan-500/60 to-blue-700/60',
  Portfolio: 'from-amber-400/60 to-orange-700/60',
  '3D': 'from-violet-500/60 to-fuchsia-700/60',
  Fintech: 'from-emerald-400/60 to-teal-700/60',
  Agency: 'from-yellow-300/60 to-red-600/60',
  Ecommerce: 'from-orange-400/60 to-rose-700/60',
}

export default function PromptCard({ prompt }) {
  return (
    <Link
      to={`/prompt/${prompt.id}`}
      data-testid="prompt-card"
      className="group flex flex-col overflow-hidden rounded-2xl border border-edge bg-panel transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_12px_40px_-12px] hover:shadow-accent/30"
    >
      <div
        data-testid="card-art"
        className={`relative h-36 w-full bg-gradient-to-br ${HUES[prompt.category] ?? 'from-zinc-500/60 to-zinc-700/60'} transition duration-500 group-hover:scale-[1.04]`}
      >
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35)_0,transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.2)_0,transparent_45%)]" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 data-testid="card-title" className="font-semibold text-white">
            {prompt.title}
          </h3>
          <span
            data-testid="tier-badge"
            className={
              'rounded-full px-2.5 py-0.5 text-xs font-medium ' +
              (prompt.tier === 'free'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                : 'bg-accent/20 text-accent-soft border border-accent/40')
            }
          >
            {prompt.tier === 'free' ? FREE_TIER_LABEL : PREMIUM_TIER_LABEL}
          </span>
        </div>
        <p className="text-xs uppercase tracking-wider text-zinc-500">{prompt.category}</p>
        <p className="line-clamp-2 text-sm text-zinc-400">{prompt.description}</p>
      </div>
    </Link>
  )
}
