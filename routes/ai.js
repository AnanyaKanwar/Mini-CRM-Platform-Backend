

const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

router.post('/message-suggestions', async (req, res) => {
  const { objective } = req.body;
  if (!objective) {
    return res.status(400).json({ error: 'Objective is required.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Suggest 3 short, friendly SMS messages for this campaign objective: "${objective}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const suggestions = text
      .split('\n')
      .filter(line => line.trim().length > 0 && /\d+\./.test(line))
      .map(line => line.replace(/^\d+\.\s*/, ''));

    res.json({ suggestions });
  } catch (error) {
    console.error('Gemini API error:', error.message || error);
    res.status(500).json({ error: 'Gemini message generation failed.' });
  }
});

module.exports = router;




