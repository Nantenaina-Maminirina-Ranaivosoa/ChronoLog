// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import './App.css'; // On garde un peu de style pour l'instant

function App() {
  // 1. État pour stocker la liste des frises
  const [timelines, setTimelines] = useState([]);
  const [error, setError] = useState(null);

  // 2. useEffect pour aller chercher les données au chargement du composant
  useEffect(() => {
    fetch('http://localhost:3001/api/timelines')
      .then(response => {
        if (!response.ok) {
          throw new Error("La requête a échoué");
        }
        return response.json();
      })
      .then(data => {
        // Notre API renvoie { message: '...', data: [...] }
        setTimelines(data.data);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des données:", err);
        setError("Impossible de charger les données depuis le serveur.");
      });
  }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une seule fois

  // 3. Rendu du composant
  return (
    <div className="App">
      <header>
        <h1>ChronoLog</h1>
        <p>Vos frises chronologiques</p>
      </header>
      <main>
        {error && <p className="error">{error}</p>}

        <div className="timelines-list">
          {timelines.length > 0 ? (
            timelines.map(timeline => (
              <div key={timeline.id} className="timeline-card">
                <h2>{timeline.title}</h2>
                <p>{timeline.description}</p>
              </div>
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