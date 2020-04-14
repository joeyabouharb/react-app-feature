import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/useAuthContext';
import { SecureRouter, GuestRouter } from './utils/routes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading';

import './components/Shared/shared.sass';


const App = Object.freeze(() => {
  const onFileDrop = function onDrop(event) {
    event.preventDefault();
  };
  return (
    <main
      className="hero is-fullheight is-dark"
      onDrop={onFileDrop}
      onDragLeave={onFileDrop}
      onDragOver={onFileDrop}
    >
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <section className="hero-body-with-navbar">
            <React.Suspense fallback={<Loading loading />}>
              <SecureRouter />
              <GuestRouter />
            </React.Suspense>
          </section>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </main>
  );
});

export default App;
