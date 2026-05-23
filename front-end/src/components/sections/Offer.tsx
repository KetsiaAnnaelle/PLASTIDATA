import React from 'react';
import { Badge } from '../ui/Badge';
import { BookOpen, BarChart3, Users } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const Offer: React.FC = () => {
  // Viewport scroll reveal hook
  const [sectionRef, isRevealed] = useIntersectionObserver();

  const offers = [
    {
      icon: <BookOpen size={28} />,
      title: 'Ebook méthodologique',
      desc: 'Un guide terrain pour structurer les problèmes, comprendre les données et éviter le pilotage en urgence.',
    },
    {
      icon: <BarChart3 size={28} />,
      title: 'Dashboards actionnables',
      desc: 'Des tableaux de bord clairs, personnalisables et construits autour de vos vrais enjeux industriels.',
    },
    {
      icon: <Users size={28} />,
      title: 'Accompagnement terrain',
      desc: 'Un appui pour définir les bons indicateurs, fiabiliser vos données et ancrer les routines de pilotage.',
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className={`section reveal-section ${isRevealed ? 'revealed' : ''}`} 
      id="offre"
    >
      <div className="container">
        <div className="text-center-wrapper">
          <Badge className="reveal-item">Une solution complète</Badge>
          <h2 className="section-title reveal-item">
            Un accompagnement pensé pour les industriels de la plasturgie.
          </h2>
          <p className="section-intro reveal-item">
            PlastiData combine méthode, visualisation et accompagnement opérationnel pour passer du reporting passif au pilotage utile.
          </p>
        </div>

        <div className="offer-grid">
          {offers.map((offer, index) => (
            <div key={index} className="offer-card reveal-item">
              <div className="offer-icon">
                {offer.icon}
              </div>
              <h3 className="offer-card-title">{offer.title}</h3>
              <p className="offer-card-text">{offer.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
