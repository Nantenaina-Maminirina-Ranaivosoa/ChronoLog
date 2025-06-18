// backend/src/server.js (mis à jour)

const express = require('express');
const cors = require('cors'); // <-- Importer cors
const app = express();
const port = 3001;

const timelineRoutes = require('./routes/timelines');

// --- Middlewares ---
app.use(cors()); // <-- Activer CORS pour toutes les routes
app.use(express.json());

// --- Routes ---
app.get('/', (req, res) => {
  res.send('✅ Le serveur ChronoLog fonctionne !');
});

app.use('/api/timelines', timelineRoutes);

// --- Démarrage ---
app.listen(port, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
});