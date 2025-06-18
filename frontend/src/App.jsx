// frontend/src/App.jsx (mis à jour)

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import TimelineForm from './components/TimelineForm'; // <-- Importer le composant
import './App.css';

function App() {
  const [timelines, setTimelines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/timelines')
      .then(response => response.json())
      .then(data => setTimelines(data.data))
      .catch(err => {
        console.error("Erreur lors de la récupération des données:", err);
        setError("Impossible de charger les données depuis le serveur.");
      });
  }, []);

  // Fonction qui sera passée au composant enfant
  // Elle ajoute la nouvelle frise au début de la liste existante
  const handleTimelineCreated = (newTimeline) => {
    setTimelines([newTimeline, ...timelines]);
  };

  return (
    <div className="App">
      <header>
        <h1>ChronoLog</h1>
      </header>
      <main>
        {/* On passe la fonction en prop */}
        <TimelineForm onTimelineCreated={handleTimelineCreated} />

        <div className="separator"></div>

        <h2>Vos frises chronologiques</h2>
        {error && <p className="error">{error}</p>}
        <div className="timelines-list">
          {timelines.length > 0 ? (
            timelines.map(timeline => (
              <Link to={`/timeline/${timeline.id}`} key={timeline.id} className="timeline-card-link">
              <div className="timeline-card">
                <h3>{timeline.title}</h3>
                <p>{timeline.description}</p>
              </div>
            </Link>
            ))
          ) : (
            !error && <p>Aucune frise trouvée. Créez-en une !</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;