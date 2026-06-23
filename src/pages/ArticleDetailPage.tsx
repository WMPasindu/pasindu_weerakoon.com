import { Link, Navigate, useParams } from 'react-router-dom'
import { Button, Divider, Space, Tag, Typography } from 'antd'
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import { PageTransition } from '@/components/animations/PageTransition'
import { Container } from '@/components/common/Container'
import { Cover } from '@/components/common/Cover'
import { MarkdownRenderer } from '@/components/feature/MarkdownRenderer'
import { ArticleCard } from '@/components/feature/ArticleCard'
import { ShareButtons } from '@/components/feature/ShareButtons'
import { Reveal } from '@/components/animations/Reveal'
import { articles, getArticleBySlug } from '@/data/articles'
import { formatDate, formatReadingTime } from '@/utils/format'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const { Title, Text, Paragraph } = Typography

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined

  useDocumentTitle(article?.title, article?.description)

  if (!article) {
    return <Navigate to="/articles" replace />
  }

  const related = articles
    .filter((a) => a.slug !== article.slug)
    .filter((a) => a.tags.some((tag) => article.tags.includes(tag)))
    .slice(0, 2)

  return (
    <PageTransition>
      <article>
        <Container
          size="narrow"
          style={{ paddingTop: 'clamp(40px, 7vw, 80px)' }}
        >
          <Button type="text" className="back-link">
            <Link to="/articles">
              <ArrowLeftOutlined /> All articles
            </Link>
          </Button>

          <Reveal>
            <Space size={[6, 6]} wrap style={{ marginTop: 16 }}>
              {article.tags.map((tag) => (
                <Tag key={tag} bordered={false}>
                  {tag}
                </Tag>
              ))}
            </Space>
            <Title level={1} style={{ marginTop: 12 }}>
              {article.title}
            </Title>
            <Paragraph type="secondary" style={{ fontSize: 18 }}>
              {article.description}
            </Paragraph>
            <Space split="·" className="article-detail__meta">
              <Text type="secondary">
                <CalendarOutlined /> {formatDate(article.date)}
              </Text>
              <Text type="secondary">
                <ClockCircleOutlined />{' '}
                {formatReadingTime(article.readingMinutes)}
              </Text>
            </Space>
            <ShareButtons title={article.title} />
          </Reveal>
        </Container>

        <Container
          size="narrow"
          style={{ marginBlock: 'clamp(28px, 5vw, 48px)' }}
        >
          <Reveal>
            <Cover
              source={article.cover}
              alt={article.title}
              aspectRatio="21 / 9"
              style={{ borderRadius: 18 }}
            />
          </Reveal>
        </Container>

        <Container size="narrow">
          <MarkdownRenderer content={article.body} />
        </Container>
      </article>

      {related.length > 0 && (
        <Container
          size="narrow"
          style={{ marginBottom: 'clamp(56px, 9vw, 112px)' }}
        >
          <Divider />
          <Title level={3} style={{ marginBottom: 24 }}>
            Keep reading
          </Title>
          <div className="related-grid">
            {related.map((item) => (
              <div className="grid-cell" key={item.slug}>
                <ArticleCard article={item} />
              </div>
            ))}
          </div>
        </Container>
      )}
    </PageTransition>
  )
}
