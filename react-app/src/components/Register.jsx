import React, { useState } from 'react';
import validator from 'validator';
import Input from './FormControls';
import { RegisterRequest } from '../services/AccountService';

const Register = () => {
  const [formContent, onContentChange] = useState({
    username: '',
    password: '',
    confirm_password: '',
    email: '',
    bucket: '',
  });
  const [messages, onMessageChange] = useState('');
  const setInputs = (event) => onContentChange({
    ...formContent,
    [event.target.name]: event.target.value,
  });

  const isLoginValid = async () => {
    const formNotNull = await new Promise((resolve) => {
      Object.entries(formContent).forEach(([key, value]) => {
        if (!value) {
          const field = key.replace('_', ' ');
          resolve({ result: false, field });
        }
        resolve({ result: true });
      });
    });
    if (!formNotNull.result) {
      return Promise.reject(new Error(`${formNotNull.field} was empty`));
    }
    if (!validator.matches(/^(?=.{12,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "-]).*$/)) {
      return Promise.reject(new Error('Password must contain at least 12 characters that have at least 1 lower, upper case and special character'));
    }
    if (!validator.isEmail(formContent.email)) {
      return Promise.reject(new Error());
    }
    if (!validator.isAlphanumeric(formContent.username)) {
      return Promise.reject(new Error('username not valid!'));
    }
    if (formContent.password !== formContent.confirm_password) {
      return Promise.reject(new Error('passwords were not the same!'));
    }
    return true;
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    isLoginValid()
      .then(() => RegisterRequest(formContent))
      .then(() => {
        onMessageChange('new user created!');
      })
      .catch(({ message }) => {
        onMessageChange(message);
      });
  };
  return (
    <form
      onSubmit={onFormSubmit}
    >
      <h2>Login</h2>
      <Input
        label="Email:"
        name="email"
        type="email"
        value={formContent.email}
        onChange={setInputs}
        id="Email"
      />
      <Input
        label="Username:"
        name="username"
        type="text"
        value={formContent.email}
        onChange={setInputs}
        id="Username"
      />
      <Input
        label="Bucket:"
        name="bucket"
        type="text"
        value={formContent.bucket}
        onChange={setInputs}
        id="Bucket"
      />
      <Input
        label="Password:"
        name="password"
        type="password"
        value={formContent.password}
        onChange={setInputs}
        id="Password"
      />
      <Input
        label="Confirm Password:"
        name="confirm_password"
        type="password"
        value={formContent.confirm_password}
        onChange={setInputs}
        id="Confirm_Password"
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

export default Register;
