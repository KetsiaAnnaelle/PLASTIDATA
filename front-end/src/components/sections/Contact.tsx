import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Mail, Globe } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const Contact: React.FC = () => {
  // Viewport scroll reveal hook
  const [sectionRef, isRevealed] = useIntersectionObserver();
  const mailToUrl = "mailto:contact@plastidata.fr?subject=Demande%20de%20d%C3%A9mo%20PlastiData";

  return (
    <section 
      ref={sectionRef} 
      className={`section section-light cta-section reveal-section ${isRevealed ? 'revealed' : ''}`} 
      id="contact"
    >
      <div className="container">
        <div className="text-center-wrapper">
          <Badge>Envie d'aller plus loin ?</Badge>
          <h2 className="section-title">
            Découvrons comment PlastiData peut aider votre usine.
          </h2>
          <p className="section-intro">
            Réservez un échange pour identifier vos besoins, vos données disponibles et les dashboards les plus utiles pour votre contexte.
          </p>
        </div>

        <div className="contact-box-container">
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
              href={mailToUrl}
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
