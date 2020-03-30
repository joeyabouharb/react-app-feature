import types from './types';

export const userLogsIn = (token) => ({
  type: types.USER_LOGS_IN, payload: token,
});

export const userLogsOut = () => ({
  type: types.USER_LOGS_OUT, payload: null,
});
