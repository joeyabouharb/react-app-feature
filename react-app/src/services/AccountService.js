
const URL = 'http://localhost:4444/api';

export const LoginRequest = (data) => fetch(
  `${URL}/accounts/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  },
).then((response) => {
  if (response.status === 200) {
    return response.json();
  } if (response.status === 400) {
    return Promise.reject(new Error('Missing Required Parameters'));
  }
  return Promise.reject(new Error('Incorrect Credentials'));
});

export const RegisterRequest = (data) => fetch(
  `${URL}/accounts/register`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  },
).then((response) => {
  if (response.status === 400) {
    return Promise.reject(response.json());
  }
  return response.json();
}).catch( ({ message }) => Promise.reject(new Error(message)));
