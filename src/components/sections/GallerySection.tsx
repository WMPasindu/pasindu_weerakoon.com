import { useState } from 'react'
import { Image } from 'antd'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { gallery } from '@/data/gallery'

/** Every photo, flattened out of its collection, in display order. */
const photos = gallery.flatMap((item) =>
  item.images.map((src) => ({ src, title: item.title })),
)

/**
 * Horizontal, continuously scrolling photo strip. The track holds two copies
 * of the set so the loop is seamless; it pauses on hover/focus, and clicking a
 * photo opens the full-size preview.
 */
export function GallerySection() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(0)

  const openAt = (index: number) => {
    setCurrent(index % photos.length)
    setOpen(true)
  }

  return (
    <Section id="gallery" muted>
      <SectionHeading
        eyebrow="Gallery"
        title="Moments"
        subtitle="A few snapshots from the work and the life around it."
        align="center"
      />

      <div className="strip" aria-label="Photo gallery">
        <div className="strip__track">
          {[0, 1].map((copy) =>
            photos.map((photo, index) => (
              <button
                type="button"
                className="strip__item"
                key={`${copy}-${photo.src}`}
                onClick={() => openAt(index)}
                aria-hidden={copy === 1 ? true : undefined}
                tabIndex={copy === 1 ? -1 : 0}
                aria-label={`View photo: ${photo.title}`}
              >
                <img src={photo.src} alt={copy === 0 ? photo.title : ''} loading="lazy" />
                <span className="strip__caption">{photo.title}</span>
              </button>
            )),
          )}
        </div>
      </div>

      {/* Full-size preview, driven by the strip. */}
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          items={photos.map((p) => p.src)}
          preview={{
            visible: open,
            current,
            onVisibleChange: (value) => setOpen(value),
            onChange: (index) => setCurrent(index),
          }}
        />
      </div>
    </Section>
  )
}
