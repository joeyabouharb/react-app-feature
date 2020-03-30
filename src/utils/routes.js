import { createElement } from 'react';
import { Route, Redirect } from 'react-router';
import Bucket from '../components/Bucket';
import Login from '../components/Login';
import Register from '../components/Register';
import { useAuthContext } from '../contexts/auth/useAuthContext';

const secureRoutes = [
  {
    path: '/',
    exact: true,
    component: Bucket,
  },
  {
    path: '/bucket',
    component: Bucket,
    exact: true,
  },
];

const guestRoutes = [
  {
    path: '/register',
    component: Register,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
  },
];

export const SecureRouter = () => {
  const state = useAuthContext();
  return secureRoutes.map(
    ({
      path, exact, component, ...rest
    }) => createElement(
      Route, {
        key: path,
        path,
        exact,
        render: (props) => (
          state
            ? createElement(
              component, { ...props, ...rest },
            )
            : createElement(Redirect, { to: '/login' })),
      },
    ),
  );
};

export const GuestRouter = () => {
  const state = useAuthContext();
  return guestRoutes.map(({
    path, exact, component, ...rest
  }) => createElement(
    Route, {
      key: path,
      path,
      exact,
      render: (props) => (
        !state
          ? createElement(
            component, { props, rest },
          )
          : createElement(Redirect, { to: '/' })
      ),
    },
  ));
};
