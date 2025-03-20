export default async function handler(req, res) {
  const { date } = req.query; // Extract the date from the query parameter
  // Validate the provided date (optional)
  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
  }

  const wordleApiUrl = `https://www.nytimes.com/svc/wordle/v2/${date}.json`;
  try {
    const response = await fetch(wordleApiUrl);
    const data = await response.json();
    res.status(200).json(data); // Send the data to your frontend
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Wordle API' });
  }
}

  