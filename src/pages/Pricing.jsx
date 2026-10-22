import { FREE_TIER_LABEL, PREMIUM_TIER_LABEL } from '../data/site.js'

export default function Pricing() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-center text-4xl font-bold tracking-tight text-white">Pricing</h1>
      <p className="mt-3 text-center text-zinc-400">
        Start free. Upgrade when you want the full shelf.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <section
          data-testid="tier-free"
          className="rounded-2xl border border-edge bg-panel p-6"
        >
          <h2 className="font-semibold text-white">{FREE_TIER_LABEL}</h2>
          <p className="mt-2 text-3xl font-bold text-white">$0</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            <li>6 free prompts, copy-ready</li>
            <li>Category &amp; sort filters</li>
            <li>3 animated backgrounds</li>
          </ul>
          <button
            type="button"
            className="mt-6 w-full rounded-full border border-accent/60 px-4 py-2 text-sm text-accent-soft transition hover:bg-accent/10"
          >
            Start free
          </button>
        </section>

        <section
          data-testid="tier-premium"
          className="rounded-2xl border border-accent/50 bg-panel p-6 shadow-[0_16px_50px_-20px] shadow-accent/40"
        >
          <h2 className="font-semibold text-white">{PREMIUM_TIER_LABEL}</h2>
          <p className="mt-2 text-3xl font-bold text-white">
            $12<span className="text-base text-zinc-400">/mo</span>
          </p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            <li>All 15 prompts, new drops monthly</li>
            <li>Full backgrounds library</li>
            <li>Commercial use in your builds</li>
          </ul>
          <button
            type="button"
            className="mt-6 w-full rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-soft"
          >
            Go Premium
          </button>
        </section>
      </div>
    </main>
  )
}
