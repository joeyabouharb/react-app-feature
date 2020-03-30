import PropTypes from 'prop-types';
import React, {
  createElement,
  useReducer,
  useContext,
} from 'react';
import loginReducer from './reducers';

const AuthContext = React.createContext();
const AuthDispatchContext = React.createContext();
const initialState = null;

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  return createElement(
    AuthContext.Provider,
    { value: state },
    createElement(
      AuthDispatchContext.Provider, { value: dispatch },
      children,
    ),
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('Hmm?');
  }
  return context;
};


export const useAuthDispatch = () => useContext(AuthDispatchContext);
