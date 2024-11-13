import { fetchPosts, createPost, updatePost, deletePost, searchPostsAPI } from '../../api';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const SEARCH_POSTS = 'SEARCH_POSTS';

// Fetch posts action
export const getPosts = () => async (dispatch) => {
  try {
    const response = await fetchPosts();
    dispatch({
      type: FETCH_POSTS,
      payload: response.data,
    });
    console.log("response", response)
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

// Search posts action
export const searchPosts = (query) => async (dispatch) => {
  try {
    const response = await searchPostsAPI(query);
    dispatch({
      type: SEARCH_POSTS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error searching posts:', error);
  }
};

// Create post action
export const addPost = (postData) => async (dispatch) => {
  try {
    // Get the userId from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user) {
      console.error('User not logged in');
      return;
    }

    // Add userId to postData
    const postWithUser = { ...postData, userId: user.userId };

    const response = await createPost(postWithUser, token);
    dispatch({
      type: CREATE_POST,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

// Update post action
export const editPost = (postId, postData) => async (dispatch) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    const response = await updatePost(postId, postData, token);
    dispatch({
      type: UPDATE_POST,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error updating post:', error);
  }
};

// Delete post action
export const removePost = (postId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    await deletePost(postId, token);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};
