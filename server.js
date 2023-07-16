const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

app.get('/country/:name', async (req, res) => {
  const countryName = req.params.name;
  try {
    // Use dynamic import() for node-fetch
    const fetch = await import('node-fetch');

    const response = await fetch.default(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data from API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
