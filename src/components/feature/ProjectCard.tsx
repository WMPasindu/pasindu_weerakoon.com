import { Button, Card, Space, Tag, Typography } from 'antd'
import {
  LinkOutlined,
  GithubOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { Cover } from '@/components/common/Cover'
import type { Project } from '@/data/types'

const { Title, Paragraph, Text } = Typography

interface ProjectCardProps {
  project: Project
}

/** Rich project card with a generated cover, metrics, tags and links. */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ height: '100%' }}
    >
      <Card
        className="project-card"
        variant="borderless"
        styles={{ body: { padding: 0 } }}
      >
        <Cover source={project.cover} alt={project.title}>
          <span className="project-card__category">{project.category}</span>
        </Cover>

        <div className="project-card__body">
          <Title level={4} style={{ marginBottom: 6 }}>
            {project.title}
          </Title>
          <Paragraph type="secondary" style={{ marginBottom: 16 }}>
            {project.summary}
          </Paragraph>

          {project.metrics && (
            <div className="project-card__metrics">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <Text strong className="project-card__metric-value">
                    {metric.value}
                  </Text>
                  <Text type="secondary" className="project-card__metric-label">
                    {metric.label}
                  </Text>
                </div>
              ))}
            </div>
          )}

          <Space size={[6, 6]} wrap style={{ marginBlock: 16 }}>
            {project.tags.map((tag) => (
              <Tag key={tag} bordered={false}>
                {tag}
              </Tag>
            ))}
          </Space>

          <Space>
            {project.links.live && (
              <Button
                type="primary"
                size="small"
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                icon={<LinkOutlined />}
              >
                Live
              </Button>
            )}
            {project.links.repo && (
              <Button
                size="small"
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                icon={<GithubOutlined />}
              >
                Code
              </Button>
            )}
            {project.links.caseStudy && (
              <Button
                size="small"
                type="text"
                href={project.links.caseStudy}
                icon={<ReadOutlined />}
              >
                Case study
              </Button>
            )}
            {project.clientProject &&
              !project.links.live &&
              !project.links.repo && (
                <Text type="secondary" className="project-card__client">
                  <SafetyCertificateOutlined /> Client project
                </Text>
              )}
          </Space>
        </div>
      </Card>
    </motion.div>
  )
}
