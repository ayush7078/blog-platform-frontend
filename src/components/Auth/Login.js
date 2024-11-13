import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { Button, Form, Input, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Link } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = (values) => {
    dispatch(login(values, navigate)); // Dispatch login action with navigate
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to the register page
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
      <Card style={{ width: 400, padding: '10px' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <Form form={form} onFinish={handleLogin} layout="vertical">
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Typography.Text>New user? </Typography.Text>
          <Link onClick={handleRegisterRedirect}>Register here</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
