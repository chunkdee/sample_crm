import React from 'react';
    import { Card, Col, Row, Statistic } from 'antd';
    import { Chart } from 'react-chartjs-2';
    import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
    } from 'chart.js';
    import data from '../../data.json';

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );

    const Dashboard = () => {
      const totalCustomers = data.customers.length;
      const totalProducts = data.products.length;
      const totalOrders = data.orders.length;

      const productSalesData = {
        labels: data.products.map(product => product.name),
        datasets: [
          {
            label: 'Sales',
            data: data.products.map(product => product.sales),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      };

      const customerOrderData = {
        labels: data.customers.map(customer => customer.name),
        datasets: [
          {
            label: 'Orders',
            data: data.customers.map(customer => customer.orders),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          },
        ],
      };

      return (
        <div>
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <Statistic title="Total Customers" value={totalCustomers} />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic title="Total Products" value={totalProducts} />
              </Card>
            </Col>
             <Col span={8}>
              <Card>
                <Statistic title="Total Orders" value={totalOrders} />
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: '20px' }}>
            <Col span={12}>
              <Card title="Product Sales">
                <Chart type='bar' data={productSalesData} />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Customer Orders">
                 <Chart type='bar' data={customerOrderData} />
              </Card>
            </Col>
          </Row>
        </div>
      );
    };

    export default Dashboard;
