const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,     // Your Client ID
  process.env.GOOGLE_CLIENT_SECRET, // Your Client Secret
  'http://localhost:5000/auth/google/callback' // Your Redirect URI
);


module.exports = oauth2Client;
