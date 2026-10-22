import { CATEGORIES, TIERS } from '../lib/promptLibrary.js'

const SORTS = [
  { key: 'featured', label: 'Featured' },
  { key: 'popular', label: 'Popular' },
  { key: 'recent', label: 'Recent' },
]

export default function FilterBar({ value, onChange }) {
  const toggleCategory = (category) => {
    onChange({ ...value, category: value.category === category ? undefined : category })
  }
  const setSort = (sortBy) => onChange({ ...value, sortBy })
  const setTier = (tier) =>
    onChange({ ...value, tier: tier === 'all' ? undefined : tier })

  return (
    <div className="flex flex-col gap-4" data-testid="filter-bar">
      <div className="flex flex-wrap items-center gap-2" data-testid="category-chips">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            data-testid={`chip-${c}`}
            onClick={() => toggleCategory(c)}
            className={
              'rounded-full border px-4 py-1.5 text-sm transition ' +
              (value.category === c
                ? 'border-accent bg-accent text-white'
                : 'border-edge bg-panel text-zinc-300 hover:border-zinc-500')
            }
          >
            {c}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-full border border-edge bg-panel p-1" data-testid="sort-tabs">
          {SORTS.map((s) => (
            <button
              key={s.key}
              type="button"
              data-testid={`sort-${s.key}`}
              onClick={() => setSort(s.key)}
              className={
                'rounded-full px-4 py-1 text-sm transition ' +
                (value.sortBy === s.key ? 'bg-accent text-white' : 'text-zinc-300 hover:text-white')
              }
            >
              {s.label}
            </button>
          ))}
        </div>
        <select
          data-testid="tier-select"
          value={value.tier ?? 'all'}
          onChange={(e) => setTier(e.target.value)}
          className="rounded-full border border-edge bg-panel px-3 py-1.5 text-sm text-zinc-300"
        >
          <option value="all">All tiers</option>
          {TIERS.map((t) => (
            <option key={t} value={t}>
              {t === 'free' ? 'Free' : 'Premium'}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
