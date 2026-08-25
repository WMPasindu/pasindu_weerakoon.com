import { useState } from 'react'
import { App, Button, Col, Form, Input, Row, Typography } from 'antd'
import {
  MailOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/animations/Reveal'
import { SocialLinks } from '@/components/common/SocialLinks'
import { profile } from '@/data/profile'

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

interface ContactValues {
  name: string
  email: string
  subject: string
  message: string
}

/** Contact details plus a working enquiry form (delivered via Web3Forms). */
export function ContactSection() {
  const { message } = App.useApp()
  const [form] = Form.useForm<ContactValues>()
  const [submitting, setSubmitting] = useState(false)

  // Safe to expose in the client; it only authorises delivery, not the account.
  const accessKey =
    (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) ||
    'd101a47a-bea1-4740-a2c0-1097ec6d5860'

  const onFinish = async (values: ContactValues) => {
    setSubmitting(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: values.name,
          email: values.email,
          subject: `Portfolio enquiry: ${values.subject}`,
          message: values.message,
          from_name: 'Portfolio Contact Form',
          replyto: values.email,
        }),
      })
      const data = await res.json()
      if (data.success) {
        message.success('Thanks! Your message has been sent — I’ll reply soon.')
        form.resetFields()
      } else {
        message.error('Sorry, something went wrong. Please email me directly.')
      }
    } catch {
      message.error('Network error. Please email me directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Section id="contact">
      <SectionHeading
        index="06"
        eyebrow="Contact"
        title="Let’s talk"
        subtitle="Have a role, a project, or just want to say hello? Drop me a line."
        align="center"
      />

      <Row gutter={[48, 48]}>
        <Col xs={24} md={10}>
          <Reveal>
            <div className="contact-info">
              <Title level={4}>Reach me directly</Title>
              <Paragraph type="secondary">
                I read every message and reply within a couple of days.
              </Paragraph>

              <a href={`mailto:${profile.email}`} className="contact-info__row">
                <MailOutlined />
                <span>{profile.email}</span>
              </a>
              {profile.phone && (
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                  className="contact-info__row"
                >
                  <PhoneOutlined />
                  <span>{profile.phone}</span>
                </a>
              )}
              <div className="contact-info__row">
                <EnvironmentOutlined />
                <span>{profile.location}</span>
              </div>

              <Text type="secondary" style={{ display: 'block', marginTop: 24 }}>
                Or find me on
              </Text>
              <div style={{ marginTop: 8 }}>
                <SocialLinks size="large" />
              </div>
            </div>
          </Reveal>
        </Col>

        <Col xs={24} md={14}>
          <Reveal>
            <Form
              form={form}
              layout="vertical"
              requiredMark="optional"
              onFinish={onFinish}
              className="contact-form"
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      { required: true, message: 'Please enter your name' },
                    ]}
                  >
                    <Input size="large" placeholder="Your name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' },
                    ]}
                  >
                    <Input size="large" placeholder="you@company.com" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: 'Please add a subject' }]}
              >
                <Input size="large" placeholder="A new opportunity" />
              </Form.Item>
              <Form.Item
                label="Message"
                name="message"
                rules={[
                  { required: true, message: 'Please write a message' },
                  { min: 10, message: 'A little more detail, please' },
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="Tell me about your project or role…"
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  htmlType="submit"
                  loading={submitting}
                  icon={<SendOutlined />}
                >
                  Send message
                </Button>
              </Form.Item>
            </Form>
          </Reveal>
        </Col>
      </Row>
    </Section>
  )
}
