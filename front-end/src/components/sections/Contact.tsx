import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Mail, Globe } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useAuthStore } from '../../store/useAuthStore';

export const Contact: React.FC = () => {
  const [sectionRef, isRevealed] = useIntersectionObserver();
  const { isAuthenticated } = useAuthStore();

  return (
    <section 
      ref={sectionRef} 
      className={`section section-light cta-section reveal-section ${isRevealed ? 'revealed' : ''}`} 
      id="contact"
    >
      <div className="container">
        <div className="text-center-wrapper">
          <Badge className="reveal-item">Envie d'aller plus loin ?</Badge>
          <h2 className="section-title reveal-item">
            Découvrons comment PlastiData peut aider votre usine.
          </h2>
          <p className="section-intro reveal-item">
            Réservez un échange pour identifier vos besoins, vos données disponibles et les dashboards les plus utiles pour votre contexte.
          </p>
        </div>

        <div className="contact-box-container reveal-item">
          <div className="contact-info-block">
            <h3 className="contact-title">Contact PlastiData</h3>
            
            <div className="contact-details-list">
              <a href="mailto:contact@plastidata.fr" className="contact-link-item">
                <Mail size={18} className="contact-icon-accent" />
                <span>contact@plastidata.fr</span>
              </a>
              <a href="https://www.plastidata.fr" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <Globe size={18} className="contact-icon-accent" />
                <span>www.plastidata.fr</span>
              </a>
            </div>
          </div>
          
          <div className="contact-action-block">
            <Button
              href={isAuthenticated ? "/contact?need=demo" : "/login?redirect=/contact?need=demo"}
              variant="primary"
              className="cta-demo-btn"
            >
              Demander une démo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
