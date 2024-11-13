import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; 

// Auth API
export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const editProfile = (userId, profileData, token) => {
  return axios.put(`${API_URL}/users/${userId}`, profileData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Post API
export const fetchPosts = () => axios.get(`${API_URL}/posts`);
export const createPost = (postData, token) => {
  return axios.post(`${API_URL}/posts`, postData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
export const updatePost = (postId, postData, token) => {
  return axios.put(`${API_URL}/posts/${postId}`, postData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
export const deletePost = (postId, token) => {
  return axios.delete(`${API_URL}/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Search posts API
export const searchPostsAPI = (query) => axios.get(`${API_URL}/posts/search`, { params: { query } });

export const logout = () => localStorage.removeItem('token');
