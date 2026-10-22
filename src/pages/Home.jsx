import { useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar.jsx'
import PromptCard from '../components/PromptCard.jsx'
import { filterPrompts } from '../lib/promptLibrary.js'
import { SITE_NAME, TAGLINE } from '../data/site.js'

export default function Home() {
  const [value, setValue] = useState({ sortBy: 'featured' })
  const prompts = useMemo(() => filterPrompts(value), [value])

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16">
      <section className="py-16 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-accent-soft">
          Fresh drops, ready to paste
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Unlock your {SITE_NAME} superpowers
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">{TAGLINE}</p>
      </section>

      <FilterBar value={value} onChange={setValue} />

      <section
        data-testid="prompt-grid"
        className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {prompts.map((p) => (
          <PromptCard key={p.id} prompt={p} />
        ))}
      </section>
    </main>
  )
}
