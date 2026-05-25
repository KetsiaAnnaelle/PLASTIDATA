import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const Hero: React.FC = () => {
  // Viewport scroll reveal hook
  const [sectionRef, isRevealed] = useIntersectionObserver(0.1);

  return (
    <section 
      ref={sectionRef} 
      className={`hero-section reveal-section ${isRevealed ? 'revealed' : ''}`}
    >
      <div className="container hero-grid">
        {/* Left Side: Text Details */}
        <div className="hero-content">
          <Badge className="reveal-item">La data au cœur de la plasturgie</Badge>
          <h1 className="hero-title reveal-item">
            Sortez du mode urgence. <span className="hero-title-highlight">Pilotez avec méthode.</span>
          </h1>
          <p className="hero-text reveal-item">
            PlastiData aide les industriels de la plasturgie à transformer leurs données qualité, process, 
            données et organisation en décisions concrètes pour améliorer durablement la performance.
          </p>
          
          <div className="hero-actions reveal-item">
            <Button href="/contact" variant="primary">
              Découvrir les dashboards
            </Button>
            <Button href="#methode" variant="secondary">
              Voir la méthode
            </Button>
          </div>

          <div className="hero-proof reveal-item">
            <div className="proof-card">
              <strong className="proof-val">4</strong>
              <p className="proof-desc">tableaux de bord complémentaires</p>
            </div>
            <div className="proof-card">
              <strong className="proof-val">360°</strong>
              <p className="proof-desc">vision qualité, process, data et organisation</p>
            </div>
            <div className="proof-card">
              <strong className="proof-val text-danger">Terrain</strong>
              <p className="proof-desc">une méthode issue de l'industrie</p>
            </div>
          </div>
        </div>

        {/* Right Side: Real Dashboard Screenshot */}
        <div className="hero-visual reveal-item">
          <div className="dashboard-browser-mockup">
            <div className="browser-header">
              <div className="browser-dots">
                <span className="dot dot-close"></span>
                <span className="dot dot-minimize"></span>
                <span className="dot dot-maximize"></span>
              </div>
              <div className="browser-address">
                <span className="address-lock">🔒</span>
                <span className="address-text">app.plastidata.fr/dashboard</span>
              </div>
            </div>
            <div className="browser-body">
              <img 
                src="/img/HeroDash.jpeg" 
                alt="Tableau de bord industriel PlastiData" 
                className="dashboard-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
