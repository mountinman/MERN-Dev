import axios from 'axios';
import { 
  REG_SUCCESS, 
  REG_FAIL, 
  USER_LOADED, 
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';
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
    dispatch(loadUser())
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

export const logUser = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (error) {
    const errors = error.response.data.errors
    if(errors){
      errors.forEach(err => {
        dispatch(setAlert(err.msg, 'danger'))
      });
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

export const logout = () => dispatch => {
  dispatch({
    type:LOGOUT
  })
}

