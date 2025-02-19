import React from 'react';
import { Card, Col, Row, Statistic, Spin, Typography, Progress, Avatar, Tooltip as AntTooltip, Space, Select, Button } from 'antd';
import { useGetList } from 'ra-core';
import { 
  BankOutlined, 
  RiseOutlined, 
  ApartmentOutlined,
  ArrowUpOutlined,
  GlobalOutlined,
  FunnelPlotOutlined,
  DollarOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  ChartItem,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Company, Opportunity } from '../datagenerator/types/crmTypes';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const { Title, Text } = Typography;

// Define chart option types
type LineChartOptions = ChartOptions<'line'>;
type DoughnutChartOptions = ChartOptions<'doughnut'>;
type BarChartOptions = ChartOptions<'bar'>;

// Update the styles object with more professional styling
const styles = {
  dashboardContainer: {
    padding: '24px',
    background: '#f7f9fc', // Lighter, more modern background
    minHeight: '100vh'
  },
  headerCard: {
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
    border: '1px solid rgba(0,0,0,0.06)',
    transition: 'all 0.3s ease'
  },
  statCard: {
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
    border: '1px solid rgba(0,0,0,0.06)',
    height: '100%',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
    }
  },
  chartCard: {
    borderRadius: '12px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
    border: '1px solid rgba(0,0,0,0.06)',
    padding: '20px',
    background: '#ffffff',
    transition: 'all 0.3s ease'
  },
  companyCard: {
    borderRadius: '12px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
    border: '1px solid rgba(0,0,0,0.06)',
    marginTop: '24px',
    background: '#ffffff'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#111827'
  },
  statTitle: {
    fontSize: '14px',
    color: '#6B7280',
    fontWeight: 500
  },
  chartTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '4px'
  },
  chartSubtitle: {
    fontSize: '14px',
    color: '#6B7280'
  },
  gridItem: {
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.06)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f8fafc',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }
  }
};

// Update the chart colors for a more professional look
const CHART_COLORS = {
  primary: '#2563eb', // Stronger blue
  success: '#059669', // Rich green
  warning: '#d97706', // Warm orange
  purple: '#7c3aed', // Vibrant purple
  error: '#dc2626', // Bright red
  background: 'rgba(37, 99, 235, 0.05)',
  gradientFrom: 'rgba(37, 99, 235, 0.12)',
  gradientTo: 'rgba(37, 99, 235, 0.02)',
  text: {
    primary: '#111827',
    secondary: '#6B7280'
  }
} as const;

