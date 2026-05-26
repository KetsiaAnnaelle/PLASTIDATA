import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { Method } from './components/sections/Method';
import { Dashboards } from './components/sections/Dashboards';
import { Offer } from './components/sections/Offer';
import { Benefits } from './components/sections/Benefits';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

import { ContactPage } from './components/pages/ContactPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';

import { PlastiPilotAgent } from './components/ui/PlastiPilotAgent';

import './App.css';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

const HomePage: React.FC = () => {
  return (
    <div className="app-root">
      <Header />
      <main>
        <Hero />
        <Method />
        <Dashboards />
        <Offer />
        <Benefits />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <PlastiPilotAgent />
    </BrowserRouter>
  );
};

export default App;
