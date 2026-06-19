import { Link } from 'react-router-dom'
import { Card, Space, Tag, Typography } from 'antd'
import { ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { Cover } from '@/components/common/Cover'
import { formatDate, formatReadingTime } from '@/utils/format'
import type { Article } from '@/data/types'

const { Title, Paragraph, Text } = Typography

interface ArticleCardProps {
  article: Article
}

/** Card linking to a single article, used on the home and articles pages. */
export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ height: '100%' }}
    >
      <Link to={`/articles/${article.slug}`} className="article-card-link">
        <Card
          className="article-card"
          variant="borderless"
          styles={{ body: { padding: 0 } }}
        >
          <Cover
            source={article.cover}
            alt={article.title}
            aspectRatio="16 / 9"
          />
          <div className="article-card__body">
            <Space size={[6, 6]} wrap style={{ marginBottom: 12 }}>
              {article.tags.slice(0, 2).map((tag) => (
                <Tag key={tag} bordered={false}>
                  {tag}
                </Tag>
              ))}
            </Space>
            <Title level={4} style={{ marginBottom: 8 }}>
              {article.title}
            </Title>
            <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
              {article.description}
            </Paragraph>
            <Space split="·" size="small" className="article-card__meta">
              <Text type="secondary">
                <CalendarOutlined /> {formatDate(article.date)}
              </Text>
              <Text type="secondary">
                <ClockCircleOutlined />{' '}
                {formatReadingTime(article.readingMinutes)}
              </Text>
            </Space>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
