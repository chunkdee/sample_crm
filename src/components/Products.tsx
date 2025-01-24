import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Radio, Card, Row, Col, message, Input as AntInput, Tooltip, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import data from '../../data.json';
import { ViewToggle } from './styles/ViewToggle';
import { ListBase } from 'ra-core';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  sales: number;
}

interface ColumnType {
  title: string;
  dataIndex?: string;
  key: string;
  render?: (text: string, record: Product) => React.ReactNode;
}

interface ModalField {
  name: string;
  label: string;
  type: string;
  rules?: object[];
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(data.products);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchText, setSearchText] = useState<string>('');
  const [form] = Form.useForm();

  const columns: ColumnType[] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
    { title: 'Sales', dataIndex: 'sales', key: 'sales' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} style={{ marginLeft: 8 }} />
        </>
      ),
    },
  ];

  const modalFields: ModalField[] = [
    { name: 'name', label: 'Name', type: 'text', rules: [{ required: true }] },
    { name: 'price', label: 'Price', type: 'number', rules: [{ required: true }] },
    { name: 'stock', label: 'Stock', type: 'number', rules: [{ required: true }] },
  ];

  const handleEdit = (product: Product): void => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number): void => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    message.success('Product deleted successfully');
  };

  const handleCancel = (): void => {
    setIsModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
  };

  const handleAddOrUpdate = (values: Partial<Product>): void => {
    if (editingProduct) {
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? { ...product, ...values } : product
      );
      setProducts(updatedProducts);
      message.success('Product updated successfully');
    } else {
      const newProduct: Product = {
        id: products.length + 1,
        sales: 0,
        ...values,
      } as Product;
      setProducts([...products, newProduct]);
      message.success('Product added successfully');
    }
    handleCancel();
  };

  const filteredProducts = products.filter((product) =>
    Object.values(product).some((val) =>
      val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div>
        <ListBase resource="products">
      <div style={{ 
        marginBottom: 16, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Space size={16}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add Product
          </Button>
          <Input
            placeholder="Search products..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            style={{ width: 200 }}
          />
        </Space>

        <ViewToggle>
          <Tooltip title="Table View">
            <div
              className={`view-button ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              <UnorderedListOutlined />
            </div>
          </Tooltip>
          <Tooltip title="Card View">
            <div
              className={`view-button ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
            >
              <AppstoreOutlined />
            </div>
          </Tooltip>
        </ViewToggle>
      </div>
      {viewMode === 'table' ? (
        <Table columns={columns} dataSource={filteredProducts} rowKey="id" />
      ) : (
        <Row gutter={16}>
          {filteredProducts.map((product) => (
            <Col key={product.id} span={8}>
              <Card title={product.name}>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>
                <p>Sales: {product.sales}</p>
                <Button icon={<EditOutlined />} onClick={() => handleEdit(product)} />
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(product.id)}
                  style={{ marginLeft: 8 }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddOrUpdate} layout="vertical">
          {modalFields.map((field) => (
            <Form.Item key={field.name} name={field.name} label={field.label} rules={field.rules}>
              {field.type === 'text' ? <Input /> : <InputNumber />}
            </Form.Item>
          ))}
        </Form>
      </Modal>
      </ListBase>
    </div>
    
  );
};

export default Products;