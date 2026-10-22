import { getPrompts, CATEGORIES } from '../lib/promptLibrary.js'

const all = getPrompts()
const REQUIRED_KEYS = [
  'id',
  'title',
  'category',
  'tier',
  'featured',
  'popularity',
  'addedAt',
  'description',
  'prompt',
]

describe('prompts data integrity', () => {
  test('contains exactly 15 prompts', () => {
    expect(all).toHaveLength(15)
  })

  test('every entry conforms to the data shape', () => {
    for (const p of all) {
      expect(Object.keys(p).sort()).toEqual([...REQUIRED_KEYS].sort())
      expect(typeof p.id).toBe('string')
      expect(p.id.length).toBeGreaterThan(0)
      expect(typeof p.title).toBe('string')
      expect(typeof p.description).toBe('string')
      expect(typeof p.prompt).toBe('string')
      expect(p.prompt.length).toBeGreaterThan(80)
      expect(typeof p.popularity).toBe('number')
      expect(p.addedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(typeof p.featured).toBe('boolean')
    }
  })

  test('ids are unique', () => {
    const ids = all.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('tier split is exactly 6 free / 9 premium', () => {
    expect(all.filter((p) => p.tier === 'free')).toHaveLength(6)
    expect(all.filter((p) => p.tier === 'premium')).toHaveLength(9)
  })

  test('every category belongs to CATEGORIES and has at least 2 prompts', () => {
    for (const p of all) {
      expect(CATEGORIES).toContain(p.category)
    }
    for (const category of CATEGORIES) {
      expect(all.filter((p) => p.category === category).length).toBeGreaterThanOrEqual(2)
    }
  })
})
