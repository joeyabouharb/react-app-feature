import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/useAuthContext';
import { SecureRouter, GuestRouter } from './utils/routes';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Header />
      <section>
        <SecureRouter />
        <GuestRouter />
      </section>
      <Footer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
