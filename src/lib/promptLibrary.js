import data from '../data/prompts.json'

export const CATEGORIES = ['SaaS', 'Portfolio', '3D', 'Fintech', 'Agency', 'Ecommerce']
export const TIERS = ['free', 'premium']

export function getPrompts() {
  return data
}

export function getPromptById(id) {
  return data.find((p) => p.id === id) ?? null
}

function byRecentDesc(a, b) {
  if (a.addedAt !== b.addedAt) return a.addedAt < b.addedAt ? 1 : -1
  return a.id > b.id ? -1 : 1
}

export function filterPrompts({ category, tier, sortBy } = {}) {
  let rows = data

  if (category !== undefined && category !== null && category !== '') {
    if (!CATEGORIES.includes(category)) return []
    rows = rows.filter((p) => p.category === category)
  }

  if (tier !== undefined && tier !== null && tier !== '') {
    if (!TIERS.includes(tier)) return []
    rows = rows.filter((p) => p.tier === tier)
  }

  switch (sortBy) {
    case 'featured': {
      const featured = rows.filter((p) => p.featured === true)
      const rest = rows.filter((p) => p.featured !== true)
      return [...featured, ...rest]
    }
    case 'popular':
      return [...rows].sort((a, b) => b.popularity - a.popularity)
    case 'recent':
      return [...rows].sort(byRecentDesc)
    default:
      return rows
  }
}
