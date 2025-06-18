// backend/src/server.js (mis à jour)

const express = require('express');
const app = express();
const port = 3001;

// Importation des routes pour les frises
const timelineRoutes = require('./routes/timelines');

// Middleware pour parser le JSON des requêtes
// C'est indispensable pour que req.body fonctionne sur les routes POST
app.use(express.json());

// Route de test initiale
app.get('/', (req, res) => {
  res.send('✅ Le serveur ChronoLog fonctionne !');
});

// Utilisation des routes de l'API
// Toutes les routes définies dans timelines.js seront préfixées par /api/timelines
app.use('/api/timelines', timelineRoutes);


app.listen(port, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
});