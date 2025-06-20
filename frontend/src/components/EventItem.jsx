// frontend/src/components/EventItem.jsx

import { useState } from 'react';

function EventItem({ event, timelineId, onEventUpdated, onEventDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    event_date: event.event_date,
    title: event.title,
    description: event.description,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/timelines/${timelineId}/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("La mise à jour a échoué");

      const updatedEvent = await response.json();
      onEventUpdated(updatedEvent.data);
      setIsEditing(false); // Quitter le mode édition
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="event-card">
      {isEditing ? (
        <form onSubmit={handleUpdateSubmit} className="event-edit-form">
          <input type="date" name="event_date" value={formData.event_date} onChange={handleInputChange} required />
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
          <textarea name="description" value={formData.description} onChange={handleInputChange} />
          <div className="edit-buttons">
            <button type="submit">Sauvegarder</button>
            <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
          </div>
        </form>
      ) : (
        <>
          <div className="event-content">
            <strong>{event.event_date}</strong>: {event.title}
            <p>{event.description}</p>
          </div>
          <div className="event-actions">
            <button onClick={() => setIsEditing(true)} className="edit-btn">Éditer</button>
            <button onClick={() => onEventDeleted(event.id)} className="delete-btn">&times;</button>
          </div>
        </>
      )}
    </div>
  );
}

export default EventItem;