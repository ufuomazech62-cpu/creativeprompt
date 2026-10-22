import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function GrainDrift({ className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext && canvas.getContext('2d')
    if (!ctx) return
    const W = (canvas.width = 480)
    const H = (canvas.height = 240)
    let raf
    const drifters = Array.from({ length: 60 }, (_, i) => ({
      x: (i * 89) % W,
      y: (i * 57) % H,
      r: 0.6 + (i % 5) * 0.35,
      vx: 0.12 + (i % 7) * 0.02,
    }))
    let t = 0
    const draw = () => {
      t += 1
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      for (const d of drifters) {
        d.x = (d.x + d.vx) % W
        ctx.globalAlpha = 0.25 + 0.2 * Math.sin(t / 40 + d.y / 24) ** 2
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <canvas
      ref={ref}
      data-testid="bg-grain-drift"
      className={`drift h-40 w-full rounded-xl border border-edge ${className}`}
    />
  )
}

export default function Backgrounds() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <Link to="/" data-testid="back-link" className="text-sm text-zinc-400 transition hover:text-white">
        ← Back to gallery
      </Link>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-white">Animated backgrounds</h1>
      <p className="mt-3 max-w-xl text-zinc-400">
        Original motion kits built with pure CSS and canvas — drop them behind a hero and let
        them run.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <figure>
          <div
            data-testid="bg-aurora"
            className="aurora shimmer animate-aurora h-40 w-full rounded-xl border border-edge"
          />
          <figcaption className="mt-2 text-sm text-zinc-400">Aurora gradient (CSS)</figcaption>
        </figure>
        <figure>
          <GrainDrift />
          <figcaption className="mt-2 text-sm text-zinc-400">Grain drift (canvas)</figcaption>
        </figure>
        <figure>
          <div
            data-testid="bg-star-parallax"
            className="star-parallax h-40 w-full overflow-hidden rounded-xl border border-edge"
          >
            <div className="layer-a h-full w-full" />
            <div className="layer-b h-full w-full" />
          </div>
          <figcaption className="mt-2 text-sm text-zinc-400">Star parallax (CSS)</figcaption>
        </figure>
      </div>
    </main>
  )
}
