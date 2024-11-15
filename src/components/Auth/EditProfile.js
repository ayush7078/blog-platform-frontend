import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '../../redux/actions/authActions';
import { Button, Form, Input, Card } from 'antd';
import {  useNavigate } from 'react-router-dom'; // For redirecting after successful edit

const EditProfile = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { authData } = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  // function to edit the Profile  
  const handleEditProfile = (values) => {
    dispatch(editProfile(values, authData.token)); // Pass token for authentication
    history.push('/profile'); // Redirect to the profile page after successful edit
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <Card
        title="Edit Profile"
        style={{ width: 400 }}
        bordered={false}
        headStyle={{ textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold' }}
        bodyStyle={{ padding: '20px' }}
      >
        <Form
          form={form}
          onFinish={handleEditProfile}
          layout="vertical"
          initialValues={{
            username: authData?.user?.username,
            email: authData?.user?.email,
          }}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input type="email" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Save Changes
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default EditProfile;
