import React from 'react';
import { Layout, Dropdown, Menu, Button, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';

const { Header } = Layout;

const HeaderComponent = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
 // const navigate = useNavigate();

  const menu = (
    <Menu>
      {user ? (
        <>
          <Menu.Item key="1">
            <Link to="/edit-profile">Edit Profile</Link>
          </Menu.Item>
          <Menu.Item key="2" onClick={() => dispatch(logout())}>
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="1">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <Header style={{ padding: '0 20px', background: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Blogging Platform</div>
      <Space>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button icon={<UserOutlined />} />
        </Dropdown>
      </Space>
    </Header>
  );
};

export default HeaderComponent;
