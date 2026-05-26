import React from 'react';
import { Badge } from '../ui/Badge';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface DashboardItem {
  id: string;
  title: string;
  desc: string;
  tags: string[];
}

export const Dashboards: React.FC = () => {
  const [sectionRef, isRevealed] = useIntersectionObserver();

  const dashboards: DashboardItem[] = [
    {
      id: 'qualite',
      title: 'Dashboard Qualité',
      desc: 'Maîtrisez vos défauts, PPM, rebuts, lots bloqués et priorisez les actions qualité grâce aux Pareto et tendances.',
      tags: ['PPM', 'Pareto', 'Non-conformités', 'Lots bloqués'],
    },
    {
      id: 'process',
      title: 'Dashboard Process',
      desc: 'Suivez le TRS, temps de cycle, CP/CPK et les performances par presse, moule, équipe et période.',
      tags: ['TRS', 'CP / CPK', 'Temps cycle', 'Presse'],
    },
    {
      id: 'donnees',
      title: 'Dashboard Données',
      desc: 'Fiabilisez vos sources, measurez la complétude, détectez les anomalies et sécurisez vos décisions.',
      tags: ['Complétude', 'Doublons', 'Anomalies', 'Sources'],
    },
    {
      id: 'organisation',
      title: 'Dashboard Organisation',
      desc: 'Pilotez les actions, les retards, les responsabilités et les récidives pour faire durer l\'amélioration.',
      tags: ['Actions', 'Retards', 'Responsables', 'Récidives'],
    },
  ];

  const dashboardImages: Record<string, string> = {
    qualite: '/img/Dash-Qualite.jpeg',
    process: '/img/DashProcess.jpeg',
    donnees: '/img/Dash-Data.jpeg',
    organisation: '/img/Dash-organisation.jpeg',
  };

  return (
    <section 
      ref={sectionRef} 
      className={`section section-light reveal-section ${isRevealed ? 'revealed' : ''}`} 
      id="dashboards"
    >
      <div className="container">
        <div className="text-center-wrapper">
          <Badge className="reveal-item">Écosystème PlastiData</Badge>
          <h2 className="section-title reveal-item">
            4 tableaux de bord pour piloter votre performance industrielle à <span>360°.</span>
          </h2>
          <p className="section-intro reveal-item">
            Chaque dashboard répond à un pilier de la méthode : qualité, process, données et organisation.
            Ensemble, ils donnent une vision complète de vos priorités terrain.
          </p>
        </div>

        <div className="dashboard-grid">
          {dashboards.map((card) => {
            return (
              <article key={card.id} className="dashboard-card reveal-item">
                <div className="dashboard-preview-container" style={{ height: '240px', overflow: 'hidden', borderBottom: '1px solid #e2e8f0', position: 'relative' }}>
                  <img
                    src={dashboardImages[card.id]}
                    alt={card.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className="dashboard-preview-img"
                  />
                </div>

                <div className="dashboard-body">
                  <h3 className="dashboard-card-title">{card.title}</h3>
                  <p className="dashboard-card-text">{card.desc}</p>
                  
                  <div className="tags">
                    {card.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
