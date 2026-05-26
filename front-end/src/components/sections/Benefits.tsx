import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const Benefits: React.FC = () => {
  const [sectionRef, isRevealed] = useIntersectionObserver();

  const benefitItems = [
    {
      highlight: '-20 à -40%',
      text: 'de défauts grâce à un meilleur pilotage',
      isDangerHighlight: true,
    },
    {
      highlight: 'Gain de temps',
      text: 'dans les réunions et analyses quotidiennes',
      isDangerHighlight: false,
    },
    {
      highlight: 'Réactivité',
      text: 'face aux dérives qualité et process',
      isDangerHighlight: false,
    },
    {
      highlight: 'Alignement',
      text: "des équipes autour d'indicateurs communs",
      isDangerHighlight: false,
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className={`section reveal-section ${isRevealed ? 'revealed' : ''}`} 
      id="benefices"
    >
      <div className="container">
        <div className="benefits-card">
          <div className="benefits-info">
            <h2 className="benefits-title reveal-item">
              Faites de vos données votre meilleur levier de performance.
            </h2>
            <p className="benefits-desc reveal-item">
              PlastiData aide vos équipes à voir plus clair, agir plus vite et prendre de meilleures décisions au quotidien.
            </p>
          </div>
          
          <div className="benefit-list">
            {benefitItems.map((item, index) => (
              <div key={index} className="benefit-item reveal-item">
                <strong 
                  className={`benefit-highlight ${item.isDangerHighlight ? 'danger-highlight' : ''}`}
                >
                  {item.highlight}
                </strong>
                <p className="benefit-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
