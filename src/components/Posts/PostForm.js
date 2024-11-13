import React, {  useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, editPost } from '../../redux/actions/postActions';
import { Button, Form, Input, Modal, Select } from 'antd';

const PostForm = ({ visible, onClose, currentPost }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // Set initial tags value from currentPost if editing
  useEffect(() => {
    if (currentPost) {
      form.setFieldsValue({
        title: currentPost.title,
        content: currentPost.content,
        tags: currentPost.tags || [],
      });
    } else {
      form.resetFields(); // Reset fields when creating a new post
    }
  }, [visible, currentPost, form]);

  const handleFinish = (values) => {
    if (currentPost) {
      dispatch(editPost(currentPost._id, values)); // Edit post
    } else {
      dispatch(addPost(values)); // Add new post
    }
    onClose(); // Close modal after submit
  };

  return (
    <Modal
      open={visible}
      title={currentPost ? 'Edit Post' : 'Add Post'}
      onCancel={onClose}
      footer={null}
      destroyOnClose={true}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical" initialValues={currentPost}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <Select
            mode="tags"
            placeholder="Add tags"
            tokenSeparators={[',']}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {currentPost ? 'Update Post' : 'Add Post'}
        </Button>
      </Form>
    </Modal>
  );
};

export default PostForm;
