const oauth2Client = require('./googleAuth'); // Import the OAuth client you configured in googleAuth.js

// Middleware to ensure authentication and refresh tokens
function ensureAuthenticated(req, res, next) {
  if (!oauth2Client.credentials) {
    console.error('No credentials found. Redirecting to Google OAuth.');
    return res.redirect('/auth/google'); // Redirect to Google OAuth if no credentials
  }

  // Check if the token is expired
  const now = new Date();
  const expiryDate = new Date(oauth2Client.credentials.expiry_date);

  if (expiryDate <= now) {
    console.log('Access token expired. Attempting to refresh token.');
    // Refresh token if expired
    oauth2Client.refreshAccessToken((err, tokens) => {
      if (err) {
        console.error('Error refreshing access token:', err);
        return res.redirect('/auth/google'); // Redirect to reauthenticate
      }
      oauth2Client.setCredentials(tokens);
      req.session.googleTokens = tokens; // Store refreshed tokens in the session
      next();
    });
  } else {
    console.log('Credentials are valid:', oauth2Client.credentials);
    next();
  }
}

module.exports = ensureAuthenticated;
