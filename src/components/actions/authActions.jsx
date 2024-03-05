import { setAuthMode, setUser, removeUser } from './slices/authSlice';
import { SIGN_IN_URL, SIGN_UP_URL } from '../../config/firebaseConfig';
import axios from 'axios';

export const loginUser = async (dispatch, email, password) => {
  const credentials = {
    email,
    password,
    returnSecureToken: true,
  };

  try {
    const response = await axios.post(SIGN_IN_URL, credentials);
    localStorage.setItem('token', response.data.idToken);
    console.log(response.data.idToken);
    dispatch(setUser(response.data));
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

export const registerUser = async (dispatch, email, password) => {
  const credentials = {
    email,
    password,
    returnSecureToken: true,
  };

  try {
    const response = await axios.post(SIGN_UP_URL, credentials);
    localStorage.setItem('token', response.data.idToken);
    console.log(response.data.idToken);
    dispatch(setUser(response.data));
  } catch (error) {
    console.error('Error signing up:', error);
  }
};

export const logoutUser = (dispatch) => {
  localStorage.removeItem('token');
  dispatch(removeUser());
};
