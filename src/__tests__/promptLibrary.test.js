import {
  getPrompts,
  filterPrompts,
  getPromptById,
  CATEGORIES,
  TIERS,
} from '../lib/promptLibrary.js'

const all = getPrompts()

describe('filterPrompts', () => {
  test('filters by each of the six categories, returning only matching entries', () => {
    for (const category of CATEGORIES) {
      const rows = filterPrompts({ category })
      expect(rows.length).toBeGreaterThan(0)
      expect(rows.every((p) => p.category === category)).toBe(true)
    }
  })

  test("tier 'free' returns exactly 6 entries, all free", () => {
    const rows = filterPrompts({ tier: 'free' })
    expect(rows).toHaveLength(6)
    expect(rows.every((p) => p.tier === 'free')).toBe(true)
  })

  test('filtering by an unknown category returns [] without throwing', () => {
    expect(filterPrompts({ category: 'Spaceships' })).toEqual([])
  })

  test('filtering by an unknown tier returns [] without throwing', () => {
    expect(filterPrompts({ tier: 'galactic' })).toEqual([])
  })

  test("sortBy 'featured' puts featured===true entries first", () => {
    const rows = filterPrompts({ sortBy: 'featured' })
    const firstFeatured = rows.findIndex((p) => p.featured)
    const lastPlain = rows.map((p) => !!p.featured).lastIndexOf(false)
    expect(firstFeatured).toBeLessThan(lastPlain)
  })

  test("sortBy 'popular' sorts by descending popularity", () => {
    const rows = filterPrompts({ sortBy: 'popular' })
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i - 1].popularity).toBeGreaterThanOrEqual(rows[i].popularity)
    }
  })

  test("sortBy 'recent' sorts by descending addedAt, id as tiebreak", () => {
    const rows = filterPrompts({ sortBy: 'recent' })
    for (let i = 1; i < rows.length; i++) {
      const a = rows[i - 1]
      const b = rows[i]
      if (a.addedAt === b.addedAt) {
        expect(a.id > b.id).toBe(true)
      } else {
        expect(a.addedAt > b.addedAt).toBe(true)
      }
    }
  })

  test('combines category and tier filters', () => {
    const rows = filterPrompts({ category: 'SaaS', tier: 'free' })
    expect(rows.length).toBeGreaterThan(0)
    expect(rows.every((p) => p.category === 'SaaS' && p.tier === 'free')).toBe(true)
  })

  test('no options returns all prompts', () => {
    expect(filterPrompts({})).toHaveLength(all.length)
  })
})

describe('getPromptById', () => {
  test('returns the matching prompt object', () => {
    const first = all[0]
    expect(getPromptById(first.id)).toEqual(first)
  })

  test("returns null for an unknown id ('nope')", () => {
    expect(getPromptById('nope')).toBeNull()
  })
})

describe('exports', () => {
  test('CATEGORIES has the six fixed values', () => {
    expect(CATEGORIES).toEqual([
      'SaaS',
      'Portfolio',
      '3D',
      'Fintech',
      'Agency',
      'Ecommerce',
    ])
  })

  test('TIERS is free and premium', () => {
    expect(TIERS).toEqual(['free', 'premium'])
  })
})
