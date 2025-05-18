import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ThankYouPage from './pages/ThankYouPage';
import ScheduleServicePage from './pages/ScheduleServicePage';

function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/servicos/agendar/:serviceId?" element={<ScheduleServicePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/agradecimento" element={<ThankYouPage />} />
        </Routes>
      </Layout>
    </CartProvider>
  );
}

export default App;