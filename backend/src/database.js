// backend/src/database.js

const sqlite3 = require('sqlite3').verbose();

// Le .verbose() permet d'avoir plus d'informations en cas d'erreur.

const DB_PATH = './chronolog.db';

// 1. Connexion à la base de données (le fichier sera créé s'il n'existe pas)
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err.message);
    throw err;
  }
  console.log('✅ Connecté à la base de données SQLite.');
});

// 2. Création de la table 'timelines' si elle n'existe pas déjà
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS timelines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error("Erreur lors de la création de la table 'timelines':", err.message);
    } else {
      console.log("Table 'timelines' prête.");
    }
  });
  // AJOUT : Création de la table 'events'
  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timeline_id INTEGER NOT NULL,
    event_date TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (timeline_id) REFERENCES timelines(id) ON DELETE CASCADE
  )`, (err) => {
    if (err) {
      console.error("Erreur lors de la création de la table 'events':", err.message);
    } else {
      console.log("Table 'events' prête.");
    }
  });
});


// 3. Exportation de l'instance de la base de données pour l'utiliser dans d'autres fichiers
module.exports = db;