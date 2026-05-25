import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layout & Section Components
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { Method } from './components/sections/Method';
import { Dashboards } from './components/sections/Dashboards';
import { Offer } from './components/sections/Offer';
import { Benefits } from './components/sections/Benefits';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

// Page Components
import { ContactPage } from './components/pages/ContactPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';

// Floating AI assistant agent component
import { PlastiPilotAgent } from './components/ui/PlastiPilotAgent';

import './App.css';

// Premium Scroll-to-Top recovery helper on route modifications
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    // If there is no anchor hash (like #methode), scroll instantly to the top
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // If there is a hash, scroll smoothly to the element
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

// Home Landing Page Assembler
const HomePage: React.FC = () => {
  return (
    <div className="app-root">
      {/* Sticky nav */}
      <Header />

      <main>
        {/* Animated Hero section with dashboard mockups */}
        <Hero />

        {/* Ebook & operational process steps */}
        <Method />

        {/* Interactive 360 dashboards tab previewer */}
        <Dashboards />

        {/* 3-Pillar industrial offer */}
        <Offer />

        {/* Client metrics & productivity gains list */}
        <Benefits />

        {/* Demo booking contact box */}
        <Contact />
      </main>

      {/* Upgraded footer */}
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Re-scroll helper */}
      <ScrollToTop />
      
      <Routes>
        {/* Core landing page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Faithful contact page reproduction */}
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Dynamic authenticated forms */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {/* PlastiPilot Floating AI Assistant Agent */}
      <PlastiPilotAgent />
    </BrowserRouter>
  );
};

export default App;
