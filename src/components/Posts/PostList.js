import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, removePost, searchPosts } from '../../redux/actions/postActions';
import { Button, Input, Table, Modal, Row, Col, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PostForm from './PostForm';

const PostList = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const authData = useSelector((state) => state.auth.user); // Updated to match the current structure
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    dispatch(getPosts()); // Fetch posts on component mount
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(searchPosts(searchQuery));
  };

  const handleEdit = (post) => {
    setCurrentPost(post);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setCurrentPost(null);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag, index) => (
            <Tag color="blue" key={index}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => {
        const isAuthor = authData && authData.id === record.author._id; // Check if current user is the author
        return (
          <>
            <Button
              type="link"
              icon={<EditOutlined />}
              disabled={!authData || !isAuthor} // Disable if not logged in or not the author
              onClick={() => handleEdit(record)}
            />
            <Button
              type="link"
              icon={<DeleteOutlined />}
              danger
              disabled={!authData || !isAuthor} // Disable if not logged in or not the author
              onClick={() => dispatch(removePost(record._id))}
            />
          </>
        );
      },
    },
  ];

  return (
    <div style={{ margin: '10px' }}>
      <Row gutter={16} align="middle" style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <Input.Search
            placeholder="Search posts by title or tags"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
            enterButton
            style={{ width: '50%' }}
          />
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          {authData && (
            <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ padding: '10px 20px' }}>
              Add Post
            </Button>
          )}
        </Col>
      </Row>

      <Table dataSource={posts} columns={columns} rowKey="_id" style={{ marginBottom: '30px' }} />

      <Modal
        open={isModalVisible}
        title={currentPost ? 'Edit Post' : 'Add Post'}
        onCancel={handleModalClose}
        footer={null}
        destroyOnClose={true}
      >
        <PostForm
          visible={isModalVisible}
          onClose={handleModalClose}
          currentPost={currentPost}
        />
      </Modal>
    </div>
  );
};

export default PostList;
