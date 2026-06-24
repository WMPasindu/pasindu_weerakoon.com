import { useMemo, useState } from 'react'
import { Carousel, Image, Segmented, Tag, Typography } from 'antd'
import { PictureOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/animations/PageTransition'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/animations/Reveal'
import { gallery, galleryTags } from '@/data/gallery'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const { Title, Paragraph } = Typography

export function GalleryPage() {
  useDocumentTitle('Gallery')
  const [tag, setTag] = useState<string>('All')

  const visible = useMemo(
    () =>
      tag === 'All' ? gallery : gallery.filter((g) => g.tags.includes(tag)),
    [tag],
  )

  return (
    <PageTransition>
      <Section>
        <SectionHeading
          eyebrow="Gallery"
          title="Moments & visuals"
          subtitle="A curated collection of images from the work and the life around it — each with a short story."
        />

        <Reveal>
          <div className="filter-bar">
            <Segmented
              size="large"
              value={tag}
              onChange={(value) => setTag(value as string)}
              options={['All', ...galleryTags]}
            />
          </div>
        </Reveal>

        <Image.PreviewGroup>
          <div className="masonry">
            {visible.map((image, index) => (
              <motion.figure
                key={image.id}
                className={`masonry__item masonry__item--${image.span ?? 'normal'}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.06 }}
              >
                <div className="masonry__media">
                  {image.images.length > 1 ? (
                    <div className="masonry__carousel">
                      <span className="masonry__count">
                        <PictureOutlined /> {image.images.length}
                      </span>
                      <Carousel autoplay autoplaySpeed={3500} draggable dots>
                        {image.images.map((src) => (
                          <div key={src}>
                            <Image
                              src={src}
                              alt={image.title}
                              rootClassName="masonry__image"
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  ) : (
                    <Image
                      src={image.images[0]}
                      alt={image.title}
                      rootClassName="masonry__image"
                    />
                  )}
                </div>
                <figcaption className="masonry__caption">
                  <Title level={5} style={{ marginBottom: 4 }}>
                    {image.title}
                  </Title>
                  <Paragraph type="secondary" style={{ marginBottom: 8 }}>
                    {image.description}
                  </Paragraph>
                  <div>
                    {image.tags.map((t) => (
                      <Tag key={t} bordered={false}>
                        {t}
                      </Tag>
                    ))}
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </Image.PreviewGroup>
      </Section>
    </PageTransition>
  )
}
