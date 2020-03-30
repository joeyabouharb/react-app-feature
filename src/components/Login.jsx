import React, { useState } from 'react';
import { useAuthDispatch } from '../contexts/auth/useAuthContext';
import { LoginRequest } from '../services/AccountService';
import { userLogsIn } from '../contexts/auth/actions';
import Input from './FormControls';

const Login = () => {
  const [formContent, onContentChange] = useState({
    credential: '',
    password: '',
  });
  const [messages, onMessageChange] = useState('');
  const setInputs = (event) => onContentChange({
    ...formContent,
    [event.target.name]: event.target.value,
  });

  const isLoginValid = () => formContent.credential
    || formContent.password;

  const dispatch = useAuthDispatch();
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (isLoginValid()) {
      LoginRequest(formContent).then((data) => {
        dispatch(userLogsIn(data.token));
      }).catch((error) => {
        onMessageChange(error.message);
      });
    } else {
      onMessageChange('Please fill in your login Credentials');
    }
  };
  return (
    <form
      onSubmit={onFormSubmit}
    >
      <h2>Login</h2>
      <Input
        label="Email/Username:"
        name="credential"
        type="text"
        value={formContent.credential}
        onChange={setInputs}
        id="Email_Username"
      />
      <Input
        label="Password:"
        name="password"
        type="password"
        value={formContent.password}
        onChange={setInputs}
        id="Password"
      />
      <p>{messages}</p>
      <button
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
export default Login;
