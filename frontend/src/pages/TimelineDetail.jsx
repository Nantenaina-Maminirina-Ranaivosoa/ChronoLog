// frontend/src/pages/TimelineDetail.jsx (entièrement mis à jour)
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import EventForm from '../components/EventForm'; // Importer le formulaire

function TimelineDetail() {
  const [timeline, setTimeline] = useState(null);
  const [events, setEvents] = useState([]); // État pour les événements
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Utiliser Promise.all pour lancer les requêtes en parallèle
        const [timelineRes, eventsRes] = await Promise.all([
          fetch(`http://localhost:3001/api/timelines/${id}`),
          fetch(`http://localhost:3001/api/timelines/${id}/events`)
        ]);

        if (!timelineRes.ok) throw new Error(`Cette frise n'existe pas.`);

        const timelineData = await timelineRes.json();
        const eventsData = await eventsRes.json();

        setTimeline(timelineData.data);
        setEvents(eventsData.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleEventCreated = (newEvent) => {
    // Ajoute le nouvel événement à la liste, triée par date
    setEvents(prevEvents => [...prevEvents, newEvent].sort((a, b) => new Date(a.event_date) - new Date(b.event_date)));
  };

  if (loading) return <p>Chargement de la frise...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <Link to="/">&larr; Retour à la liste</Link>
      <header className="timeline-detail-header">
        <h1>{timeline.title}</h1>
        <p>{timeline.description}</p>
      </header>

      <div className="events-container">
        <div className="events-list">
          <h2>Événements</h2>
          {events.length > 0 ? (
            events.map(event => (
              <div key={event.id} className="event-card">
                <strong>{event.event_date}</strong>: {event.title}
                <p>{event.description}</p>
              </div>
            ))
          ) : (
            <p>Aucun événement pour le moment. Ajoutez-en un !</p>
          )}
        </div>

        <div className="event-form-container">
          <EventForm timelineId={id} onEventCreated={handleEventCreated} />
        </div>
      </div>
    </div>
  );
}

export default TimelineDetail;