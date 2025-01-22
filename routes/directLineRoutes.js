const express = require('express');
const axios = require('axios');
const router = express.Router();

// Replace this with your Direct Line secret
const DIRECT_LINE_SECRET = process.env.DIRECT_LINE_SECRET;

router.get('/token', async (req, res) => {
  try {
    console.log("Attempting to fetch Direct Line token...");
    console.log("Direct Line Secret being used:", process.env.DIRECT_LINE_SECRET); // Debug your secret

    // Fetch a token from Direct Line API
    const response = await axios.post(
      'https://directline.botframework.com/v3/directline/tokens/generate',
      {},
      {
        headers: {
          Authorization: `Bearer ${process.env.DIRECT_LINE_SECRET}`,
        },
      }
    );

    console.log("Direct Line API response:", response.data);

    // Send the token to the client
    return res.json({ token: response.data.token });
  }  catch (err) {
    console.error("Failed to generate Direct Line token:", err.message || err);
    res.status(500).send('Failed to generate Direct Line token');
  
  }
});

module.exports = router;