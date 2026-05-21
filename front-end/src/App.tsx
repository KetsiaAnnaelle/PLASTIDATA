import React from 'react';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { Method } from './components/sections/Method';
import { Dashboards } from './components/sections/Dashboards';
import { Offer } from './components/sections/Offer';
import { Benefits } from './components/sections/Benefits';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-root">
      {/* Dynamic responsive sticky nav */}
      <Header />

      {/* Main landing contents */}
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

      {/* Upgraded multi-column professional footer */}
      <Footer />
    </div>
  );
};

export default App;
