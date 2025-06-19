// backend/src/routes/events.js

const express = require('express');
// Option TRES importante pour les routeurs imbriqués
const router = express.Router({ mergeParams: true }); 
const db = require('../database.js');

// GET /api/timelines/:timeline_id/events - Obtenir tous les événements d'une frise
router.get('/', (req, res) => {
  const { timeline_id } = req.params;
  const sql = "SELECT * FROM events WHERE timeline_id = ? ORDER BY event_date ASC";
  db.all(sql, [timeline_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "success", data: rows });
  });
});

// POST /api/timelines/:timeline_id/events - Créer un nouvel événement
router.post('/', (req, res) => {
  const { timeline_id } = req.params;
  const { event_date, title, description } = req.body;

  if (!event_date || !title) {
    return res.status(400).json({ error: "La date et le titre sont obligatoires." });
  }

  const sql = 'INSERT INTO events (timeline_id, event_date, title, description) VALUES (?, ?, ?, ?)';
  db.run(sql, [timeline_id, event_date, title, description], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ 
      message: "success", 
      data: { id: this.lastID, timeline_id, event_date, title, description }
    });
  });
});

module.exports = router;