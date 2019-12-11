import { REG_SUCCESS, REG_FAIL } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  user: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REG_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false
      }
    case REG_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false
      }  
    default:
      return state  
  }
}