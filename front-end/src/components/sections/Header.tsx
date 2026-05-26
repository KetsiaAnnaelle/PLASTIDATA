import React, { useState } from 'react';
import { Menu, X, LogOut, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/useAuthStore';
import axios from 'axios';
import { API_URL } from '../../config';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  const handleMobileLogout = () => {
    logout();
    closeMobileMenu();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer définitivement votre compte PlastiData ? Cette action est irréversible."
    );
    if (!confirmed) return;

    try {
      const token = useAuthStore.getState().accessToken;
      
      await axios.delete(`${API_URL}/user/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Votre compte a été supprimé avec succès.");
      logout();
      setDropdownOpen(false);
      navigate('/login');
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
        <Link to="/" className="logo" aria-label="Accueil PlastiData">
          <img src="/img/logo-plastidata.png" alt="logo" className="w-34 h-34" />
        </Link>

        <nav className="desktop-nav">
          {navigationLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {isAuthenticated ? (
            <>
              <Button href="/contact" variant="primary" className="header-btn">
                Démo
              </Button>
              <div 
                className="user-menu-container" 
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
                      onClick={handleLogout}
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
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" style={{ fontWeight: 'bold' }}>
                Connexion
              </Link>
              <Button href="/contact" variant="primary" className="header-btn">
                Démo
              </Button>
            </>
          )}
        </div>

        <div className="mobile-navbar-controls">
          
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
        {mobileMenuOpen && (
          <div className="mobile-overlay bg-white animate-fade-in" onClick={closeMobileMenu} />
        )}

        <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-drawer-header bg-white">
            <Link to="/" className="logo" onClick={closeMobileMenu}>
              <img src="/img/logo-plastidata.png" alt="logo" className="w-24 h-24" />
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
                
                <button
                  type="button"
                  className="mobile-nav-link font-bold text-left w-full"
                  onClick={handleMobileLogout}
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
          </nav>
        </div>
      </div>
    </header>
  );
};
