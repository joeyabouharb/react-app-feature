import React, { useState } from 'react';
import Input from '../Shared/FormControls';
import { RegisterRequest } from '../../services/AccountService';
import ValidRegister from '../../models/register';
import Validate from '../../utils/validator';
import Loading from '../Loading/Loading';

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
  const [isLoading, toggleLoading] = useState();
  const setInputs = (event) => onContentChange({
    ...formContent,
    [event.target.name]: event.target.value,
  });
  const onFormSubmit = (event) => {
    event.preventDefault();
    toggleLoading(true);
    Validate(formContent, ValidRegister)
      .then((content) => RegisterRequest(content))
      .then(() => {
        toggleLoading(false);
        onError({ ...errorState });
        onContentChange({ ...formState });
        onMessageChange('new user created!');
      })
      .catch((error) => {
        console.log(error);
        toggleLoading(false);
        if (error.message) {
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
  return !isLoading ? (
    <div className="section">
      <form
        onSubmit={onFormSubmit}
        className="container card"
        style={{ padding: '2rem', maxWidth: '700px', borderRadius: '0.5rem' }}
      >
        <h2 className="title is-2 has-text-dark">Register</h2>
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
          className="button is-info"
        >
          Submit
        </button>
      </form>
    </div>
  ) : <Loading loading={isLoading}/>;
};

export default Register;
