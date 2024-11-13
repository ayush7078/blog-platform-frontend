import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/authActions';
import { Button, Form, Input, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Link } = Typography;

const Register = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleRegister = (values) => {
    dispatch(register(values, navigate)); // Dispatch register action with navigate
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
      <Card style={{ width: 400, padding: '10px' }}>
        <h2 style={{ textAlign: 'center' }}>Register</h2>
        <Form form={form} onFinish={handleRegister} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirm Password" dependencies={['password']} rules={[{ required: true, message: 'Please confirm your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Typography.Text>Already have an account? </Typography.Text>
          <Link onClick={handleLoginRedirect}>Login here</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
