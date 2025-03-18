export default async function handler(req, res) {
    const date = new Date();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
    const wordleApiUrl = `https://www.nytimes.com/svc/wordle/v2/${date.getFullYear()}-${month}-${day}.json`;
  
    try {
      const response = await fetch(wordleApiUrl);
      const data = await response.json();
      res.status(200).json(data); // Send the data to your frontend
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Wordle API' });
    }
  }
  