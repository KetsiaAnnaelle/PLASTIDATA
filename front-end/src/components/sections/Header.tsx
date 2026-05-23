import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    { label: 'Méthode', href: '/#methode' },
    { label: 'Dashboards', href: '/#dashboards' },
    { label: 'Offre', href: '/#offre' },
    { label: 'Bénéfices', href: '/#benefices' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="header">
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="logo" aria-label="Accueil PlastiData">
          <img src="img/logo-plastidata.png" alt="logo" className='w-34 h-34'/>
        </Link>

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

        {/* Desktop CTA Action redirecting to Contact form */}
        <div className="header-actions">
          <Button href="/contact" variant="primary" className="header-btn">
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
      <div className={`mobile-drawer bg-white ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
          <img src="img/logo-plastidata.png" alt="logo" className='w-34 h-34'/>
           
          </Link>
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
            href="/contact"
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
