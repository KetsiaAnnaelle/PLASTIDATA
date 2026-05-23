import React from 'react';
import { Mail, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Column 1: Brand Info */}
        <div className="footer-col brand-col">
          <Link to="/" className="logo footer-logo" aria-label="Accueil PlastiData">
            <span className="logo-icon">▰</span>
            <span className="logo-text">PlastiData<span className="logo-accent">.</span></span>
          </Link>
          <p className="footer-brand-text">
            La data au cœur de la plasturgie. Nous aidons les industriels de la production à structurer leurs données qualité et process pour passer du mode urgence au pilotage terrain pérenne.
          </p>
        </div>

        {/* Column 2: Sitemap Navigation */}
        <div className="footer-col links-col">
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-links-list">
            <li>
              <a href="/#methode" className="footer-link">
                <ArrowRight size={14} className="bullet-arrow" />
                <span>Notre Méthode</span>
              </a>
            </li>
            <li>
              <a href="/#dashboards" className="footer-link">
                <ArrowRight size={14} className="bullet-arrow" />
                <span>Nos Dashboards</span>
              </a>
            </li>
            <li>
              <a href="/#offre" className="footer-link">
                <ArrowRight size={14} className="bullet-arrow" />
                <span>Notre Offre</span>
              </a>
            </li>
            <li>
              <a href="/#benefices" className="footer-link">
                <ArrowRight size={14} className="bullet-arrow" />
                <span>Bénéfices client</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Solutions Grid */}
        <div className="footer-col links-col">
          <h4 className="footer-col-title">Écosystème</h4>
          <ul className="footer-links-list">
            <li>
              <a href="/#dashboards" className="footer-link">
                <ArrowRight size={14} className="bullet-arrow" />
                <span>Dashboard Qualité</span>
              </a>
            </li>
            <li>
              <a href="/#dashboards" className="footer-link">
                <ArrowRight size={14} className="bullet-arrow" />
                <span>Dashboard Process</span>
              </a>
            </li>
            <li>
              <a href="/#dashboards" className="footer-link">
                <ArrowRight size={14} className="bullet-arrow" />
                <span>Dashboard Données</span>
              </a>
            </li>
            <li>
              <a href="/#dashboards" className="footer-link">
                <ArrowRight size={14} className="bullet-arrow" />
                <span>Dashboard Organisation</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Details */}
        <div className="footer-col contact-col">
          <h4 className="footer-col-title">Contact</h4>
          <p className="footer-contact-desc">
            Vous souhaitez analyser vos sources disponibles ou planifier un diagnostic ?
          </p>
          <div className="footer-contact-links">
            <a href="mailto:contact@plastidata.fr" className="footer-contact-link">
              <Mail size={16} />
              <span>contact@plastidata.fr</span>
            </a>
            <a href="https://www.plastidata.fr" target="_blank" rel="noopener noreferrer" className="footer-contact-link">
              <Globe size={16} />
              <span>www.plastidata.fr</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright-text">
            &copy; {currentYear} PlastiData. Tous droits réservés.
          </p>
          
          <div className="legal-links">
            <Link to="/contact" className="legal-link">Mentions Légales</Link>
            <span className="legal-divider">&middot;</span>
            <Link to="/contact" className="legal-link">Politique de Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
