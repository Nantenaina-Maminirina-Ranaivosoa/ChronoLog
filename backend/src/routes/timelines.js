// backend/src/routes/timelines.js

const express = require('express');
const router = express.Router();
const db = require('../database.js'); // Importation de la connexion à la DB

// ROUTE GET /api/timelines - Récupérer toutes les frises
router.get('/', (req, res) => {
  const sql = "SELECT * FROM timelines ORDER BY createdAt DESC";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

// ROUTE POST /api/timelines - Créer une nouvelle frise
router.post('/', (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    res.status(400).json({ "error": "Le titre est obligatoire." });
    return;
  }

  const sql = 'INSERT INTO timelines (title, description) VALUES (?, ?)';
  const params = [title, description];

  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ "error": err.message });
      return;
    }
    res.status(201).json({
      "message": "success",
      "data": { id: this.lastID, title, description }
    });
  });
});

module.exports = router;