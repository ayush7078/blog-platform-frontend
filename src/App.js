import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import HeaderComponent from './components/Layout/Header';
import PostList from './components/Posts/PostList';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EditProfile from './components/Auth/EditProfile';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderComponent />
      <Layout.Content style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/login" element={!user ||  user != null ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user || user != null ? <Register /> : <Navigate to="/" />} />
          <Route path="/edit-profile" element={user ? <EditProfile /> : <Navigate to="/login" />} />
        </Routes>
      </Layout.Content>
    </Layout>
  );
};

export default App;
