import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../animations/ScrollToTop';
import ScrollProgress from '../animations/ScrollProgress';

const Main = styled.main`
  min-height: calc(100vh - 200px);
`;

const PageTransition = styled.div`
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <ScrollProgress />
      <Header />
      <Main>
        <PageTransition>{children}</PageTransition>
      </Main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Layout;