// frontend/src/pages/TimelineDetail.jsx (CORRIGÉ)

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import EventForm from '../components/EventForm';

function TimelineDetail() {
  const [timeline, setTimeline] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [timelineRes, eventsRes] = await Promise.all([
          fetch(`http://localhost:3001/api/timelines/${id}`),
          fetch(`http://localhost:3001/api/timelines/${id}/events`)
        ]);
        if (!timelineRes.ok) throw new Error(`Cette frise n'existe pas.`);
        const timelineData = await timelineRes.json();
        const eventsData = await eventsRes.json();
        setTimeline(timelineData.data);
        setEvents(eventsData.data.sort((a, b) => new Date(a.event_date) - new Date(b.event_date)));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleEventCreated = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent].sort((a, b) => new Date(a.event_date) - new Date(b.event_date)));
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      try {
        // --- LIGNE CORRIGÉE ---
        // On s'assure que les backticks (`) sont bien utilisés et que les variables sont correctement injectées.
        const response = await fetch(`http://localhost:3001/api/timelines/${id}/events/${eventId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error("La suppression a échoué.");
        }

        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      } catch (err) {
        console.error("Erreur lors de la suppression:", err);
      }
    }
  };

  if (loading) return <p>Chargement...</p>;
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
                <div className="event-content">
                  <strong>{event.event_date}</strong>: {event.title}
                  <p>{event.description}</p>
                </div>
                <button onClick={() => handleDeleteEvent(event.id)} className="delete-btn">
                  &times;
                </button>
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