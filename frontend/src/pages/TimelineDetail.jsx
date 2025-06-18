// frontend/src/pages/TimelineDetail.jsx

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function TimelineDetail() {
  const [timeline, setTimeline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Hook pour récupérer les paramètres de l'URL, ici l':id

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/timelines/${id}`);
        if (!response.ok) {
          throw new Error(`Cette frise n'existe pas.`);
        }
        const data = await response.json();
        setTimeline(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [id]); // L'effet se relance si l'ID dans l'URL change

  if (loading) return <p>Chargement de la frise...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <Link to="/">&larr; Retour à la liste</Link>
      <header className="timeline-detail-header">
        <h1>{timeline.title}</h1>
        <p>{timeline.description}</p>
      </header>
      <div className="events-section">
        <h2>Événements</h2>
        {/* Nous ajouterons les événements ici dans une prochaine étape */}
        <p>Bientôt, vous pourrez ajouter des événements ici.</p>
      </div>
    </div>
  );
}

export default TimelineDetail;