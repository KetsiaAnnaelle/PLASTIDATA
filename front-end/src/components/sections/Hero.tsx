import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const Hero: React.FC = () => {
  const [filterActive, setFilterActive] = useState('Tous');
  
  // Viewport scroll reveal hook
  const [sectionRef, isRevealed] = useIntersectionObserver(0.1);

  const handleFilterClick = (filter: string) => {
    setFilterActive(filter);
  };

  const getMetrics = () => {
    switch (filterActive) {
      case 'Presse A':
        return { ppm: '38K', scrap: '3.8%', nc: '12K', blocked: '14' };
      case 'Presse B':
        return { ppm: '45K', scrap: '4.5%', nc: '22K', blocked: '26' };
      default:
        return { ppm: '41K', scrap: '4.1%', nc: '17K', blocked: '20' };
    }
  };

  const metrics = getMetrics();

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
              <strong className="proof-val text-danger">Terrain</strong> {/* Strategic cyan highlight text */}
              <p className="proof-desc">une méthode issue de l'industrie</p>
            </div>
          </div>
        </div>

        {/* Right Side: Mockup Interactive Dashboard */}
        <div className="hero-visual reveal-item">
          <div className="dashboard-frame">
            <div className="dashboard-screen">
              <div className="screen-header">
                <h3 className="screen-title">Vue d'ensemble Qualité</h3>
                
                <div className="screen-filters">
                  {['Tous', 'Presse A', 'Presse B'].map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      className={`filter-tab-pill ${filterActive === filter ? 'active' : ''}`}
                      onClick={() => handleFilterClick(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stat/KPI Card Grid with cyan alert highlighted lot limits */}
              <div className="kpi-grid">
                <div className="kpi-card">
                  <span className="kpi-label">PPM Global</span>
                  <strong className="kpi-value">{metrics.ppm}</strong>
                </div>
                <div className="kpi-card">
                  <span className="kpi-label">Taux rebut</span>
                  <strong className="kpi-value">{metrics.scrap}</strong>
                </div>
                <div className="kpi-card">
                  <span className="kpi-label">Total NC</span>
                  <strong className="kpi-value">{metrics.nc}</strong>
                </div>
                
                {/* Highlighted lots card styled in cyan since blocked products are critical alerts */}
                <div className="kpi-card critical-alert">
                  <span className="kpi-label">Lots bloqués</span>
                  <strong className="kpi-value">{metrics.blocked}</strong>
                </div>
              </div>

              <div className="chart-layouts">
                <div className="chart-item">
                  <strong className="chart-title">Pareto défauts qualité</strong>
                  <div className="bars-container">
                    <div className="bar-wrapper">
                      {/* Strategic cyan column accent for the major failure category (Fissure) */}
                      <div className="bar-fill accent-red-bar" style={{ height: '96%' }}></div>
                      <span className="bar-label">Fissure</span>
                    </div>
                    <div className="bar-wrapper">
                      <div className="bar-fill" style={{ height: '78%' }}></div>
                      <span className="bar-label">Retrait</span>
                    </div>
                    <div className="bar-wrapper">
                      <div className="bar-fill" style={{ height: '65%' }}></div>
                      <span className="bar-label">Bavure</span>
                    </div>
                    <div className="bar-wrapper">
                      <div className="bar-fill" style={{ height: '54%' }}></div>
                      <span className="bar-label">Aspect</span>
                    </div>
                    <div className="bar-wrapper">
                      <div className="bar-fill" style={{ height: '43%' }}></div>
                      <span className="bar-label">Poids</span>
                    </div>
                  </div>
                </div>

                <div className="chart-item">
                  <strong className="chart-title">Tendance mensuelle (PPM)</strong>
                  <div className="svg-chart-container">
                    <svg className="trend-svg" viewBox="0 0 300 100" preserveAspectRatio="none">
                      <line x1="0" y1="25" x2="300" y2="25" stroke="#e2e8f0" strokeWidth="1" />
                      <line x1="0" y1="50" x2="300" y2="50" stroke="#e2e8f0" strokeWidth="1" />
                      <line x1="0" y1="75" x2="300" y2="75" stroke="#e2e8f0" strokeWidth="1" />
                      
                      <path
                        d="M 10,80 L 60,75 L 110,60 L 160,35 L 210,50 L 260,20 L 290,15"
                        fill="none"
                        stroke="#044776"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      
                      <circle cx="60" cy="75" r="4.5" fill="#044776" />
                      <circle cx="160" cy="35" r="4.5" fill="#044776" />
                      
                      {/* Highlight key visual coordinate in warning cyan */}
                      <circle cx="260" cy="20" r="5" fill="#1dbde8" />
                    </svg>
                    
                    <div className="trend-labels">
                      <span>Jan</span>
                      <span>Mar</span>
                      <span>Mai</span>
                      <span>Jul</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
