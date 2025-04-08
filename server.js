const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Replace this with your actual Vercel frontend link
const corsOptions = {
  origin: 'https://recipeapp-frontend-1cctmkaxx-thenvanathis-projects.vercel.app',
  credentials: true,
};

// ✅ Use custom CORS settings
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('🥗 Welcome to Recipe API backend!');
});

// 🔍 Search route — proxying request to TheMealDB
app.get('/search', async (req, res) => {
  const query = req.query.query;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  try {
    const response = await fetch(url); // fetch is native in Node 18+
    const data = await response.json();

    // 🛑 Handle case where no results are found
    if (!data.meals) {
      return res.status(404).json({ meals: [], message: 'No recipes found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Backend error:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
