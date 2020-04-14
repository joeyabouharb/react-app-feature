import { createElement, lazy } from 'react';
import { Route, Redirect } from 'react-router';
import { useAuthContext } from '../contexts/auth/useAuthContext';

const Bucket = lazy(() => import('../components/Bucket/Bucket'));
const Login = lazy(() => import('../components/Login/Login'));
const Register = lazy(() => import('../components/Register/Register'))

/**
 * decleration of secure routes
 */
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
/**
 * Decleration of guest routes.
 */
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
/**
 * Component that will return our list of secure routes
 * will redirect to a guest route if user is unauthenticated
 */
export const SecureRouter = Object.freeze(() => {
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
});

/**
 * routes accessible only to guest (unauthenticated users)
 * authenticated users will not need these routes
 */
export const GuestRouter = Object.freeze(() => {
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
});
