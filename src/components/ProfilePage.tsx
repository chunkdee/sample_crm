import React, { useState } from 'react';
import { Card, Row, Col, Avatar, Typography, Tabs, Form, Input, Button, Upload, List, Timeline, Divider } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { useGetIdentity } from 'ra-core';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {
  const { data: identity } = useGetIdentity();
  const [form] = Form.useForm();

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Card>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <Upload
                name="avatar"
                showUploadList={false}
                action="/api/upload"
              >
                <Avatar 
                  size={120} 
                  src={identity?.avatar}
                  icon={!identity?.avatar && <UserOutlined />}
                />
              </Upload>
              <Title level={4} style={{ marginTop: 16, marginBottom: 4 }}>
                {identity?.fullName}
              </Title>
              <Text type="secondary">{identity?.role}</Text>
              <Divider />
              <List>
                <List.Item>
                  <MailOutlined /> {identity?.email}
                </List.Item>
                <List.Item>
                  <PhoneOutlined /> {identity?.phone || '+1 234 567 890'}
                </List.Item>
              </List>
            </div>
          </Card>
        </Col>
        <Col span={16}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Personal Info" key="1">
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={identity}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="firstName" label="First Name">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="lastName" label="Last Name">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="email" label="Email">
                    <Input type="email" />
                  </Form.Item>
                  <Form.Item name="phone" label="Phone">
                    <Input />
                  </Form.Item>
                  <Form.Item name="bio" label="Bio">
                    <Input.TextArea rows={4} />
                  </Form.Item>
                  <Button type="primary">Save Changes</Button>
                </Form>
              </TabPane>
              <TabPane tab="Activity" key="2">
                <Timeline>
                  <Timeline.Item>Updated profile picture - 2 days ago</Timeline.Item>
                  <Timeline.Item>Changed password - 1 week ago</Timeline.Item>
                  <Timeline.Item>Account created - 1 month ago</Timeline.Item>
                </Timeline>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;