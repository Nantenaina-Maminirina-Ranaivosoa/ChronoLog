// 1. Importation du module Express
const express = require('express');

// 2. Création d'une instance de l'application Express
const app = express();

// 3. Définition du port d'écoute
// On utilise le port 3001 pour le backend (React utilise souvent le 3000 par défaut)
const port = 3001;

// 4. Définition d'une route (ou "endpoint")
// Quand une requête GET est faite à la racine ('/'), on envoie une réponse
app.get('/', (req, res) => {
  res.send('✅ Le serveur ChronoLog fonctionne !');
});

// 5. Démarrage du serveur
// L'application écoute les requêtes sur le port défini
app.listen(port, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
});