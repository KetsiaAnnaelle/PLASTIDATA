import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface DashboardItem {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  kpis: { label: string; val: string }[];
  bars: number[];
  activePillIndex: number;
}

export const Dashboards: React.FC = () => {
  // Viewport scroll reveal hook
  const [sectionRef, isRevealed] = useIntersectionObserver();

  // Config for the 4 industrial dashboards
  const dashboards: DashboardItem[] = [
    {
      id: 'qualite',
      title: 'Dashboard Qualité',
      desc: 'Maîtrisez vos défauts, PPM, rebuts, lots bloqués et priorisez les actions qualité grâce aux Pareto et tendances.',
      tags: ['PPM', 'Pareto', 'Non-conformités', 'Lots bloqués'],
      kpis: [
        { label: 'PPM', val: '41K' },
        { label: 'Rebut', val: '4,1%' },
        { label: 'NC', val: '17K' },
        { label: 'Lots', val: '20' }, // Critical KPI (will be highlighted in red)
      ],
      bars: [90, 78, 62, 48],
      activePillIndex: 0,
    },
    {
      id: 'process',
      title: 'Dashboard Process',
      desc: 'Suivez le TRS, temps de cycle, CP/CPK et les performances par presse, moule, équipe et période.',
      tags: ['TRS', 'CP / CPK', 'Temps cycle', 'Presse'],
      kpis: [
        { label: 'TRS', val: '73,69%' },
        { label: 'CPK', val: '1,22' },
        { label: 'CP', val: '1,48' },
        { label: 'Cycle', val: '30,1s' },
      ],
      bars: [76, 74, 73, 72],
      activePillIndex: 1,
    },
    {
      id: 'donnees',
      title: 'Dashboard Données',
      desc: 'Fiabilisez vos sources, mesurez la complétude, détectez les anomalies et sécurisez vos décisions.',
      tags: ['Complétude', 'Doublons', 'Anomalies', 'Sources'],
      kpis: [
        { label: 'Complétude', val: '92,5%' },
        { label: 'Doublons', val: '469' },
        { label: 'KPIs', val: '10' },
        { label: 'Sources', val: '4' },
      ],
      bars: [94, 93, 91, 91],
      activePillIndex: 2,
    },
    {
      id: 'organisation',
      title: 'Dashboard Organisation',
      desc: 'Pilotez les actions, les retards, les responsabilités et les récidives pour faire durer l\'amélioration.',
      tags: ['Actions', 'Retards', 'Responsables', 'Récidives'],
      kpis: [
        { label: 'Actions', val: '40' },
        { label: 'Clôture', val: '20%' },
        { label: 'Retard', val: '40' }, // Critical KPI (will be highlighted in red)
        { label: 'Récidives', val: '7' },
      ],
      bars: [100, 85, 50, 50],
      activePillIndex: 3,
    },
  ];

  // Micro-interaction: Active preview state for charts inside cards
  const [activeTabPerCard, setActiveTabPerCard] = useState<Record<string, number>>({
    qualite: 0,
    process: 1,
    donnees: 2,
    organisation: 3,
  });

  const handlePillClick = (cardId: string, index: number) => {
    setActiveTabPerCard((prev) => ({
      ...prev,
      [cardId]: index,
    }));
  };

  return (
    <section 
      ref={sectionRef} 
      className={`section section-light reveal-section ${isRevealed ? 'revealed' : ''}`} 
      id="dashboards"
    >
      <div className="container">
        <div className="text-center-wrapper">
          <Badge>Écosystème PlastiData</Badge>
          <h2 className="section-title">
            4 tableaux de bord pour piloter votre performance industrielle à <span>360°.</span>
          </h2>
          <p className="section-intro">
            Chaque dashboard répond à un pilier de la méthode : qualité, process, données et organisation.
            Ensemble, ils donnent une vision complète de vos priorités terrain.
          </p>
        </div>

        <div className="dashboard-grid">
          {dashboards.map((card) => {
            const activePill = activeTabPerCard[card.id] ?? card.activePillIndex;

            return (
              <article key={card.id} className="dashboard-card">
                {/* Mockup Dashboard Preview Container */}
                <div className="dashboard-preview">
                  {/* Left Menu inside Mockup */}
                  <div className="side-menu">
                    {[0, 1, 2, 3].map((pillIndex) => (
                      <button
                        key={pillIndex}
                        type="button"
                        className={`menu-pill-btn ${activePill === pillIndex ? 'active' : ''}`}
                        onClick={() => handlePillClick(card.id, pillIndex)}
                        aria-label={`Onglet ${pillIndex + 1}`}
                      />
                    ))}
                  </div>

                  {/* Right Content Area inside Mockup */}
                  <div className="preview-content">
                    {/* Mini stats row */}
                    <div className="mini-kpis">
                      {card.kpis.map((kpi, kIdx) => {
                        // Highlight critical KPIs like Quality blocked lots ("Lots") or Organisation delays ("Retard") in red
                        const isRedAlertKpi = (card.id === 'qualite' && kpi.label === 'Lots') || 
                                             (card.id === 'organisation' && kpi.label === 'Retard');

                        return (
                          <div 
                            key={kIdx} 
                            className={`mini-kpi ${isRedAlertKpi ? 'highlight-red-kpi' : ''}`}
                          >
                            <span className="mini-kpi-label">{kpi.label}</span>
                            <strong className="mini-kpi-val">{kpi.val}</strong>
                          </div>
                        );
                      })}
                    </div>

                    {/* Mini interactive charts */}
                    <div className="mini-charts">
                      <div className="mini-chart">
                        <div className="mini-bars">
                          {card.bars.map((height, barIdx) => {
                            // Highlight the largest bar in red in Qualité or Organisation dashboards
                            const isRedBar = (card.id === 'qualite' && barIdx === 0) || 
                                            (card.id === 'organisation' && barIdx === 0);

                            return (
                              <span
                                key={barIdx}
                                className={`mini-bar-col ${isRedBar ? 'accent-red-bar' : ''}`}
                                style={{ height: `${height}%` }}
                              />
                            );
                          })}
                        </div>
                      </div>

                      <div className="mini-chart trend-container">
                        {/* Interactive mini trend line drawing */}
                        <svg className="mini-trend-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
                          <path
                            d={`M 5,40 L 25,${45 - activePill * 8} L 50,${15 + activePill * 4} L 75,${35 - activePill * 5} L 95,10`}
                            fill="none"
                            stroke="#044776"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Meta/Description */}
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
