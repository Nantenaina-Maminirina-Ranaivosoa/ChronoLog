// frontend/src/components/EventForm.jsx
import { useState } from 'react';

function EventForm({ timelineId, onEventCreated }) {
  const [event_date, setEventDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { event_date, title, description };

    const response = await fetch(`http://localhost:3001/api/timelines/${timelineId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    });

    if (response.ok) {
      const createdEvent = await response.json();
      onEventCreated(createdEvent.data);
      // Reset form
      setEventDate('');
      setTitle('');
      setDescription('');
    } else {
      console.error("Échec de la création de l'événement");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h4>Ajouter un événement</h4>
      <input type="date" value={event_date} onChange={e => setEventDate(e.target.value)} required />
      <input type="text" placeholder="Titre de l'événement" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Ajouter l'événement</button>
    </form>
  );
}

export default EventForm;