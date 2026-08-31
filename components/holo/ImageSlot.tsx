'use client'

import { useRef, useState, type CSSProperties } from 'react'

// Lightweight stand-in for the design canvas's <image-slot> custom element.
// No backend/upload endpoint exists in this app, so a picked file is only
// previewed client-side (object URL) for the current session — it is not
// persisted or uploaded anywhere.
export default function ImageSlot({
  placeholder = 'Drop an image',
  shape = 'rect',
  style,
}: {
  placeholder?: string
  shape?: 'rect' | 'rounded' | 'circle'
  style?: CSSProperties
}) {
  const [url, setUrl] = useState<string | null>(null)
  const [over, setOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const pick = (file?: File | null) => {
    if (!file || !file.type.startsWith('image/')) return
    setUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
  }

  const borderRadius = shape === 'circle' ? '50%' : shape === 'rounded' ? 12 : 0

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); pick(e.dataTransfer.files?.[0]) }}
      style={{
        position: 'relative', width: '100%', height: '100%', minHeight: 44, cursor: 'pointer',
        borderRadius, overflow: 'hidden', background: url ? undefined : 'rgba(255,255,255,0.02)',
        border: over ? '2px solid #C8FF3D' : '1.5px dashed rgba(255,255,255,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', ...style,
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => pick(e.target.files?.[0])}
      />
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <span style={{ fontSize: 10.5, color: '#5A5A66', textAlign: 'center', padding: 6, lineHeight: 1.4 }}>{placeholder}</span>
      )}
    </div>
  )
}
