import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navigationLinks = [
    { label: 'Méthode', href: '#methode' },
    { label: 'Dashboards', href: '#dashboards' },
    { label: 'Offre', href: '#offre' },
    { label: 'Bénéfices', href: '#benefices' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="header">
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#" className="logo" aria-label="Accueil PlastiData">
          <span className="logo-icon">▰</span>
          <span className="logo-text">PlastiData<span className="logo-accent">.</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Action */}
        <div className="header-actions">
          <Button href="mailto:contact@plastidata.fr?subject=Demande%20de%20d%C3%A9mo%20PlastiData" variant="primary" className="header-btn">
            Demander une démo
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay animate-fade-in" onClick={closeMobileMenu} />
      )}

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <a href="#" className="logo" onClick={closeMobileMenu}>
            <span className="logo-icon">▰</span>
            <span className="logo-text">PlastiData</span>
          </a>
          <button type="button" className="close-btn" onClick={closeMobileMenu}>
            <X size={26} />
          </button>
        </div>
        <nav className="mobile-nav">
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              {link.label}
            </a>
          ))}
          <Button
            href="mailto:contact@plastidata.fr?subject=Demande%20de%20d%C3%A9mo%20PlastiData"
            variant="primary"
            className="mobile-cta-btn"
            onClick={closeMobileMenu}
          >
            Demander une démo
          </Button>
        </nav>
      </div>
    </header>
  );
};
