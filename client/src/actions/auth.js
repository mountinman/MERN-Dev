import axios from 'axios';
import { REG_SUCCESS, REG_FAIL, USER_LOADED, AUTH_ERROR } from './types';
import { setAlert } from './alert';
import { setAuthToken } from '../helpers/setAuthToken';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type:USER_LOADED,
      payload:res.data
    })
  } catch (error) {
    dispatch({
      type:AUTH_ERROR
    })
  }
}

export const regUser = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config)
    dispatch({
      type: REG_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    const errors = error.response.data.errors
    if(errors){
      errors.forEach(err => {
        dispatch(setAlert(err.msg, 'danger'))
      });
    }
    dispatch({
      type: REG_FAIL
    })
  }
}

