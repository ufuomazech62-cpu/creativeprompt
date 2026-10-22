import { useParams, Link } from 'react-router-dom'
import { getPromptById } from '../lib/promptLibrary.js'
import { useCopy } from '../lib/useCopy.js'
import { FREE_TIER_LABEL, PREMIUM_TIER_LABEL } from '../data/site.js'

export default function PromptDetail() {
  const { id } = useParams()
  const prompt = getPromptById(id)
  const { copied, copy, error } = useCopy()

  if (!prompt) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 data-testid="detail-notfound" className="text-3xl font-bold text-white">
          Prompt not found
        </h1>
        <p className="mt-3 text-zinc-400">
          That prompt id does not exist in the gallery.
        </p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-accent px-5 py-2 text-white transition hover:bg-accent-soft">
          Back to gallery
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link to="/" className="text-sm text-zinc-400 transition hover:text-white">
        ← Back to gallery
      </Link>
      <div className="mt-6 flex items-center justify-between gap-4">
        <h1 data-testid="detail-title" className="text-4xl font-bold tracking-tight text-white">
          {prompt.title}
        </h1>
        <span className="rounded-full border border-edge bg-panel px-3 py-1 text-xs text-zinc-300">
          {prompt.tier === 'free' ? FREE_TIER_LABEL : PREMIUM_TIER_LABEL} · {prompt.category}
        </span>
      </div>
      <p data-testid="detail-description" className="mt-4 text-lg text-zinc-300">
        {prompt.description}
      </p>

      <section className="mt-8 rounded-2xl border border-edge bg-panel p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
            The prompt
          </h2>
          <button
            type="button"
            data-testid="copy-button"
            onClick={() => copy(prompt.prompt)}
            className={
              'rounded-full px-4 py-1.5 text-sm font-medium transition ' +
              (error
                ? 'bg-red-500/20 text-red-300'
                : copied
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-accent text-white hover:bg-accent-soft')
            }
          >
            {error ? 'Copy failed' : copied ? 'Copied!' : 'Copy prompt'}
          </button>
        </div>
        <pre
          data-testid="prompt-text"
          className="mt-4 max-h-[28rem] overflow-auto whitespace-pre-wrap font-mono text-sm leading-relaxed text-zinc-200"
        >
          {prompt.prompt}
        </pre>
      </section>
    </main>
  )
}
