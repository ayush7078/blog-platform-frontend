import { jwtDecode } from 'jwt-decode'; // Correct import
import { registerUser, loginUser, editProfile as editProfileAPI } from '../../api';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

// Register action
export const register = (userData, navigate) => async (dispatch) => {
  try {
    const response = await registerUser(userData);
    const token = response.data.token;

    // Decode the token
    const decodedToken = jwtDecode(token); // Use jwtDecode instead of jwt_decode
    const { id, name } = decodedToken;

    // Save token and decoded user data in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ id, name }));
    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { id, name },
    });

    navigate('/'); // Redirect to the main page after successful registration
  } catch (error) {
    console.error('Registration error:', error);
  }
};

// Login action
export const login = (userData, navigate) => async (dispatch) => {
  try {
    const response = await loginUser(userData);
    const token = response.data.token;

    // Clear any previous session
    localStorage.clear();

    // Decode the token
    const decodedToken = jwtDecode(token); // Use jwtDecode instead of jwt_decode
    console.log("decodedtoken", decodedToken);
    
    const { id, name } = decodedToken.user;

    // Save token and decoded user data in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ id, name }));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { id, name },
    });

    navigate('/'); // Redirect to the main page after successful login
  } catch (error) {
    console.error('Login error:', error);
  }
};

// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch({ type: LOGOUT });
};

// Edit Profile action
export const editProfile = (userId, profileData, token) => async (dispatch) => {
  try {
    const response = await editProfileAPI(userId, profileData, token);
    dispatch({
      type: LOGIN_SUCCESS, // Assuming we update the user state upon profile edit
      payload: response.data,
    });
  } catch (error) {
    console.error('Profile edit error:', error);
  }
};
