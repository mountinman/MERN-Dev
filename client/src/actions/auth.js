import axios from 'axios';
import { REG_SUCCESS, REG_FAIL } from './types';
import setAlert from './alert';

const regUser = ({ name, email, password }) => async dispatch => {
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
    console.log(errors)
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

export default regUser;