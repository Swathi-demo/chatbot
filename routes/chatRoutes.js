const express = require('express');
const router = express.Router();
const { CommunicationIdentityClient } = require('@azure/communication-identity');
const connectionString = process.env.ACS_CONNECTION_STRING;

const identityClient = new CommunicationIdentityClient(connectionString);

router.get('/generateToken', async (req, res) => {
  try {
    const user = await identityClient.createUser();
    const tokenResponse = await identityClient.getToken(user, ['chat']);
    res.json({
      userId: user.communicationUserId,
      token: tokenResponse.token,
    });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).send('Error generating token');
  }
});
module.exports = router;
