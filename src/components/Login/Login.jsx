import React, { useState } from 'react';
import { useAuthDispatch } from '../../contexts/auth/useAuthContext';
import { LoginRequest } from '../../services/AccountService';
import { userLogsIn } from '../../contexts/auth/actions';
import Input from '../Shared/FormControls';
import Validate from '../../utils/validator';
import ValidLogin from '../../models/login';
import Loading from '../Loading/Loading';

const errorState = {
  credential: [],
  password: [],
};

const formState = {
  credential: '',
  password: '',
};

const Login = () => {
  const [formContent, onContentChange] = useState(formState);
  const [messages, onMessageChange] = useState('');
  const [formErrors, onFormError] = useState(errorState);
  const [isLoading, toggleLoading] = useState();
  const setInputs = (event) => onContentChange({
    ...formContent,
    [event.target.name]: event.target.value,
  });

  const dispatch = useAuthDispatch();
  const onFormSubmit = (event) => {
    event.preventDefault();
    toggleLoading(true);
    Validate(formContent, ValidLogin)
      .then((content) => LoginRequest(content))
      .then((data) => {
        dispatch(userLogsIn(data.token));
      }).catch((error) => {
        toggleLoading(false);
        if (error.message) {
          onMessageChange([error.message]);
        } else {
          onFormError({ ...formErrors, ...error });
        }
      });
  };
  const credentialErrors = formErrors.credential.map((error) => <p key={error}>{error}</p>);
  const passwordErrors = formErrors.password.map((error) => <p key={error}>{error}</p>);
  return !isLoading ? (
    <div className="section">
      <form
        onSubmit={onFormSubmit}
        className="container card"
        style={{ padding: '2rem', maxWidth: '700px', borderRadius: '0.5rem' }}
      >
        <h2 className="title is-2 has-text-dark">Login</h2>
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
        { credentialErrors }
        { passwordErrors }
        <button
          type="submit"
          className="button is-info"
        >
          Submit
        </button>
      </form>
    </div>
  ) : <Loading loading={isLoading} />;
};

export default Login;
