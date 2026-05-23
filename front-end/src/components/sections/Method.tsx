import React from 'react';
import { Badge } from '../ui/Badge';
import { BookOpen } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const Method: React.FC = () => {
  // Viewport scroll reveal hook
  const [sectionRef, isRevealed] = useIntersectionObserver();

  const steps = [
    {
      num: 1,
      title: 'Comprendre',
      desc: 'Formuler les problèmes avec précision avant de chercher des solutions.',
    },
    {
      num: 2,
      title: 'Structurer',
      desc: 'Nettoyer, organiser et fiabiliser les données pour éviter les décisions floues.',
    },
    {
      num: 3,
      title: 'Prioriser',
      desc: 'Identifier les vrais leviers grâce aux tendances, Pareto et segmentations métier.',
    },
    {
      num: 4,
      title: 'Pérenniser',
      desc: 'Suivre les actions, responsabiliser les équipes et ancrer les résultats dans la durée.',
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className={`section reveal-section ${isRevealed ? 'revealed' : ''}`} 
      id="methode"
    >
      <div className="container method-grid">
        {/* Left Side: Ebook Cover Showcase with Solid Cyan Accent Badge */}
        <div className="ebook-card reveal-item">
          <div className="ebook-badge">EBOOK OFFERT</div> {/* Styled in solid danger cyan */}
          <div className="ebook-icon">
            <BookOpen size={48} />
          </div>
          <h3 className="ebook-title">Sortir du mode urgence en production</h3>
          <p className="ebook-desc">
            Une méthode terrain pour reprendre le contrôle : comprendre le problème,
            structurer les données, agir au bon niveau et faire durer l'amélioration.
          </p>
          <div className="ebook-footer">
            <span className="ebook-author">Par PlastiData</span>
          </div>
        </div>

        {/* Right Side: Step Checklist */}
        <div className="method-content">
          <Badge className="reveal-item">De la méthode aux décisions</Badge>
          <h2 className="section-title reveal-item">
            Une approche claire pour passer du constat à <span>l'action.</span>
          </h2>
          <p className="section-intro reveal-item">
            PlastiData ne se limite pas à afficher des indicateurs. La solution s'appuie sur une logique terrain :
            observer, comprendre, prioriser, agir et pérenniser.
          </p>

          <div className="steps-container">
            {steps.map((step) => (
              <div key={step.num} className="step-card reveal-item">
                <div className="step-num-circle">{step.num}</div>
                <div className="step-text">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
