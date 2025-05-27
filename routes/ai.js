// // routes/ai.js
// const express = require('express');
// const axios = require('axios');
// const router = express.Router();


// router.post('/message-suggestions', async (req, res) => {
//   const { objective } = req.body;
//   if (!objective) {
//     return res.status(400).json({ error: 'Objective is required.' });
//   }

//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: 'gpt-3.5-turbo',
//         messages: [
//           { role: 'system', content: 'You are a marketing copywriter.' },
//           { role: 'user', content: `Suggest 3 short, friendly SMS messages for this campaign objective: "${objective}"` }
//         ],
//         max_tokens: 150,
//         n: 1,
//         temperature: 0.7
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     // Parse the response (usually returns a numbered list)
//     const suggestions = response.data.choices[0].message.content
//       .split('\n')
//       .filter(line => line.trim().length > 0 && /\d+\./.test(line))
//       .map(line => line.replace(/^\d+\.\s*/, ''));

//     res.json({ suggestions });
//   } catch (error) {
//     console.error('OpenAI API error:', error.response?.data || error.message);
//     console.error('OpenAI API error:', error.response?.data || error.message);
//     res.status(500).json({ error: 'AI message generation failed.' });
//   }
// });

// module.exports = router;


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




