import React from 'react';
import { Card, Col, Row, Statistic, Timeline, Spin, Typography } from 'antd';
import { useGetList } from 'ra-core';
import {
  UserOutlined,
  ShoppingCartOutlined,
  BankOutlined
} from '@ant-design/icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const {
    data: customers,
    isLoading: isLoadingCustomers
  } = useGetList('customers');

  const {
    data: contacts,
    isLoading: isLoadingContacts
  } = useGetList('contacts');

  const {
    data: deals,
    isLoading: isLoadingDeals
  } = useGetList('deals');

  const {
    data: sales,
    isLoading: isLoadingSales
  } = useGetList('sales');

  const {
    data: companies,
    isLoading: isLoadingCompanies
  } = useGetList('companies');

  const isLoading = isLoadingCustomers || isLoadingContacts || isLoadingDeals || isLoadingSales || isLoadingCompanies;

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  const salesData = {
    labels: (sales || []).slice(0, 6).map(sale =>
      new Date(sale.date).toLocaleDateString()
    ),
    datasets: [{
      label: 'Revenue',
      data: (sales || []).slice(0, 6).map(sale => sale.amount),
      borderColor: '#1890ff',
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(24, 144, 255, 0.1)',
    }]
  };

  const dealsData = {
    labels: ['New', 'Qualified', 'Proposal', 'Negotiation', 'Closed'],
    datasets: [{
      data: ['New', 'Qualified', 'Proposal', 'Negotiation', 'Closed'].map(
        status => (deals || []).filter(deal => deal.status === status).length
      ),
      backgroundColor: [
        '#1890ff',
        '#52c41a',
        '#faad14',
        '#722ed1',
        '#f5222d',
      ],
    }]
  };

  return (
    <div>
      {/* Summary Cards */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title={<Text strong style={{ fontSize: '1rem' }}>Total Customers</Text>}
              value={customers?.length || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={<Text strong style={{ fontSize: '1rem' }}>Total Revenue</Text>}
              value={(sales ?? []).reduce((sum, sale) => sum + sale.amount, 0)}
              prefix="$"
              precision={2}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={<Text strong style={{ fontSize: '1rem' }}>Active Deals</Text>}
              value={(deals ?? []).length}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={<Text strong style={{ fontSize: '1rem' }}>Companies</Text>}
              value={(companies ?? []).length}
              prefix={<BankOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={16}>
          <Card>
            <Title level={4} style={{ marginBottom: 16 }}>Revenue Overview</Title>
            <Text type="secondary" style={{ fontSize: '1rem' }}>
              Monthly revenue breakdown
            </Text>
            <Line
              data={salesData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false }
                }
              }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Deals by Stage">
            <Doughnut
              data={dealsData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'bottom' }
                }
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activity and Deals */}
      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={12}>
          <Card title="Recent Deals">
            <Timeline
              items={(deals ?? []).slice(0, 5).map(deal => ({
                color: deal.status === 'Closed Won' ? 'green' : 'blue',
                children: (
                  <>
                    <Text strong style={{ fontSize: '1rem', display: 'block' }}>
                      {deal.name}
                    </Text>
                    <Text type="secondary" style={{ fontSize: '0.9rem' }}>
                      ${deal.value.toLocaleString()} - {deal.status}
                    </Text>
                  </>
                )
              }))}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Top Companies">
            {(companies ?? []).slice(0, 5).map(company => (
              <Card.Grid
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}
                key={company.id}
              >
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text strong style={{ fontSize: '1.1rem', display: 'block' }}>
                      {company.name}
                    </Text>
                    <Text type="secondary" style={{ fontSize: '0.9rem' }}>
                      {company.industry}
                    </Text>
                  </Col>
                  <Col>
                    <Statistic
                      value={company.revenue}
                      prefix="$"
                      precision={0}
                      valueStyle={{
                        fontSize: '1.2rem',
                        fontWeight: 500,
                        color: '#1890ff'
                      }}
                    />
                  </Col>
                </Row>
              </Card.Grid>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;