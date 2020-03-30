import jsonwebtoken from 'jsonwebtoken';
import types from './types';

const loginReducer = (state, { type, payload }) => {
  if (type === types.USER_LOGS_IN) {
    const token = jsonwebtoken.decode(payload);
    return { ...state, ...token, access_token: payload };
  }
  if (type === types.USER_LOGS_OUT) {
    return { payload };
  }
  return state;
};

export default loginReducer;
