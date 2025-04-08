const express = require('express');
const fetch = require('node-fetch'); // for older Node.js

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/search', async (req, res) => {
  const query = req.query.query;
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Backend error:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
