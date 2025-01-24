import React from 'react';
import { Card, Switch, Select, Form, Radio, Button, Typography, Row, Col, Divider, Tabs, Checkbox } from 'antd';
const { TabPane } = Tabs;
import { BellOutlined, LockOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';

const { Title, Text } = Typography;

const SettingsPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [form] = Form.useForm();

  return (
    <div style={{ padding: 24 }}>
      <Title level={4}>Settings</Title>
      <Row gutter={[24, 24]}>
        <Col span={16}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane 
                tab={
                  <span><BellOutlined /> Notifications</span>
                } 
                key="1"
              >
                <Form layout="vertical">
                  <Form.Item 
                    label="Email Notifications"
                    extra="Receive email notifications for important updates"
                  >
                    <Switch defaultChecked />
                  </Form.Item>
                  <Form.Item 
                    label="Desktop Notifications"
                    extra="Show desktop notifications when browser is open"
                  >
                    <Switch defaultChecked />
                  </Form.Item>
                  <Divider />
                  <Title level={5}>Notification Types</Title>
                  <Form.Item name="mentions">
                    <Checkbox>When someone mentions me</Checkbox>
                  </Form.Item>
                  <Form.Item name="updates">
                    <Checkbox>When there are system updates</Checkbox>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane 
                tab={
                  <span><GlobalOutlined /> Preferences</span>
                } 
                key="2"
              >
                <Form layout="vertical">
                  <Form.Item 
                    label="Language"
                    extra="Choose your preferred language"
                  >
                    <Select defaultValue="en">
                      <Select.Option value="en">English</Select.Option>
                      <Select.Option value="es">Spanish</Select.Option>
                      <Select.Option value="fr">French</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item 
                    label="Theme"
                    extra="Choose between light and dark mode"
                  >
                    <Switch
                      checked={isDarkMode}
                      onChange={toggleTheme}
                      checkedChildren="Dark"
                      unCheckedChildren="Light"
                    />
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane 
                tab={
                  <span><LockOutlined /> Privacy & Security</span>
                } 
                key="3"
              >
                <Form layout="vertical">
                  <Form.Item 
                    label="Two-Factor Authentication"
                    extra="Add an extra layer of security to your account"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item 
                    label="Activity Log"
                    extra="Keep track of your account activity"
                  >
                    <Button>View Activity Log</Button>
                  </Form.Item>
                  <Divider />
                  <Button type="primary" danger>
                    Delete Account
                  </Button>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;