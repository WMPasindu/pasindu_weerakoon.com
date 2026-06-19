import { Link } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { PageTransition } from '@/components/animations/PageTransition'
import { Section } from '@/components/common/Section'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const { Title, Paragraph } = Typography

export function NotFoundPage() {
  useDocumentTitle('Not found')

  return (
    <PageTransition>
      <Section>
        <div className="notfound">
          <span className="notfound__code gradient-text">404</span>
          <Title level={2}>This page wandered off.</Title>
          <Paragraph type="secondary" style={{ fontSize: 17 }}>
            The page you’re looking for doesn’t exist or has been moved.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            shape="round"
            icon={<HomeOutlined />}
          >
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </Section>
    </PageTransition>
  )
}
