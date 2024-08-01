const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/docs', (req, res) => {
  fs.readFile(path.join(__dirname, '../../docs/api-docs.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading documentation file' });
    }
    res.json(JSON.parse(data));
  });
});

module.exports = router;