const Dashboard: React.FC = () => {
  const { data: companies, isLoading: isLoadingCompanies } = useGetList<Company>('companies');
  const { data: opportunities, isLoading: isLoadingOpportunities } = useGetList<Opportunity>('opportunities');

  const isLoading = isLoadingCompanies || isLoadingOpportunities;

  // Enhanced revenue data visualization
  const revenueData: ChartData<'line'> = React.useMemo(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: (companies ?? []).reduce((acc, company) => {
        const monthlyRevenue = company.revenue / 6; // Simulate monthly distribution
        return acc.map(val => val + monthlyRevenue);
      }, [0, 0, 0, 0, 0, 0]),
      borderColor: CHART_COLORS.primary,
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, CHART_COLORS.gradientFrom);
        gradient.addColorStop(1, CHART_COLORS.gradientTo);
        return gradient;
      },
      tension: 0.4,
      fill: true,
    }]
  }), [companies]);

  // Enhanced industry distribution data
  const industryData: ChartData<'doughnut'> = React.useMemo(() => {
    const industries = (companies ?? []).reduce((acc, company) => {
      acc[company.industry] = (acc[company.industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      labels: Object.keys(industries),
      datasets: [{
        data: Object.values(industries),
        backgroundColor: [
          '#1890ff',
          '#52c41a',
          '#faad14',
          '#722ed1',
          '#f5222d',
          '#13c2c2',
          '#2f54eb'
        ],
        borderWidth: 2
      }]
    };
  }, [companies]);

  // Calculate opportunity metrics
  const opportunityMetrics = React.useMemo(() => {
    const opps = opportunities ?? [];
    return {
      totalAmount: opps.reduce((sum, opp) => sum + opp.amount, 0),
      totalCount: opps.length,
      avgAmount: opps.length ? opps.reduce((sum, opp) => sum + opp.amount, 0) / opps.length : 0,
      byStage: opps.reduce((acc, opp) => {
        acc[opp.stage] = (acc[opp.stage] || 0) + opp.amount;
        return acc;
      }, {} as Record<string, number>)
    };
  }, [opportunities]);

  // Opportunity Pipeline Chart (Line chart)
  const opportunityData: ChartData<'line'> = React.useMemo(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Pipeline Value',
      data: (opportunities ?? [])
        .sort((a, b) => new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime())
        .reduce((acc, opp) => {
          const month = new Date(opp.closeDate).getMonth();
          if (month < 6) acc[month] += opp.amount;
          return acc;
        }, Array(6).fill(0)),
      borderColor: CHART_COLORS.primary,
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, CHART_COLORS.gradientFrom);
        gradient.addColorStop(1, CHART_COLORS.gradientTo);
        return gradient;
      },
      tension: 0.4,
      fill: true,
    }]
  }), [opportunities]);

  // Opportunity Stage Distribution (Bar chart)
  const stageDistributionData: ChartData<'bar'> = React.useMemo(() => ({
    labels: ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
    datasets: [{
      label: 'Amount',
      data: ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'].map(
        stage => (opportunities ?? [])
          .filter(opp => opp.stage === stage)
          .reduce((sum, opp) => sum + opp.amount, 0)
      ),
      backgroundColor: [
        CHART_COLORS.primary,
        CHART_COLORS.success,
        CHART_COLORS.warning,
        CHART_COLORS.purple,
        CHART_COLORS.error,
        CHART_COLORS.background,
      ],
    }]
  }), [opportunities]);

  // Top Companies by Opportunity Value
  const topCompaniesByOpportunity = React.useMemo(() => {
    const companyOpportunities = (opportunities ?? []).reduce((acc, opp) => {
      acc[opp.companyId] = (acc[opp.companyId] || 0) + opp.amount;
      return acc;
    }, {} as Record<string, number>);

    return (companies ?? [])
      .map(company => ({
        ...company,
        opportunityValue: companyOpportunities[company.id] || 0
      }))
      .sort((a, b) => b.opportunityValue - a.opportunityValue)
      .slice(0, 5);
  }, [companies, opportunities]);

  // Chart options
  const lineChartOptions: LineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`
        }
      }
    }
  };

  const doughnutChartOptions: DoughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            const total = context.dataset.data.reduce((a, b) => (a as number) + (b as number), 0) as number;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={styles.dashboardContainer}>
      {/* Summary Stats */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            style={styles.statCard}
            bodyStyle={{ padding: '24px' }}
          >
            <Statistic
              title={
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  marginBottom: '16px' 
                }}>
                  <DollarOutlined style={{ fontSize: '20px', color: CHART_COLORS.primary }} />
                  <span style={styles.statTitle}>Total Pipeline</span>
                </div>
              }
              value={opportunityMetrics.totalAmount}
              prefix="$"
              precision={0}
              valueStyle={styles.statValue}
            />
            <Progress 
              percent={85} 
              showInfo={false} 
              strokeColor={{
                '0%': CHART_COLORS.primary,
                '100%': CHART_COLORS.success
              }}
              style={{ marginTop: '16px' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={styles.statCard}>
            <Statistic
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BankOutlined />
                  <span>Total Companies</span>
                </div>
              }
              value={(companies ?? []).length}
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: CHART_COLORS.primary }}
              suffix={
                <small style={{ fontSize: '14px', color: CHART_COLORS.success }}>
                  +12% ↑
                </small>
              }
            />
            <Progress 
              percent={75} 
              showInfo={false} 
              strokeColor={CHART_COLORS.primary} 
              style={{ marginTop: '12px' }}
            />
          </Card>
        </Col>
        {/* Add more stats cards... */}
      </Row>

      {/* Charts Row */}
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={16}>
          <Card 
            style={styles.chartCard}
            bodyStyle={{ padding: '0' }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '24px',
              padding: '0 24px'
            }}>
              <div>
                <Title level={4} style={styles.chartTitle}>Opportunity Pipeline</Title>
                <Text type="secondary" style={styles.chartSubtitle}>
                  Monthly opportunity distribution
                </Text>
              </div>
              <Space>
                <Select 
                  defaultValue="6m" 
                  style={{ width: 120 }}
                  options={[
                    { value: '6m', label: 'Last 6 months' },
                    { value: '12m', label: 'Last 12 months' },
                    { value: 'ytd', label: 'Year to date' }
                  ]}
                />
                <AntTooltip title="View detailed report">
                  <Button type="text" icon={<BarChartOutlined />} />
                </AntTooltip>
              </Space>
            </div>
            <div style={{ padding: '0 12px 24px' }}>
              <Line data={opportunityData} options={lineChartOptions} />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={styles.chartCard} title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FunnelPlotOutlined />
              <span>Pipeline by Stage</span>
            </div>
          }>
            <Bar data={stageDistributionData} options={{
              responsive: true,
              indexAxis: 'y',
              plugins: {
                legend: { display: false }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `$${value.toLocaleString()}`
                  }
                }
              }
            } as BarChartOptions} />
          </Card>
        </Col>
      </Row>

      {/* Top Companies Section with enhanced styling */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GlobalOutlined />
            <span>Top Performing Companies</span>
          </div>
        }
        style={styles.companyCard}
      >
        <Row gutter={[16, 16]}>
          {(companies ?? [])
            .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
            .slice(0, 5)
            .map((company, index) => (
              <Col span={24} key={company.id}>
                <Card.Grid 
                  style={{
                    ...styles.gridItem,
                    width: '100%',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <Row justify="space-between" align="middle">
                    <Col flex="auto">
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '16px' 
                      }}>
                        <Avatar 
                          size={48} 
                          style={{ 
                            backgroundColor: CHART_COLORS.background,
                            color: CHART_COLORS.primary,
                            fontSize: '20px',
                            fontWeight: 600
                          }}
                        >
                          {company.name.charAt(0)}
                        </Avatar>
                        <div>
                          <Text strong style={{ 
                            fontSize: '16px', 
                            display: 'block',
                            color: CHART_COLORS.text.primary 
                          }}>
                            {company.name}
                          </Text>
                          <Text style={{ 
                            fontSize: '14px',
                            color: CHART_COLORS.text.secondary 
                          }}>
                            {company.industry}
                          </Text>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <Statistic
                        value={company.revenue}
                        prefix="$"
                        precision={0}
                        valueStyle={{
                          fontSize: '18px',
                          fontWeight: 500,
                          color: CHART_COLORS.primary
                        }}
                      />
                    </Col>
                  </Row>
                </Card.Grid>
              </Col>
            ))}
        </Row>
      </Card>

      {/* Top Companies by Opportunity Value Section */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GlobalOutlined />
            <span>Top Companies by Opportunity Value</span>
          </div>
        }
        style={styles.companyCard}
      >
        <Row gutter={[16, 16]}>
          {topCompaniesByOpportunity.map((company) => (
            <Col span={24} key={company.id}>
              <Card.Grid 
                style={{
                  ...styles.gridItem,
                  width: '100%',
                  backgroundColor: '#ffffff'
                }}
              >
                <Row justify="space-between" align="middle">
                  <Col flex="auto">
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '16px' 
                    }}>
                      <Avatar 
                        size={48} 
                        style={{ 
                          backgroundColor: CHART_COLORS.background,
                          color: CHART_COLORS.primary,
                          fontSize: '20px',
                          fontWeight: 600
                        }}
                      >
                        {company.name.charAt(0)}
                      </Avatar>
                      <div>
                        <Text strong style={{ 
                          fontSize: '16px', 
                          display: 'block',
                          color: CHART_COLORS.text.primary 
                        }}>
                          {company.name}
                        </Text>
                        <Text style={{ 
                          fontSize: '14px',
                          color: CHART_COLORS.text.secondary 
                        }}>
                          {company.industry}
                        </Text>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <Statistic
                      value={company.opportunityValue}
                      prefix="$"
                      precision={0}
                      valueStyle={{
                        fontSize: '18px',
                        fontWeight: 600,
                        color: CHART_COLORS.primary
                      }}
                    />
                  </Col>
                </Row>
              </Card.Grid>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;