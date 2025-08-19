import { useState } from 'react'

export default function FeatureSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className="feature-section">
      <div className="feature-section__header">
        <h2 className="feature-section__title">{title}</h2>
        <button
          type="button"
          className="feature-section__toggle"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
        >
          {open ? 'Hide' : 'Show'}
        </button>
      </div>
      {open ? (
        <div className="feature-section__content">
          {children}
        </div>
      ) : null}
    </section>
  )
}


