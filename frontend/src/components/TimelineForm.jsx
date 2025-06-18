// frontend/src/components/TimelineForm.jsx

import { useState } from 'react';

// Le composant reçoit une fonction 'onTimelineCreated' en prop.
// Il appellera cette fonction pour notifier son parent (App.jsx) qu'une frise a été créée.
function TimelineForm({ onTimelineCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page à la soumission du formulaire

    if (!title.trim()) {
      setError("Le titre ne peut pas être vide.");
      return;
    }

    const newTimeline = { title, description };

    try {
      const response = await fetch('http://localhost:3001/api/timelines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTimeline),
      });

      if (!response.ok) {
        throw new Error('La création de la frise a échoué.');
      }

      const createdTimeline = await response.json();
      
      // Appeler la fonction passée en prop avec les données de la nouvelle frise
      onTimelineCreated(createdTimeline.data);

      // Réinitialiser le formulaire
      setTitle('');
      setDescription('');
      setError(null);

    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="timeline-form">
      <h3>Créer une nouvelle frise</h3>
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Créer la frise</button>
    </form>
  );
}

export default TimelineForm;