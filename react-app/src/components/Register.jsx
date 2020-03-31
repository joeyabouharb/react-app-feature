import React, { useState } from 'react';
import Input from './FormControls';
import { RegisterRequest } from '../services/AccountService';
import ValidRegister from '../models/register';
import Validate from '../utils/validator';

const formState = {
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  bucket: '',
};

const errorState = {
  username: [],
  password: [],
  confirmPassword: [],
  email: [],
  bucket: [],
};

const Register = () => {
  const [formContent, onContentChange] = useState(formState);
  const [errorContent, onError] = useState(errorState);
  const [messages, onMessageChange] = useState('');
  const setInputs = (event) => onContentChange({
    ...formContent,
    [event.target.name]: event.target.value,
  });
  const onFormSubmit = (event) => {
    event.preventDefault();
    Validate(formContent, ValidRegister)
      .then((content) => {
        console.log(JSON.parse(JSON.stringify(content)));
        return RegisterRequest(content);
      })
      .then(() => {
        onError({ ...errorState });
        onContentChange({ ...formState });
        onMessageChange('new user created!');
      })
      .catch((error) => {
        if (error.message) {
          console.log(error);
          onMessageChange(error.message);
        } else {
          onError({ ...errorState, ...error });
        }
      });
  };
  const usernameErrors = errorContent.username.map((value) => <p key={value}>{value}</p>);
  const passwordErrors = errorContent.password.map((value) => <p key={value}>{value}</p>);
  const confirmErrors = errorContent.confirmPassword.map((value) => <p key={value}>{value}</p>);
  const bucketErrors = errorContent.bucket.map((value) => <p key={value}>{value}</p>);
  const emailErrors = errorContent.email.map((value) => <p key={value}>{value}</p>);
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
        value={formContent.username}
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
        name="confirmPassword"
        type="password"
        value={formContent.confirmPassword}
        onChange={setInputs}
        id="Confirm_Password"
      />
      <p>{messages}</p>
      { emailErrors }
      { usernameErrors }
      { bucketErrors }
      { passwordErrors }
      { confirmErrors }
      <button
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Register;
