import { Carousel, Image, Space, Tag, Typography } from 'antd'
import { PictureOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { gallery } from '@/data/gallery'

const { Title, Paragraph } = Typography

/**
 * Personal gallery. Items with several images render as an auto-sliding,
 * swipeable collection; single images render as a photo. All are zoomable.
 */
export function GallerySection() {
  return (
    <Section id="gallery" muted>
      <SectionHeading
        eyebrow="Gallery"
        title="Moments"
        subtitle="A few snapshots from the work and the life around it."
      />

      <Image.PreviewGroup>
        <div className="masonry">
          {gallery.map((item, index) => (
            <motion.figure
              key={item.id}
              className={`masonry__item masonry__item--${item.span ?? 'normal'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.05 }}
            >
              <div className="masonry__media">
                {item.images.length > 1 ? (
                  <div className="masonry__carousel">
                    <span className="masonry__count">
                      <PictureOutlined /> {item.images.length}
                    </span>
                    <Carousel autoplay autoplaySpeed={3500} draggable dots>
                      {item.images.map((src) => (
                        <div key={src}>
                          <Image
                            src={src}
                            alt={item.title}
                            rootClassName="masonry__image"
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                ) : (
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    rootClassName="masonry__image"
                  />
                )}
              </div>
              <figcaption className="masonry__caption">
                <Title level={5} style={{ marginBottom: 4 }}>
                  {item.title}
                </Title>
                <Paragraph type="secondary" style={{ marginBottom: 8 }}>
                  {item.description}
                </Paragraph>
                <Space size={[6, 6]} wrap>
                  {item.tags.map((t) => (
                    <Tag key={t} bordered={false}>
                      {t}
                    </Tag>
                  ))}
                </Space>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Image.PreviewGroup>
    </Section>
  )
}
