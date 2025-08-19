import React from 'react'

export default function ButtonPanel({ buttons = [] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 12
    }}>
      {buttons.map((b, idx) => (
        <button
          key={idx}
          onClick={b.onClick}
          style={{
            padding: '10px 14px',
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            background: 'white',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
            textAlign: 'left'
          }}
        >
          {b.label}
        </button>
      ))}
    </div>
  )
}
