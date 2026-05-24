import React, { useState } from 'react';
import { Menu, X, LogOut, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/useAuthStore';
import axios from 'axios';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer définitivement votre compte PlastiData ? Cette action est irréversible."
    );
    if (!confirmed) return;

    try {
      // Get the current token from useAuthStore
      const token = useAuthStore.getState().token;
      
      await axios.delete('http://localhost:8000/api/user/delete/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Votre compte a été supprimé avec succès.");
      logout();
      setDropdownOpen(false);
    } catch (error) {
      console.error("Account deletion failed:", error);
      alert("Une erreur est survenue lors de la suppression du compte.");
    }
  };

  const navigationLinks = [
    { label: 'Méthode', href: '/#methode' },
    { label: 'Dashboards', href: '/#dashboards' },
    { label: 'Offre', href: '/#offre' },
    { label: 'Bénéfices', href: '/#benefices' },
    { label: 'Contact', href: '/#contact' },
  ];

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : '';

  return (
    <header className="header">
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="logo" aria-label="Accueil PlastiData">
          <img src="/img/logo-plastidata.png" alt="logo" className='w-34 h-34'/>
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

        {/* Desktop CTA Actions */}
        <div className="header-actions" style={{ display: 'flex', alignItems: 'center' }}>
          {isAuthenticated ? (
            <div 
              className="user-menu-container" 
              style={{ marginRight: '24px' }}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div 
                className="user-avatar" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {firstLetter}
              </div>
              {dropdownOpen && (
                <div className="user-dropdown animate-fade-in">
                  <div className="user-info-section">
                    <div className="user-info-name">{user?.name}</div>
                    <div className="user-info-company">{user?.company}</div>
                  </div>
                  <button 
                    type="button" 
                    className="user-logout-btn"
                    style={{ marginBottom: '4px' }}
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                  >
                    <LogOut size={15} />
                    Se déconnecter
                  </button>
                  <button 
                    type="button" 
                    className="user-delete-btn"
                    onClick={handleDeleteAccount}
                  >
                    <Trash2 size={15} />
                    Supprimer le compte
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-link" style={{ marginRight: '24px', fontWeight: 'bold' }}>
              Connexion
            </Link>
          )}
          <Button href="/contact" variant="primary" className="header-btn">
            Demander une démo
          </Button>
        </div>

        {/* Mobile controls: CTA button and Hamburger Toggle side-by-side */}
        <div className="mobile-navbar-controls">
          <Button href="/contact" variant="primary" className="header-btn-mobile">
            Démo
          </Button>
          <button
            type="button"
            className="mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      
      <div className="bg-white">

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="mobile-overlay bg-white animate-fade-in" onClick={closeMobileMenu} />
        )}

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-drawer-header bg-white">
            <Link to="/" className="logo" onClick={closeMobileMenu}>
              <img src="/img/logo-plastidata.png" alt="logo" className='w-24 h-24'/>
            </Link>
            <button type="button" className="close-btn" onClick={closeMobileMenu}>
              <X size={26} />
            </button>
          </div>
          <nav className="mobile-nav bg-white">
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
            
            {isAuthenticated ? (
              <>
                <div className="mobile-user-profile bg-white">
                  <div className="mobile-user-flex">
                    <div className="user-avatar" style={{ width: '36px', height: '36px', fontSize: '14px', flexShrink: 0 }}>
                      {firstLetter}
                    </div>
                    <div className="mobile-user-details">
                      <span className="mobile-user-name">{user?.name}</span>
                      <span className="mobile-user-company">{user?.company}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="mobile-nav-link font-bold text-left w-full"
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  style={{ color: 'var(--danger)', borderBottom: '1px solid var(--border-color)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Se déconnecter
                </button>
                <button
                  type="button"
                  className="mobile-nav-link font-bold text-left w-full"
                  onClick={() => {
                    handleDeleteAccount();
                    closeMobileMenu();
                  }}
                  style={{ color: '#94a3b8', borderBottom: '1px solid var(--border-color)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Supprimer le compte
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="mobile-nav-link font-bold"
                onClick={closeMobileMenu}
                style={{ color: 'var(--danger)', borderBottom: '1px solid var(--border-color)' }}
              >
                Connexion
              </Link>
            )}

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
      </div>
    </header>
  );
};
