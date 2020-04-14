
const URL = 'https://wekeepyourdata.herokuapp.com/api';

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
    console.log(response.status);
    return Promise.reject(response.json().then((result) => result));
  }
  return response.json();
}).catch(async (result) => Promise.reject(await result));
